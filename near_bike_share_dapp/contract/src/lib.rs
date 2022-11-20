use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    json_types::{self, U128},
    near_bindgen,
    env,
    log,
    AccountId,
    Gas,
    Promise,
    PromiseResult,
    ext_contract,
    PanicOnDefault, 
    PromiseOrValue
};

const DEFAULT_NUM_OF_BIKES: usize = 5;
const AMOUNT_REWARD_FOR_INSPECTIONS: u128 = 15;
const FT_CONTRACT_ACCOUNT: &str = "sub.ft_mashharuki.testnet";
const AMOUNT_TO_USE_BIKE: u128 = 30; 

// enum of Bike
#[derive(BorshDeserialize, BorshSerialize)]
enum Bike {
    Available,             
    InUse(AccountId),      
    Inspection(AccountId),
}
    
#[ext_contract(ext_ft)]
trait FungibleToken {
    fn ft_transfer(&mut self, receiver_id: String, amount: String, memo: Option<String>); 
}

/**
 * Contract
 */
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    bikes: Vec<Bike>,
}

#[near_bindgen]
impl Contract {

    /**
     * initialization
     */
    #[init]
    pub fn new(num_of_bikes: usize) -> Self {
        log!("initialize Contract with {} bikes", num_of_bikes);

        Self {
            bikes: {
                let mut bikes = Vec::new();

                for _i in 0..num_of_bikes {
                    bikes.push(Bike::Available);
                }
                bikes
            },
        }
    }
    
    /**
     * get num of bikes
     */
    pub fn num_of_bikes(&self) -> usize {
        self.bikes.len()
    }

    /**
     * check status
     */
    pub fn is_available(&self, index: usize) -> bool {
        match self.bikes[index] {
            Bike::Available => true,
            _ => false,
        }
    }

    /**
     * get account id using a bike
     */
    pub fn who_is_using(&self, index: usize) -> Option<AccountId> {
        match &self.bikes[index] {
            Bike::InUse(user_id) => Some(user_id.clone()),
            _ => None,
        }
    }

    /**
     * get account id inspecting a bike
     */
    pub fn who_is_inspecting(&self, index: usize) -> Option<AccountId> {
        match &self.bikes[index] {
            Bike::Inspection(inspector_id) => Some(inspector_id.clone()),
            _ => None,
        }
    }

    /**
     * get amount to use a bike function
     */
    pub fn amount_to_use_bike(&self) -> U128 {
        json_types::U128::from(AMOUNT_TO_USE_BIKE)
    }

    /**
     * fungible tokenの移転
     */
    pub fn ft_on_transfer(
        &mut self,
        sender_id: String,
        amount: String,
        msg: String,
    ) -> PromiseOrValue<U128> {
        assert_eq!(
            amount,
            AMOUNT_TO_USE_BIKE.to_string(),
            "Require {} ft to use the bike",
            AMOUNT_TO_USE_BIKE.to_string()
        );

        log!(
            "in ft_on_transfer: sender:{}, amount:{}, msg:{}",
            sender_id,
            amount,
            msg
        );

        // call use_bike function
        self.use_bike(msg.parse().unwrap(), sender_id.try_into().unwrap());
        PromiseOrValue::Value(U128::from(0))
    }

    /**
     * change status Available → Inuse 
     */
    fn use_bike(&mut self, index: usize, user_id: AccountId) {
        log!("{} uses bike", &user_id);
        match &self.bikes[index] {
            Bike::Available => self.bikes[index] = Bike::InUse(user_id),
            _ => panic!("Bike is not available"),
        }
    }

    /**
     * change status Inuse → Inspecting
     */
    pub fn inspect_bike(&mut self, index: usize) {
        // get accountid calling this method
        let user_id = env::predecessor_account_id();
        log!("{} inspects bike", &user_id);

        match &self.bikes[index] {
            Bike::Available => self.bikes[index] = Bike::Inspection(user_id),
            _ => panic!("Bike is not available"),
        }
    }

