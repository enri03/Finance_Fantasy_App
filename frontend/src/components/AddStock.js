import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { buyStock } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";

function AddStock() {
  const [show, setShow] = useState(false);
  const [stockData, setStockData] = useState({});

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo } = userLogin;
  const buyStockStatus = useSelector((state) => state.buyStockInfo);
  const {error,success,message} = buyStockStatus;

  const dispatch = useDispatch();
  const stockInfo = useSelector((state) => state.stockInfo);
  const { recentStocks, loading } = stockInfo;
  const handleClose = () => {setShow(false); dispatch({type:'CREATE_STOCK_RESET'})};
  const handleShow = () => setShow(true);
 
  const handleSubmit = async () => {
    dispatch(
        buyStock(stockData)
    );
  };

  return (
    <>
    
      <Button id="addStock" variant="primary" onClick={handleShow}>
        Create new purchase
      </Button>
      <Modal show={show} onHide={handleClose}>
        {error&&<Message variant='danger'>{error}</Message>}
        {success&&<Message variant='success'>{message}</Message>}
        <Modal.Header>
          <Modal.Title>Purchase a stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Select a stock to buy:</Form.Label>
              <select
                name="stockName"
                className="stock-list"
                onChange={(e) => {
                  setStockData({
                    ...stockData,
                    client_id:userInfo.user.id,
                    stock_id: e.target.options[e.target.selectedIndex].getAttribute("data-id"),
                    stockName: e.target.options[e.target.selectedIndex].getAttribute("data-name"),
                    purchase_price:e.target.options[e.target.selectedIndex].getAttribute("data-price"),
                    purchase_date: new Date().toISOString().slice(0, 19).replace("T", " "),
                  });
                }}
              >
                <option value="">Select a stock</option>
                {loading
                  ? "Loading..."
                  : recentStocks.map((stock) => {
                      return (
                        <option key={stock.stock_id}
                          value={stock.current_price}
                          data-id={stock.stock_id}
                          data-price={stock.current_price}
                          data-name={stock.name}
                        >
                          {stock.name}
                        </option>
                      );
                    })}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Volume:</Form.Label>
              <input
                name="quantity"
                type="number"
                placeholder="Enter volume"
                className="stock-volume"
                onChange={(e) => {
                  setStockData({
                    ...stockData,
                    purchase_quantity: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Buy stock
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default AddStock;
