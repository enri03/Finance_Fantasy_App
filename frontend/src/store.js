import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {userLoginReducer,stockReducer,topClientsReducer,buyStockReducer,transactionsReducer,userGeneralInfoReducer,updatedBalanceReducer} from './reducers/generalReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    stockInfo: stockReducer,
    topClientsInfo: topClientsReducer,
    buyStockInfo:buyStockReducer,
    transactionsInfo:transactionsReducer,
    userGeneralInfo:userGeneralInfoReducer,
    updatedBalanceInfo:updatedBalanceReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null


const initialState = {
    userLogin:{userInfo:userInfoFromStorage},
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store