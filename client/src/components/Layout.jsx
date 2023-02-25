import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../layout.css";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const Location = useLocation();
  const navigate = useNavigate()
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    }
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    }
  ];

  const isAdmin = user ? user.isAdmin : '';
  const menuTobeRendered = isAdmin ? adminMenu : userMenu;
  return (
    <div className="main">
      <div className="d-flex  layout ">
        <div className="sideBar">
          <div className="sidebar-header">
            <h2>Self Tech</h2>
          </div>
          <div className="menu">
            {menuTobeRendered.map((menu) => {
              const isActive = Location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${isActive &&
                    "active-menu-item"}`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
                  className='d-flex menu-item ' 
                  onClick={()=>{
                    localStorage.clear()
                    navigate('/login')
                  }}
                >
                  <i className='ri-logout-circle-r-line' ></i>
                  {!collapsed && <Link to='/login'>Logout</Link>}
                </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-item-centre px-4">
              <i className="ri-user-line px-2" style={{ fontSize: "20px" }}></i>
              <Link to="/profile" className="anchor">
                {user ? user.name : ""}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
