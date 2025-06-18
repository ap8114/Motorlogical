import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Alert, Table, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiEye, FiEyeOff, FiCheck, FiX, FiUser, FiEdit, FiTrash2 } from "react-icons/fi";

const AccountSettings = ({ isAdmin = false }) => {
  // State for profile form
  const [profileData, setProfileData] = useState({
    name: "James Wilson",
    email: "james.wilson@autodealer.com",
    dealership: "Premium Auto Group",
    location: "San Francisco, CA",
    role: "Sales Manager",
  });

  // State for password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State for UI
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // State for admin user management
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "James Wilson",
      email: "james.wilson@autodealer.com",
      dealership: "Premium Auto Group",
      country: "USA",
      role: "Sales Manager",
      status: "active"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@autodealer.com",
      dealership: "Elite Motors",
      country: "Canada",
      role: "Sales Associate",
      status: "active"
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@autodealer.com",
      dealership: "Premium Auto Group",
      country: "USA",
      role: "Inventory Manager",
      status: "inactive"
    }
  ]);

  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [dealerships, setDealerships] = useState(["Premium Auto Group", "Elite Motors", "City Autos"]);
  const [countries, setCountries] = useState(["USA", "Canada", "Germany", "UK"]);

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!profileData.name || !profileData.dealership || !profileData.location) {
      setAlertMessage("Please fill in all required fields");
      setShowSuccessAlert(true);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setAlertMessage("Profile updated successfully!");
      setShowSuccessAlert(true);

      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }, 500);
  };

  // Handle password form submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setAlertMessage("Please fill in all password fields");
      setShowSuccessAlert(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlertMessage("New password and confirmation do not match");
      setShowSuccessAlert(true);
      return;
    }

    // Password strength validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setAlertMessage(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      );
      setShowSuccessAlert(true);
      return;
    }

    // Simulate password update
    setTimeout(() => {
      setShowPasswordModal(false);
      setAlertMessage("Password updated successfully!");
      setShowSuccessAlert(true);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }, 1000);
  };

  // Admin user management functions
  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setAlertMessage("User deleted successfully!");
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    
    if (currentUser.id) {
      // Update existing user
      setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
    } else {
      // Add new user
      const newUser = {
        ...currentUser,
        id: Math.max(...users.map(u => u.id)) + 1,
        status: "active"
      };
      setUsers([...users, newUser]);
    }
    
    setShowUserModal(false);
    setAlertMessage(`User ${currentUser.id ? 'updated' : 'added'} successfully!`);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handleAddNewUser = () => {
    setCurrentUser({
      name: "",
      email: "",
      dealership: "",
      country: "",
      role: "Sales Associate"
    });
    setShowUserModal(true);
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Main Content */}
      <main className="py-4">
        <div className="">
          {/* Success Alert */}
          {showSuccessAlert && (
            <Alert
              variant="success"
              className="position-fixed bottom-0 end-0 m-3 d-flex align-items-center"
              onClose={() => setShowSuccessAlert(false)}
              dismissible
            >
              <FiCheck className="me-2" />
              {alertMessage}
            </Alert>
          )}
          
          <h1 className="h3">Account Settings</h1>
          <p className="text-muted mb-3">
            Manage your account information and password
          </p>
          
          {isAdmin && (
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h4">User Management</h2>
                <Button variant="primary" onClick={handleAddNewUser}>
                  Add New User
                </Button>
              </div>
              
              <div className="bg-white shadow rounded p-4 mb-4">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Dealership</th>
                      <th>Country</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.dealership}</td>
                        <td>{user.country}</td>
                        <td>{user.role}</td>
                        <td>
                          <Badge bg={user.status === 'active' ? 'success' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => handleEditUser(user)}
                          >
                            <FiEdit />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <FiTrash2 />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
          
          <div
            className="bg-white shadow rounded p-4 p-md-5 mx-auto"
            style={{ maxWidth: "100%" }}
          >
            <div className="mb-4"></div>

            <Form onSubmit={handleProfileSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <Form.Group controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      readOnly
                      className="bg-light"
                    />
                    <Form.Text className="text-muted">
                      Email address cannot be changed
                    </Form.Text>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="dealership">
                    <Form.Label>Dealership</Form.Label>
                    <Form.Control
                      type="text"
                      name="dealership"
                      value={profileData.dealership}
                      onChange={handleProfileChange}
                      disabled={!isAdmin}
                      className={!isAdmin ? "bg-light" : ""}
                    />
                    {!isAdmin && (
                      <Form.Text className="text-muted">
                        Dealership can only be changed by an administrator
                      </Form.Text>
                    )}
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      type="text"
                      name="role"
                      value={profileData.role}
                      onChange={handleProfileChange}
                      readOnly
                      className="bg-light"
                    />
                    <Form.Text className="text-muted">
                      Role can only be changed by an administrator
                    </Form.Text>
                  </Form.Group>
                </div>
              </div>

              <div className="pt-4 mt-4 border-top d-flex justify-content-end gap-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPasswordModal(true)}
                >
                  Change Password
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </main>

      {/* Password Modal */}
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordSubmit}>
            <Form.Group className="mb-3" controlId="current-password">
              <Form.Label>Current Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={passwordVisible.current ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="link"
                  className="position-absolute top-0 end-0 h-100 d-flex align-items-center"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {passwordVisible.current ? <FiEyeOff /> : <FiEye />}
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="new-password">
              <Form.Label>New Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={passwordVisible.new ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="link"
                  className="position-absolute top-0 end-0 h-100 d-flex align-items-center"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {passwordVisible.new ? <FiEyeOff /> : <FiEye />}
                </Button>
              </div>
              <Form.Text className="text-muted">
                Password must be at least 8 characters long and include
                uppercase, lowercase, number, and special character
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirm-password">
              <Form.Label>Confirm New Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={passwordVisible.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="link"
                  className="position-absolute top-0 end-0 h-100 d-flex align-items-center"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {passwordVisible.confirm ? <FiEyeOff /> : <FiEye />}
                </Button>
              </div>
            </Form.Group>

            <div className="pt-3 mt-3 border-top d-flex justify-content-end gap-3">
              <Button
                variant="outline-secondary"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Update Password
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* User Management Modal */}
      <Modal
        show={showUserModal}
        onHide={() => setShowUserModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{currentUser?.id ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser && (
            <Form onSubmit={handleUserSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <Form.Group controlId="userName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={currentUser.name}
                      onChange={handleUserChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="userEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={currentUser.email}
                      onChange={handleUserChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="userDealership">
                    <Form.Label>Dealership</Form.Label>
                    <Form.Select
                      name="dealership"
                      value={currentUser.dealership}
                      onChange={handleUserChange}
                      required
                    >
                      <option value="">Select Dealership</option>
                      {dealerships.map((dealer, index) => (
                        <option key={index} value={dealer}>{dealer}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="userCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Select
                      name="country"
                      value={currentUser.country}
                      onChange={handleUserChange}
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="userRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      name="role"
                      value={currentUser.role}
                      onChange={handleUserChange}
                      required
                    >
                      <option value="Sales Associate">Sales Associate</option>
                      <option value="Sales Manager">Sales Manager</option>
                      <option value="Inventory Manager">Inventory Manager</option>
                      <option value="Admin">Administrator</option>
                    </Form.Select>
                  </Form.Group>
                </div>

                {!currentUser.id && (
                  <div className="col-md-6">
                    <Form.Group controlId="userPassword">
                      <Form.Label>Set Temporary Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Set initial password"
                        required
                      />
                      <Form.Text className="text-muted">
                        User will be required to change this on first login
                      </Form.Text>
                    </Form.Group>
                  </div>
                )}
              </div>

              <div className="pt-3 mt-3 border-top d-flex justify-content-end gap-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowUserModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {currentUser.id ? 'Update User' : 'Add User'}
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AccountSettings;