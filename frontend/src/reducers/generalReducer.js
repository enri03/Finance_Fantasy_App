export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};
export const stockReducer = (state = { recentStocks: [] }, action) => {
  switch (action.type) {
    case "GET_STOCK_REQUEST":
      return { loading: true };
    case "GET_STOCK_SUCCESS":
      return { loading: false, recentStocks: action.payload };
    case "GET_STOCK_FAIL":
      return { loading: false, error: action.payload };
      case "GET_STOCK_RESET":
      return {}
    default:
      return state;
  }
};
export const topClientsReducer = (state = { topClients: [] }, action) => {
  switch (action.type) {
    case "GET_TOP_CLIENT_REQUEST":
      return { loading: true };
    case "GET_TOP_CLIENT_SUCCESS":
      return { loading: false, topClients: action.payload };
    case "GET_TOP_CLIENT_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const buyStockReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_STOCK_REQUEST":
      return {
        loading: true,
      };
    case "CREATE_STOCK_SUCCESS":
      return {
        loading: false,
        success: true,
        message: "Purchase success",
      };
    case "CREATE_STOCK_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "CREATE_STOCK_RESET":
      return {};
    default:
      return state;
  }
};
export const transactionsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS_REQUEST":
      return {
        loading: true,
      };
    case "GET_TRANSACTIONS_SUCCESS":
      return {
        loading: false,
        success: true,
        transactions: action.payload,
      };
    case "GET_TRANSACTIONS_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
      case "GET_TRANSACTIONS_RESET":
        return {};
    default:
      return state;
  }
};

export const userGeneralInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_GENERAL_INFO_REQUEST":
      return { loading: true };
    case "GET_USER_GENERAL_INFO_SUCCESS":
      return { loading: false, success: true, generalInfo: action.payload };
    case "GET_USER_GENERAL_INFO_FAIL":
      return { loading: false, error: action.payload };
      case "GET_USER_GENERAL_INFO_RESET":
        return {}
    default:
      return state;
  }
};

export const updatedBalanceReducer = (state={},action)=> {
    switch(action.type) {
        case "UPDATE_BALANCE_REQUEST":
            return { updated: false };
          case "UPDATE_BALANCE_SUCCESS":
            return { updated: true};
          case "UPDATE_BALANCE_FAIL":
            return { updated: false, error: action.payload };
            default:
                return state
    }
}
