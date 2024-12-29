"use client";

import { useState } from "react";
import "../styles/header_admin.css";
import Link from "next/link";

const Header_admin = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    console.log("Dropdown toggled"); // Debugging
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <img src="/image/Journey 1.png" alt="Logo Website" />
        </div>
        
      </div>
      <nav>
        <ul>
          <div>
          <nav>
            <ul>
              <li>
                <a href="/admin/home_admin" id="home" className="nav-link active">
                  Home
                </a>
              </li>
              <li>
                <Link href="/admin/review" id="review" className="nav-link">
                  Review
                </Link>
              </li>
            </ul>
          </nav>
          </div>
          <div className="profile-container">
            <div className="profile">
              <img
                className="profile-circle"
                src="/image/user.png"
                alt="Profile Picture"
              />
            </div>
          </div>
          <div className="user-profile">
            <li>
              <a className="username" id="username" onClick={toggleDropdown}>
                admin
              </a>
              <div
                className={`dropdown-content ${
                  dropdownVisible ? "visible" : ""
                }`}
              >
                <a href="/">Log Out</a>
              </div>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header_admin;