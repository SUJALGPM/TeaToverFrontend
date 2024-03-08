import React, { useState } from 'react';
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag, FaThList } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const isAdmin = false;
    // const isAdmin = localStorage.getItem();

    const adminMenuItems = [
        {
            path: "#",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/analytics",
            name: "Analytics",
            icon: <FaRegChartBar />
        },
        {
            path: "/comment",
            name: "Comment",
            icon: <FaCommentAlt />
        }
    ];

    const userMenuItems = [
        {
            path: "/mgr-dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/mgr-profile",
            name: "Profile",
            icon: <FaUserAlt />
        },
        {
            path: "/mgr-year",
            name: "Entry Record",
            icon: <FaShoppingBag />
        },
        {
            path: "/mgr-yearList",
            name: "NewMonth",
            icon: <FaThList />
        },
        {
            path: "/mgr-expenses",
            name: "Expenses",
            icon: <FaThList />
        }
    ];

    //Conditionally render the Sidebar...
    const menuItems = isAdmin ? adminMenuItems : userMenuItems;


    return (
        <div className="containery">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">SUJAL</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItems.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
