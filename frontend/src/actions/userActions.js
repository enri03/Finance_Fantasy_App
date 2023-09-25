import axios from "axios";
// User Log in action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:8000/api/login",
      { email, password },
      config
    );

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User Log out action 
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: 'USER_LOGOUT' })
    dispatch({type:'GET_USER_GENERAL_INFO_RESET'})
    document.location.href = '/'
  }

// User General data ( balance , profit ,user ID)
export const getUserGeneralData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "GET_USER_GENERAL_INFO_REQUEST",
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:8000/api/user-general-info",
      config
    );
    dispatch({
      type: "GET_USER_GENERAL_INFO_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_GENERAL_INFO_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to get Recent stoc info ( stock_name ,current_price , stock_id)
export const getStock = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_STOCK_REQUEST",
    });

    const { data } = await axios.get(
      "http://localhost:8000/api/recent-added-stock"
    );
    dispatch({
      type: "GET_STOCK_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_STOCK_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Action to get the top clients data (name,profit,client_id)
export const getTopClients = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_TOP_CLIENT_REQUEST",
    });

    const { data } = await axios.get(
      "http://localhost:8000/api/top-clients-profit"
    );
    dispatch({
      type: "GET_TOP_CLIENT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_TOP_CLIENT_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to buy a stock
export const buyStock = (stockData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CREATE_STOCK_REQUEST",
    });

    const {
      userLogin: { userInfo },
      userGeneralInfo: { generalInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:8000/api/buy-stock`,
      stockData,
      config
    );
    dispatch(
      updateBalace({
        userBalance: generalInfo.user_balance,
        stockValue: data.purchase_price,
        stockQuantity: data.purchase_quantity,
      })
    );
  } catch (error) {
    const message =
      "Please enter a valid quantity and make sure to select a stock to buy";
    if (message === "Unauthenticated.") {
      console.log("Not authorized");
      dispatch(logout())
    }
    dispatch({
      type: "CREATE_STOCK_FAIL",
      payload: message,
    });
  }
};

// Action to update the user balance once he buy a stock 
export const updateBalace = (updateData) => async (dispatch, getState) => {
  const newBalance =
    updateData.userBalance - updateData.stockQuantity * updateData.stockValue;
  try {
    if ( newBalance < 0) { 
      throw new Error("You do not heave enought money to buy this stock")
    }
    dispatch({ type: "UPDATE_BALANCE_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = axios.post(
      "http://localhost:8000/api/update-balance",
      { newBalance: parseFloat(newBalance) },
      config
    );
    dispatch({ type: "UPDATE_BALANCE_SUCCESS"});
    dispatch({
      type: "CREATE_STOCK_SUCCESS",
      payload: data,
    });
    dispatch(getTransactions());
  } catch (error) {
    dispatch({
      type: "UPDATE_BALANCE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// Action to get the user Transaction ether the loged in user or a user depending on the id
export const getTransactions =
  (userID = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: "GET_TRANSACTIONS_REQUEST",
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      let url = "http://localhost:8000/api/user-transactions/";
      if (userID) {
        url = `http://localhost:8000/api/user-transactions/${userID}`;
      }
      const { data } = await axios.get(url, config);
      dispatch({
        type: "GET_TRANSACTIONS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "GET_TRANSACTIONS_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
