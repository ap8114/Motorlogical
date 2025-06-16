import React, { useState, useEffect } from 'react';
import { Button, Form, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FiSun, FiMoon, FiShoppingBag, FiTag, FiMail,
  FiSave, FiLoader, FiCheck, FiFlag, FiChevronDown
} from 'react-icons/fi';

const UserPreferences = () => {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Notification states
  const [notifications, setNotifications] = useState({
    main: true,
    orderUpdates: true,
    salesAlerts: false,
    emailNotifications: true
  });

  // Language state
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'english';
  });
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Save button state
  const [saveStatus, setSaveStatus] = useState({
    loading: false,
    success: false
  });

  // Load saved preferences on component mount
  useEffect(() => {
    const savedNotifications = JSON.parse(
      localStorage.getItem('notifications') ||
      '{"main":true,"orderUpdates":true,"salesAlerts":false,"emailNotifications":true}'
    );
    setNotifications(savedNotifications);

    // Apply dark mode if enabled
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  // Toggle main notifications
  const toggleMainNotifications = () => {
    const newMainState = !notifications.main;
    setNotifications(prev => ({
      ...prev,
      main: newMainState
    }));
    saveNotificationPreferences({
      ...notifications,
      main: newMainState
    });
  };

  // Toggle individual notification
  const toggleNotification = (type) => {
    const newNotifications = {
      ...notifications,
      [type]: !notifications[type]
    };
    setNotifications(newNotifications);
    saveNotificationPreferences(newNotifications);
  };

  // Save notification preferences to localStorage
  const saveNotificationPreferences = (prefs) => {
    localStorage.setItem('notifications', JSON.stringify(prefs));
  };

  // Change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setShowLanguageDropdown(false);
  };

  // Save all preferences
  const savePreferences = () => {
    setSaveStatus({ loading: true, success: false });

    // Simulate API call
    setTimeout(() => {
      setSaveStatus({ loading: false, success: true });

      // Reset success state after 2 seconds
      setTimeout(() => {
        setSaveStatus({ loading: false, success: false });
      }, 2000);
    }, 1500);
  };

  // Available languages
  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' }
  ];

  return (
    <div className=" py-4" style={{ maxWidth: '100%' }}>
      <header className="mb-4">
        <h1 className="h2 fw-bold">Preferences</h1>
        <p className="text-muted mb-0">Customize your experience by adjusting these settings</p>
      </header>

      <div className="card shadow-sm mb-4">
        {/* Appearance Settings */}
        <div className="card-body border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="h5 fw-medium mb-1">Appearance</h2>
              <p className="text-muted small mb-0">Choose your preferred theme</p>
            </div>
            <Form.Check
              type="switch"
              id="theme-switch"
              checked={darkMode}
              onChange={toggleDarkMode}
              label=""
              className="d-flex align-items-center"
            />
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="card-body border-bottom">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="h5 fw-medium mb-1">Notifications</h2>
              <p className="text-muted small mb-0">Manage your notification preferences</p>
            </div>
            <Form.Check
              type="switch"
              id="notification-switch"
              checked={notifications.main}
              onChange={toggleMainNotifications}
              label=""
            />
          </div>

          <div className="ps-2">
            {/* Order Updates */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 text-primary rounded p-2 me-3">
                  <FiShoppingBag />
                </div>
                <div>
                  <h3 className="h6 fw-medium mb-0">Order updates</h3>
                  <p className="text-muted small mb-0">Get notified about status changes to your orders</p>
                </div>
              </div>
              <Form.Check
                type="switch"
                id="order-updates-switch"
                checked={notifications.orderUpdates}
                onChange={() => toggleNotification('orderUpdates')}
                disabled={!notifications.main}
                label=""
                className={!notifications.main ? 'opacity-50' : ''}
              />
            </div>

            {/* Sales Alerts */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 text-primary rounded p-2 me-3">
                  <FiTag />
                </div>
                <div>
                  <h3 className="h6 fw-medium mb-0">Sales alerts</h3>
                  <p className="text-muted small mb-0">Receive notifications about special offers and discounts</p>
                </div>
              </div>
              <Form.Check
                type="switch"
                id="sales-alerts-switch"
                checked={notifications.salesAlerts}
                onChange={() => toggleNotification('salesAlerts')}
                disabled={!notifications.main}
                label=""
                className={!notifications.main ? 'opacity-50' : ''}
              />
            </div>

            {/* Email Notifications */}
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 text-primary rounded p-2 me-3">
                  <FiMail />
                </div>
                <div>
                  <h3 className="h6 fw-medium mb-0">Email notifications</h3>
                  <p className="text-muted small mb-0">Receive important updates via email</p>
                </div>
              </div>
              <Form.Check
                type="switch"
                id="email-notifications-switch"
                checked={notifications.emailNotifications}
                onChange={() => toggleNotification('emailNotifications')}
                disabled={!notifications.main}
                label=""
                className={!notifications.main ? 'opacity-50' : ''}
              />
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="card-body">
          <div className="mb-3">
            <h2 className="h5 fw-medium mb-1">Language</h2>
            <p className="text-muted small mb-0">Choose your preferred language</p>
          </div>

          <Dropdown show={showLanguageDropdown} onToggle={setShowLanguageDropdown}>
            <Dropdown.Toggle variant="light" className="w-100 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <FiFlag className="me-2" />
                {languages.find(l => l.value === language)?.label || 'English'}
              </div>
              <FiChevronDown />
            </Dropdown.Toggle>

            <Dropdown.Menu className="w-100">
              {languages.map((lang) => (
                <Dropdown.Item
                  key={lang.value}
                  onClick={() => changeLanguage(lang.value)}
                  active={language === lang.value}
                >
                  <div className="d-flex align-items-center">
                    <FiFlag className="me-2" />
                    {lang.label}
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Save Button */}
      <div className="d-flex justify-content-end">
        <Button
          variant={saveStatus.success ? 'success' : 'primary'}
          onClick={savePreferences}
          disabled={saveStatus.loading}
        >
          {saveStatus.loading ? (
            <>
              <FiLoader className="me-2 animate-spin" />
              Saving...
            </>
          ) : saveStatus.success ? (
            <>
              <FiCheck className="me-2" />
              Saved
            </>
          ) : (
            <>
              <FiSave className="me-2" />
              Save Preferences
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UserPreferences;