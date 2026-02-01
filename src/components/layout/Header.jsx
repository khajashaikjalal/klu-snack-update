import React from 'react';
import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <header className="app-header fade-in">
            <div className="logo-container">
                <img src={logo} alt="KLU Logo" className="logo-img" />
            </div>
            <h1 className="app-title">Tulips Boys Hostel</h1>
            <p className="app-subtitle">Today's Evening Snack</p>
        </header>
    );
};

export default Header;
