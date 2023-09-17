import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTopClients } from "../actions/userActions";
import { Link } from 'react-router-dom'
const TopClients = () => {
    const dispatch = useDispatch();
    const stockInfo = useSelector((state) => state.topClientsInfo);
    const { topClients,loading } = stockInfo;
    useEffect(() => {
      dispatch(getTopClients());
    }, [dispatch]);
  return (
    <div className="top-client">
      <h3>Most Profitable Clients</h3>
      {loading?'Loading ...':topClients.map((client) => {
        return (
          <div className="top-client-item" key={client.client_id}>
            <Link to={`/client/${client.client_id}/${client.name}`}>{client.name}</Link>
            <span>{client.profit}$</span>
          </div>
        );
      })}
    </div>
  );
};

export default TopClients;
