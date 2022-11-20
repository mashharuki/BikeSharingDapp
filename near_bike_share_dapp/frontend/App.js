import React, { useEffect, useState } from 'react';
import './assets/css/global.css';
import {
  amount_to_use_bike, ft_balance_of, ft_transfer, ft_transfer_call, inspect_bike, is_available, login,
  logout,
  num_of_bikes, return_bike, storage_balance_of,
  storage_deposit,
  storage_unregister, who_is_inspecting, who_is_using
} from './assets/js/near/utils';
const bikeImg = require("./assets/img/bike.png");

// Enum of status
const RenderingStates = {
  SIGN_IN: "sign_in",
  REGISTRATION: "registration",
  HOME: "home",
  TRANSACTION: "transaction",
};

/**
 * App Component
 */
export default function App() {
  // state variable
  const [allBikeInfo, setAllBikeInfo] = useState([]);
  const [renderingState, setRenderingState] = useState(RenderingStates.HOME);
  const [showBalance, setShowBalance] = useState(false);
  const [balanceInfo, setBalanceInfo] = useState({});
  const [amountToUseBike, setAmountToUseBike] = useState(0);

  useEffect(() => {

    /**
     * init bike use amount
     */
    const initAmountToUseBike = async () => {
      const amount = await amount_to_use_bike();
      setAmountToUseBike(BigInt(amount));
    };
  
    /**
     * init Rendering state function
     */
    const initRenderingState = async () => {
      if (!window.walletConnection.isSignedIn()) {
        setRenderingState(RenderingStates.SIGN_IN);
      } else {
        console.log("window.accountId:", window.accountId);
        // check status
        const is_registered = await isRegistered(window.accountId);
        
        if (!is_registered) {
          setRenderingState(RenderingStates.REGISTRATION);
        }
      }
    }

    /**
     * init bike info
     */
    const initAllBikeInfo = async () => {
      // get num of bikes
      const num = await num_of_bikes();
      console.log("Num of bikes:", num);

      let new_bikes = [];

      for (let i = 0; i < num; i++) {
        const bike = await createBikeInfo(i);
        new_bikes.push(bike);
      }

      setAllBikeInfo(new_bikes);
      console.log("Set bikes: ", new_bikes);
    };

    initAmountToUseBike();
    initRenderingState();
    initAllBikeInfo();
  }, []);

  /**
   * initial Bike info function
   */
  const initialBikeInfo = async () => {
    return { available: false, in_use: false, inspection: false };
  };

  /**
   * initial Balance info function
   */
  const initialBalanceInfo = async () => {
    return { account_id: "", balance: 0 };
  };

  /**
   * Create bike information for frontend
   */
  const createBikeInfo = async(index) => {
    // get bike
    let bike = await initialBikeInfo();
    
    // change available status
    await is_available(index).then((is_available) => {
      if (is_available) {
        bike.available = is_available;
        return bike;
      }
    });
  
    // change using status
    await who_is_using(index).then((user_id) => {
      if (window.accountId === user_id) {
        bike.in_use = true;
        return bike;
      }
    });

    // change inspecting status
    await who_is_inspecting(index).then((inspector_id) => {
      if (window.accountId === inspector_id) {
        bike.inspection = true;
      }
    });
    return bike;
  };

  /**
   * update Bike info (using)
   */
   const transferFtToUseBike = async (index) => {
    console.log("Transfer ft to use bike");

    // get user balance
    const balance = await ft_balance_of(window.accountId);

    if (balance < amountToUseBike) {
      alert(amountToUseBike + "ft is required to use the bike");
    } else {
      try {
        // call ft_transfer_call method
        ft_transfer_call(index, amountToUseBike.toString());
      } catch (e) {
        alert(e);
      }
    }
  };

  /**
   * update Bike info (inspecting)
   */
  const inspectBikeThenUpdateInfo = async (index) => {
    console.log("Inspect bike");

    setRenderingState(RenderingStates.TRANSACTION);

    try {
      await inspect_bike(index);
    } catch (e) {
      alert(e);
    }
    // update Bike info
    await updateBikeInfo(index);

    setRenderingState(RenderingStates.HOME);
  };

  /**
   * update Bike info (using or inspecting → available)
   */
  const returnBikeThenUpdateInfo = async (index) => {
    console.log("Return bike");

    setRenderingState(RenderingStates.TRANSACTION);

    try {
      await return_bike(index);
    } catch (e) {
      alert(e);
    }
    // update Bike info
    await updateBikeInfo(index);

    setRenderingState(RenderingStates.HOME);
  };

  /**
   * update bike info function
   */
  const updateBikeInfo = async (index) => {
    // create bike info
    const new_bike = await createBikeInfo(index);

    allBikeInfo[index] = new_bike;
    setAllBikeInfo(allBikeInfo);
    console.log("Update bikes: ", allBikeInfo);
  };

  /**
   * check account id is registered
   */
  const isRegistered = async (account_id) => {
    // get balance
    const balance = await storage_balance_of(account_id);
    console.log("user's storage balance: ", balance);
  
    // check a balance is null 
    if (balance === null) {
      console.log("account is not yet registered");
      return false;
    } else {
      return true;
    }
  };

  /**
   * register storage deposit
   */
  const newUserRegister = async () => {
    try {
      await storage_deposit();
    } catch (e) {
      alert(e);
    }
  };

  /**
   * prepare balance info
   */
  const prepareBalanceInfo = async (accountId) => {
    // get fungible token balance
    const balance = await ft_balance_of(accountId);
    // init
    let balance_info = await initialBalanceInfo();
    balance_info.account_id = accountId;
    balance_info.balance = balance;
  
    setBalanceInfo(balance_info);
    setShowBalance(true);
  };

  console.log(
    "see:",
    `https://explorer.testnet.near.org/accounts/${window.accountId}`
  );
  
  console.log(
    "see:",
    `https://explorer.testnet.near.org/accounts/${window.contract.contractId}`
  );

  /**
   * Sign out button component
   */
  const signOutButton = () => {
    return (
      <button 
        className="link" 
        style={{ float: "right" }} 
        onClick={logout}
      >
        Sign out
      </button>
    );
  };

  /**
   * Unregister button component
   */
  const unregisterButton = () => {
    return (
      <button 
        className="link" 
        style={{ float: "right" }}
        onClick={storage_unregister}
      >
        Unregister
      </button>
    );
  };

  /**
   * Sign in button component
   */
  const requireSignIn = () => {
    return (
      <div>
        <main>
          <p style={{ textAlign: "center", marginTop: "2.5em" }}>
            <button onClick={login}>
              Sign in
            </button>
          </p>
        </main>
      </div>
    );
  };

  /**
   * Registration form component
   */
  const requireRegistration = () => {
    return (
      <div>
        {signOutButton()}
        <div style={{ textAlign: "center" }}>
          <h5>
            Registration in ft contract is required before using the bike app
          </h5>
        </div>
        <main>
          <p style={{ textAlign: "center", marginTop: "2.5em" }}>
            <button 
              onClick={newUserRegister}
            >
              storage deposit 
            </button>
          </p>
        </main>
      </div>
    );
  };

  /**
   * header
   */
  const header = () => {
    return <h1>Hello {window.accountId} !</h1>;
  };

  /**
   * during transaction status
   */
  const transaction = () => {
    return (
      <div>
        {header()}
        <main>
          <p> in process... </p>
        </main>
      </div>
    );
  };

  /**
   * display bike contents component
   */
  const bikeContents = () => {
    return (
      <div>
        {allBikeInfo.map((bike, index) => {
          return (
            <div 
              className="bike" 
              style={{ display: "flex" }}
            >
              <div className="bike_img">
                <img src={bikeImg} />
              </div>
              <div className="bike_index">: {index}</div>
              <button
                disabled={!bike.available}
                onClick={() => transferFtToUseBike(index)}
              >
                use
              </button>
              <button
                disabled={!bike.available}
                onClick={() => inspectBikeThenUpdateInfo(index)}
              >
                inspect
              </button>
              <button
                disabled={!bike.in_use && !bike.inspection}
                onClick={() => returnBikeThenUpdateInfo(index)}
              >
                return
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  /**
   * display balance component
   */
  const checkBalance = () => {
    return (
      <div class="balance_content">
        <button
          onClick={() => prepareBalanceInfo(window.accountId)}
        >
          check my balance
        </button>
        <button 
          style={{ marginTop: "0.1em" }}
          onClick={() => prepareBalanceInfo(window.contract.contractId)}  
        >
          check contract's balance
        </button>
        <span>or</span>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const { fieldset, account } = event.target.elements;
            const account_to_check = account.value;
            fieldset.disabled = true;

            try {
              await prepareBalanceInfo(account_to_check);
            } catch (e) {
              alert(e);
            }
            fieldset.disabled = false;
          }}
        >
          <fieldset id="fieldset">
            <div style={{ display: "flex" }}>
              <input autoComplete="off" id="account" placeholder="account id" />
              <button style={{ borderRadius: "0 5px 5px 0" }}>check</button>
            </div>
          </fieldset>
        </form>
        {showBalance && (
          <div>
            <p>{balanceInfo.account_id}'s</p>
            <p>balance: {balanceInfo.balance}</p>
          </div>
        )}
      </div>
    );
  };

  /**
   * transfer fungible token form component
   */
   const transferFt = () => {
    return (
      <div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const { fieldset, account } = event.target.elements;
            const account_to_transfer = account.value;
            fieldset.disabled = true;

            try {
              await ft_transfer(account_to_transfer, amountToUseBike.toString());
            } catch (e) {
              alert(e);
            }
            fieldset.disabled = false;
          }}
        >
          <fieldset id="fieldset">
            <label
              htmlFor="account"
              style={{
                display: "block",
                color: "var(--gray)",
                marginBottom: "0.5em",
                marginTop: "1em",
              }}
            >
              give someone {amountToUseBike.toString()} ft
            </label>
            <div style={{ display: "flex" }}>
              <input
                autoComplete="off"
                id="account"
                style={{ flex: 1 }}
                placeholder="account id"
              />
              <button style={{ borderRadius: "0 5px 5px 0" }}>transfer</button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  };

  /**
   * home component
   */
  const home = () => {
    return (
      <div>
        {signOutButton()}
        {unregisterButton()}
        {header()}
        <main>
          {bikeContents()}
          {checkBalance()}
          {transferFt()}
        </main>
      </div>
    );
  };

  switch (renderingState) {
    case RenderingStates.SIGN_IN:
      return <div>{requireSignIn()}</div>;
    case RenderingStates.REGISTRATION:
      return <div>{requireRegistration()}</div>;
    case RenderingStates.TRANSACTION:
      return <div>{transaction()}</div>;
    case RenderingStates.HOME:
      return <div>{home()}</div>;
  }
}
