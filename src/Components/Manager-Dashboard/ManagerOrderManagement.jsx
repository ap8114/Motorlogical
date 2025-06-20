import React, { useState } from 'react';
import { Modal, Button, Table, Form, Row, Col, Badge, Container } from 'react-bootstrap';
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
    <Container fluid className="py-4">
      <Row className="mb-3">
        <Col>
          <h3 className="fw-bold fs-3">Order Management</h3>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            + New Order
          </Button>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table hover bordered className="align-middle text-nowrap">
          <thead className="table-light">
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
                  <div className="fw-semibold">{order.customer}</div>
                  <small className="text-muted">{order.phone}</small>
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
      </div>

      {/* New Order Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
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
                min={1}
                value={newOrder.quantity}
                onChange={e => setNewOrder({ ...newOrder, quantity: Number(e.target.value) })}
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

      {/* Order Details Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details #{selectedOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <Row className="mb-2">
                <Col sm={6}><strong>Customer Name</strong><br />{selectedOrder.customer}</Col>
                <Col sm={6}><strong>Phone</strong><br />{selectedOrder.phone}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={6}><strong>Products</strong><br />{selectedOrder.product}</Col>
                <Col sm={6}><strong>Quantity</strong><br />{selectedOrder.quantity}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={6}><strong>Status</strong><br />{selectedOrder.status}</Col>
                <Col sm={6}><strong>Date Placed</strong><br />{selectedOrder.date}</Col>
              </Row>
              <hr />
              <h6 className="mt-3">Order Timeline</h6>
              <ul className="list-unstyled">
                <li><span className="text-primary">●</span> Order placed — {selectedOrder.date}</li>
                <li><span className="text-muted">○</span> Processing</li>
                <li><span className="text-muted">○</span> Ready for delivery</li>
                <li><span className="text-muted">○</span> Delivered</li>
              </ul>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OrderManagement;
