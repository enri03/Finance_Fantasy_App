import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from 'react-bootstrap'
import { useEffect } from "react";
import { getTransactions } from "../actions/userActions";
const Transactions = ({userID,userName}) => {

  const transactionsInfo = useSelector((state)=>state.transactionsInfo);
  const {success,transactions} = transactionsInfo;
  const dispatch = useDispatch();


  useEffect(() => {
    if (userID){
        dispatch(getTransactions(userID))
    }else {
        dispatch(getTransactions())
    }
  }, [dispatch,userID]);
  return (
    <>
    <div className="trasactions-action">
        <span>{userName?userName + ' Transactions':'My Transactions'}</span>
    </div>
             <Table striped bordered hover responsive className='table-sm'>
             <thead>
               <tr>
                 <th>Stock</th>
                 <th>Volume</th>
                 <th>Purchase Price</th>
                 <th>Current Price</th>
                 <th>Gain/Loss</th>
                 <th>Purchase Time</th>
               </tr>
             </thead>
             <tbody>
            {!success ? <tr>Loading...</tr>:transactions.map((transaction) => (
                <tr key={transaction.transaction_id}>
                <td>{transaction.stock_name}</td>
                <td>{transaction.purchase_quantity}</td>
                <td>{transaction.purchase_price}</td>
                <td>{transaction.current_price}</td>
                <td style={{ color: transaction.profit < 0 ? 'red' : 'green' }}>{transaction.profit}</td>
                <td>{transaction.created_at}</td>
              </tr>
               ))}
             </tbody>
           </Table>
           </>
  );
};

export default Transactions;
