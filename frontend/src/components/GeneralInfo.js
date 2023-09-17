import React from "react";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { getUserGeneralData } from "../actions/userActions";
export default function GeneralInfo() {
  const dispatch = useDispatch();
  const userGeneralInfo = useSelector((state) => state.userGeneralInfo);
  const { success,generalInfo } = userGeneralInfo;
  const updatedBalanceInfo = useSelector((state)=>state.updatedBalanceInfo)
  const { updated } =updatedBalanceInfo;

  useEffect(() => {
    dispatch(getUserGeneralData());
  }, [dispatch,updated]);
  let totalPortfolioValue;
  if(success) {
     totalPortfolioValue = parseFloat(generalInfo.user_balance) + parseFloat(generalInfo.total_profit)
  }
  return (
    <>
      <Row>
        <Col>
          <div>Balance</div>
          <div>{!success?'Loading...':generalInfo.user_balance}</div>
        </Col>
        <Col><div>Total Profit/Loss</div>
          <div>{!success?'Loading...':generalInfo.total_profit}</div></Col>
        <Col><div>Total Protfolio value</div>
          <div>{!success?'Loading...':totalPortfolioValue}</div></Col>
      </Row>
    </>
  );
}
