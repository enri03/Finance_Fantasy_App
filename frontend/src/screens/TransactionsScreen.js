import React, {useEffect } from "react";
import { Row, Col,Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Transactions from "../components/Transactions";
const DashboardScreen = ({ history,match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading,userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } 
  }, [dispatch, history, userInfo]);

  const goBack = () => {
    history.goBack(); // Navigate to the previous page
  };


  return (
    <Container>
    {loading?"Loading...":<Row>
      <Col md={9}>
          <button onClick={goBack}>Go Back</button>
        <Transactions userID={match.params.id} userName={match.params.name}/>
      </Col>
    </Row>
}
    </Container>
  );
};

export default DashboardScreen;
