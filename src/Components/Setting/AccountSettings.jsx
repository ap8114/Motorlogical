import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiEye, FiEyeOff, FiCheck, FiX, FiUser } from "react-icons/fi";

const AccountSettings = () => {
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
                    />
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
    </div>
  );
};

export default AccountSettings;
