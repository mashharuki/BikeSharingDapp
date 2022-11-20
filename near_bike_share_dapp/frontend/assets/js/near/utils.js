import {
  connect,
  Contract,
  keyStores,
  WalletConnection
} from 'near-api-js';
import getConfig from './config';

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

/**
 * Initialize contract & set global variables
 */
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, 
      nearConfig
    )
  );

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)
  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()
  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(
    window.walletConnection.account(), 
    nearConfig.contractName, 
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: [
        "num_of_bikes",
        "is_available",
        "who_is_using",
        "who_is_inspecting",
        "amount_to_use_bike"
      ],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: [
        "inspect_bike", 
        "return_bike"
      ],
    }
  )

  // Initializing Fungible token contract APIs by contract name and configuration
  window.ftContract = await new Contract(
    window.walletConnection.account(), 
    nearConfig.ftContractName,
    {
      viewMethods: [
        "ft_balance_of", 
        "storage_balance_of"
      ],
      changeMethods: [
        "storage_deposit", 
        "storage_unregister", 
        "ft_transfer",
        "ft_transfer_call"
      ],
    }
  );
}

/**
 * logout function
 */
export function logout() {
  window.walletConnection.signOut()
  window.location.replace(window.location.origin + window.location.pathname)
}

/**
 * login function
 */
export function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

/**
 * get num of bikes function
 */
export async function num_of_bikes() {
  let n = await window.contract.num_of_bikes();
  return n;
}

/**
 * get status of bikes
 */
export async function is_available(index) {
  let response = await window.contract.is_available({
    index: index,
  });
  return response;
}

/**
 * get status of bikes using
 */
export async function who_is_using(index) {
  let response = await window.contract.who_is_using({
    index: index,
  });
  return response;
}

/**
 * get status of bikes inspecting
 */
export async function who_is_inspecting(index) {
  let response = await window.contract.who_is_inspecting({
    index: index,
  });
  return response;
}

/**
 * change status function
 */
export async function inspect_bike(index) {
  let response = await window.contract.inspect_bike({
    index: index,
  });
  return response;
}

/**
 * change status function
 */
export async function return_bike(index) {
  let response = await window.contract.return_bike({
    index: index,
  });
  return response;
}

/**
 * get fungible token amount function
 */
export async function ft_balance_of(account_id) {
  console.log("window.ftContract:", window.ftContract)
  let balance = await window.ftContract.ft_balance_of({
    account_id : account_id,
  });
  return balance;
}

/**
 * get storage balance of account id function
 */
export async function storage_balance_of(accountId) { 
  console.log("accountId:", accountId)
  console.log("window.ftContract:", window.ftContract)

  let balance = await window.ftContract.storage_balance_of({
    account_id : accountId,
  });
  return balance;
}

/**
 * register storage deposit function
 */
export async function storage_deposit() {
  let response = await window.ftContract.storage_deposit(
    {}, 
    "300000000000000", // gas
    "1250000000000000000000" // deposit amount (in yoctoNEAR, 1 yoctoNEAR = 10^-24 NEAR)
  );
  return response;
}

/**
 * unregister storage deposit function
 */
export async function storage_unregister() {
  let response = await window.ftContract.storage_unregister(
    { force: true },
    "300000000000000",
    "1"
  );
  return response;
}

/**
 * transfer fungible token function
 */
export async function ft_transfer(receiver_id, amount) {
  let response = await window.ftContract.ft_transfer(
    {
      receiver_id: receiver_id,
      amount: amount,
    },
    "300000000000000",
    "1" // 1 yoctoNEAR
  );
  return response;
}

export async function amount_to_use_bike() {
  let amount = await window.contract.amount_to_use_bike();
  return amount;
}

export async function ft_transfer_call(index, amount) {
  let response = await window.ftContract.ft_transfer_call(
    {
      receiver_id: nearConfig.contractName,
      amount: amount,
      msg: index.toString(),
    },
    "300000000000000",
    "1"
  );
  return response;
}