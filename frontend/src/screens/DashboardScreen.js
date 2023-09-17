import React, {useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import {useSelector } from "react-redux";
import Header from "../components/Header";
import GeneralInfo from "../components/GeneralInfo";
import Transactions from "../components/Transactions";
import RecentStock from "../components/RecentStock";
import TopClients from "../components/TopClients";
import AddStock from "../components/AddStock";
const DashboardScreen = ({ history }) => {

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  return (
    <Container>
        {loading?'Loading...':<Row>
            <Header/>
        <Col md={9}>
          <h3>General Information</h3>
          <GeneralInfo/>
          <div className="transaction-container">
            <AddStock />
            <Transactions />
          </div>
        </Col>
        <Col md={3}>
          <RecentStock />
          <TopClients />
        </Col>
      </Row>}

    </Container>
  );
};

export default DashboardScreen;
