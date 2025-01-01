"use client";

import { useState, useEffect } from "react";
import "../styles/header_admin.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header_admin = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
   const [username, setUsername] = useState("Guest");
  const pathname = usePathname();

  const toggleDropdown = () => {
    console.log("Dropdown toggled"); // Debugging
    setDropdownVisible(!dropdownVisible);
  };

   // Function to determine if a link is active
   const isLinkActive = (path) => {
    return pathname === path;
  };
  useEffect(() => {
      const fetchUserProfile = async () => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const response = await fetch("https://joypadjourney-be-production.up.railway.app/api/user/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
  
            if (response.ok) {
              const userData = await response.json();
              console.log("User data:", userData);
              setUsername(userData.username);
              localStorage.setItem("username", userData.username)
            } else {
              console.error("Failed to fetch user profile");
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        }
      };
  
      fetchUserProfile();
    }, []);
  
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = "/";
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
                <Link 
                  href="/admin/home_admin" 
                  className={`nav-link ${isLinkActive('/admin/home_admin') ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/review" 
                  className={`nav-link ${isLinkActive('/admin/review') ? 'active' : ''}`}
                >
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
                {username}
              </a>
              <div
                className={`dropdown-content ${
                  dropdownVisible ? "visible" : ""
                }`}
              >
                <a href="/" onClick={handleLogout}>Log Out</a>
              </div>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header_admin;