    /**
     * change status Inuse or Inspecting → Available
     */
    pub fn return_bike(&mut self, index: usize) {
        // get accountid calling this method
        let user_id = env::predecessor_account_id();
        log!("{} returns bike", &user_id);

        match &self.bikes[index] {
            Bike::Available => panic!("Bike is already available"),
            Bike::InUse(user) => {
                assert_eq!(user.clone(), user_id, "Fail due to wrong account");
                self.bikes[index] = Bike::Available
            }
            Bike::Inspection(inspector) => {
                assert_eq!(inspector.clone(), user_id, "Fail due to wrong account");
                Self::return_inspected_bike(index);
            }
        }
    }

    /**
     * give a reward function
     */
    pub fn return_inspected_bike(index: usize) -> Promise {
        let contract_id = FT_CONTRACT_ACCOUNT.parse().unwrap();
        let amount = AMOUNT_REWARD_FOR_INSPECTIONS.to_string();
        let receiver_id = env::predecessor_account_id().to_string();

        log!(
            "{} transfer to {}: {} FT",
            env::current_account_id(),
            &receiver_id,
            &amount
        );

        ext_ft::ext(contract_id)
            .with_attached_deposit(1)
            .ft_transfer(receiver_id, amount, None)
            .then(
                // callback (自身のcallback_return_bike()メソッドを呼び出す)
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas(3_000_000_000_000))
                    .callback_return_bike(index),
            )
    }

    /**
     * callback function
     */
    pub fn callback_return_bike(&mut self, index: usize) {
        assert_eq!(env::promise_results_count(), 1, "This is a callback method");

        match env::promise_result(0) {
            PromiseResult::NotReady => unreachable!(),
            PromiseResult::Failed => panic!("Fail cross-contract call"),
            // if success, change status
            PromiseResult::Successful(_) => self.bikes[index] = Bike::Available,
        }
    }
}

/**
 * test code
 */
#[cfg(test)]
mod tests {

    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::testing_env;
    
    use super::*;

    /**
     * create Virtual environment
     */
    fn get_context(predecessor_account_id: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .current_account_id(accounts(0))
            .signer_account_id(predecessor_account_id.clone())
            .predecessor_account_id(predecessor_account_id);
        builder
    }

    #[test]
    fn check_default() {
        // create context
        let mut context = get_context(accounts(1));
        // init
        testing_env!(context.build());

        let init_num = 5;
        // create contract
        let contract = Contract::new(init_num);

        testing_env!(context.is_view(true).build());
        // check num of bikes
        assert_eq!(contract.num_of_bikes(), DEFAULT_NUM_OF_BIKES);
        // check status of bikes
        for i in 0..DEFAULT_NUM_OF_BIKES {
            assert!(contract.is_available(i))
        }
    }

    #[test]
    fn check_inspecting_account() {
        // create context
        let mut context = get_context(accounts(1));
        // init 
        testing_env!(context.build());
        // create contract
        let mut contract = Contract::new(5);

        let test_index = contract.bikes.len() - 1;
        // change status
        contract.inspect_bike(test_index);

        testing_env!(context.is_view(true).build());

        // check status of bikes
        for i in 0..contract.num_of_bikes() {
            if i == test_index {
                assert_eq!(accounts(1), contract.who_is_inspecting(i).unwrap());
            } else {
                assert!(contract.is_available(i))
            }
        }
    }

    #[test]
    #[should_panic(expected = "Fail due to wrong account")]
    fn return_by_other_account() {
        // create context
        let mut context = get_context(accounts(1));
        // init
        testing_env!(context.build());
        // create contract
        let mut contract = Contract::new(5);

        // change status
        contract.inspect_bike(0);

        testing_env!(context.predecessor_account_id(accounts(2)).build());
        contract.return_bike(0);
    }
}