import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getStock } from "../actions/userActions";
const RecentStock = () => {
  const dispatch = useDispatch();
  const stockInfo = useSelector((state) => state.stockInfo);
  const { recentStocks,loading } = stockInfo;
  useEffect(() => {
    dispatch(getStock());
  }, [dispatch]);
  return (
    <>
      <h3>Recent Stocks</h3>
      {loading?'Loading...':recentStocks.slice(0,4).map((stock) => {
        return (
          <div className="stock-item" key={stock.stock_id}>
            <span>{stock.name}</span>
            <span>{stock.current_price}$</span>
          </div>
        );
      })}
    </>
  );
};

export default RecentStock;
