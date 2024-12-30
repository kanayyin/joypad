'use client'

import React, { useState } from "react";
import "../../../styles/notification.css";
import Header from "../../header.js";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Please confirm your email address by clicking on the link we just emailed you. If you cannot find the email, you can request a new confirmation email or change your email address.",
      date: "November 1, 2024",
      avatar: "/image/user.png", // Replace with your avatar image path
    },
  ]);

  const handleRemoveNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div>
        <Header/>
        <div className="notifications-container">
        <h1>Notifications</h1>
        {notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
            <img src={notification.avatar} alt="Notification Avatar" />
            <div className="notification-content">
                <p>{notification.text}</p>
                <div className="date">{notification.date}</div>
            </div>
            <div
                className="notification-close"
                onClick={() => handleRemoveNotification(notification.id)}
            >
                &#10006;
            </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default Notifications;

