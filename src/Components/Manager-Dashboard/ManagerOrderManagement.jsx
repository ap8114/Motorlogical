import React, { useState } from 'react';
import { Modal, Button, Table, Form, Row, Col, Badge } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';

const initialOrders = [
  {
    id: 1,
    customer: 'John Smith',
    phone: '(555) 123-4567',
    product: '2025 Model X SUV',
    quantity: 1,
    status: 'Processing',
    date: '2025-06-19'
  },
  {
    id: 2,
    customer: 'Emma Johnson',
    phone: '(555) 234-5678',
    product: '2025 Luxury Sedan',
    quantity: 1,
    status: 'Confirmed',
    date: '2025-06-18'
  }
];

const productsList = [
  '2025 Model X SUV',
  '2025 Luxury Sedan',
  '2025 Electric Sport',
  '2025 Classic Coupe',
  '2025 Convertible'
];

const OrderManagement = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [newOrder, setNewOrder] = useState({
    customer: '',
    phone: '',
    product: '',
    quantity: 1
  });

  const handleAddOrder = () => {
    const nextId = orders.length + 1;
    setOrders([
      ...orders,
      {
        id: nextId,
        customer: newOrder.customer,
        phone: newOrder.phone,
        product: newOrder.product,
        quantity: newOrder.quantity,
        status: 'Processing',
        date: new Date().toISOString().split('T')[0]
      }
    ]);
    setNewOrder({ customer: '', phone: '', product: '', quantity: 1 });
    setShowAddModal(false);
  };

  return (
    <div className="p-4">
      <h3 className="fw-bold mb-2 fs-4 py-2">Order Management</h3>
     

      <Button variant="primary" className="mb-3" onClick={() => setShowAddModal(true)}>
        + New Order
      </Button>

      <Table hover>
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>CUSTOMER</th>
            <th>PRODUCTS</th>
            <th>QUANTITY</th>
            <th>STATUS</th>
            <th>DATE PLACED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>
                {order.customer}
                <br />
                <span className="text-muted">{order.phone}</span>
              </td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>
                <Badge bg={order.status === 'Processing' ? 'warning' : 'info'} text="dark">
                  {order.status}
                </Badge>
              </td>
              <td>{order.date}</td>
              <td>
                <FaEye
                  role="button"
                  className="text-primary"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowViewModal(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* New Order Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Place New Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                value={newOrder.customer}
                onChange={e => setNewOrder({ ...newOrder, customer: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={newOrder.phone}
                onChange={e => setNewOrder({ ...newOrder, phone: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Products</Form.Label>
              <Form.Select
                value={newOrder.product}
                onChange={e => setNewOrder({ ...newOrder, product: e.target.value })}
              >
                <option value="">-- Select Product --</option>
                {productsList.map(p => (
                  <option key={p}>{p}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={newOrder.quantity}
                onChange={e => setNewOrder({ ...newOrder, quantity: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddOrder}>
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Order Detail Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details #{selectedOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <Row className="mb-2">
                <Col><strong>Customer Name</strong><br />{selectedOrder.customer}</Col>
                <Col><strong>Phone</strong><br />{selectedOrder.phone}</Col>
              </Row>
              <Row className="mb-2">
                <Col><strong>Products</strong><br />{selectedOrder.product}</Col>
                <Col><strong>Quantity</strong><br />{selectedOrder.quantity}</Col>
              </Row>
              <Row className="mb-2">
                <Col><strong>Status</strong><br />{selectedOrder.status}</Col>
                <Col><strong>Date Placed</strong><br />{selectedOrder.date}</Col>
              </Row>
              <hr />
              <h6 className="mt-3">Order Timeline</h6>
              <ul className="list-unstyled">
                <li>
                  <span className="text-primary">●</span> Order placed — {selectedOrder.date}
                </li>
                <li>
                  <span className="text-muted">○</span> Processing
                </li>
                <li>
                  <span className="text-muted">○</span> Ready for delivery
                </li>
                <li>
                  <span className="text-muted">○</span> Delivered
                </li>
              </ul>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderManagement;
