import React, { useState } from 'react';
import { 
  Container, Row, Col, Card, Form, Button, 
  Accordion, Navbar, Nav, Alert 
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  FiSearch, FiUser, FiBookOpen, FiFileText, FiVideo, 
  FiSend, FiCheckCircle, FiAlertCircle, FiMessageSquare,
  FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, 
  FiInstagram, FiLinkedin 
} from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

const HelpSupport = () => {
  // Accordion state
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: false
  });

  // Form submission state
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  // Toggle accordion
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields'
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Your support request has been submitted successfully. We\'ll get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: false
      });

      // Log form data (would be sent to backend in real app)
      console.log('Support request submitted:', formData);
    }, 1000);
  };

  // FAQ data
  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password. The link is valid for 24 hours.'
    },
    {
      question: 'What are the system requirements?',
      answer: 'Our platform works best on modern browsers like Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser. For optimal performance, ensure your device has at least 4GB of RAM and a stable internet connection with minimum 5Mbps download speed.'
    },
    {
      question: 'How can I update my account information?',
      answer: 'To update your account information, log in to your account and navigate to the "Account Settings" or "Profile" section. Here you can update your personal details, contact information, notification preferences, and billing information. Remember to click "Save" after making any changes.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and bank transfers. For enterprise customers, we also offer invoice-based payments with net-30 terms. All transactions are securely processed and encrypted to protect your financial information.'
    }
  ];

  // Open chatbot
  const openChatbot = () => {
    alert('Chatbot would open here. This is a placeholder for the actual chatbot integration.');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
  

      {/* Main Content */}
      <main className="flex-grow-1 py-5">
        <Container>
          <div className="text-center mb-5">
            <h3 className="  mb-3">Help & Support</h3>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px', fontSize:"17px" }}>
              We're here to help you with any questions or issues you might have. Check our FAQs for quick answers or reach out to our support team directly.
            </p>
          </div>

          <Row className="g-4">
            {/* FAQ Section */}
            <Col md={6}>
              <Card className="h-100">
                <Card.Body className="p-4">
                  <h2 className="h3 fw-bold mb-4">Frequently Asked Questions</h2>
                  
                  <Accordion activeKey={activeAccordion} className="mb-4">
                    {faqs.map((faq, index) => (
                      <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header onClick={() => toggleAccordion(index)}>
                          {faq.question}
                        </Accordion.Header>
                        <Accordion.Body className="text-muted">
                          {faq.answer}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>

                  <div className="mt-4">
                    <h3 className="h5 fw-medium mb-3">Still have questions?</h3>
                    <div className="d-flex flex-wrap gap-2">
                      <Button variant="outline-secondary" className="d-flex align-items-center">
                        <FiBookOpen className="me-2" />
                        Knowledge Base
                      </Button>
                      <Button variant="outline-secondary" className="d-flex align-items-center">
                        <FiFileText className="me-2" />
                        Documentation
                      </Button>
                      <Button variant="outline-secondary" className="d-flex align-items-center">
                        <FiVideo className="me-2" />
                        Video Tutorials
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Contact Support Form */}
            <Col md={6}>
              <Card className="h-100">
                <Card.Body className="p-4">
                  <h2 className="h3 fw-bold mb-4">Contact Support</h2>
                  
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiUser />
                        </span>
                        <Form.Control 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiMail />
                        </span>
                        <Form.Control 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Subject</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiMessageSquare />
                        </span>
                        <Form.Control 
                          type="text" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Brief description of your issue"
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please provide details about your issue or question..."
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Check 
                        type="switch"
                        id="priority"
                        name="priority"
                        label="Mark as urgent"
                        checked={formData.priority}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-100 d-flex align-items-center justify-content-center"
                    >
                      <FiSend className="me-2" />
                      Submit Request
                    </Button>
                  </Form>

                  {formStatus.submitted && (
                    <Alert 
                      variant={formStatus.success ? 'success' : 'danger'} 
                      className="mt-3 d-flex align-items-center"
                    >
                      {formStatus.success ? (
                        <FiCheckCircle className="me-2" />
                      ) : (
                        <FiAlertCircle className="me-2" />
                      )}
                      {formStatus.message}
                    </Alert>
                  )}

                  <div className="mt-5 pt-4 border-top">
                    <h3 className="h5 fw-medium mb-3">Need immediate assistance?</h3>
                    <div className="d-flex flex-column gap-2">
                      <Button variant="link" className="text-start text-primary ps-0 d-flex align-items-center">
                        <FiMessageSquare className="me-2" />
                        Live Chat with Support (Mon-Fri, 9AM-6PM EST)
                      </Button>
                      <Button variant="link" className="text-start text-primary ps-0 d-flex align-items-center">
                        <FiPhone className="me-2" />
                        Call Support: +1 (800) 555-1234
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Chatbot Widget */}
          <Card className="mt-5 text-center">
            <Card.Body className="p-5">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-4 mb-4">
                <FaRobot size={32} className="text-primary" />
              </div>
              <h2 className="h3 fw-bold mb-3">Get instant answers with our AI Assistant</h2>
              <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                Our AI-powered assistant can help you troubleshoot common issues, find information, and guide you through basic processes without waiting for human support.
              </p>
              <Button 
                variant="primary" 
                className="d-flex align-items-center mx-auto"
                onClick={openChatbot}
              >
                <FiMessageSquare className="me-2" />
                Start Chatting Now
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </main>

   
    </div>
  );
};

export default HelpSupport;