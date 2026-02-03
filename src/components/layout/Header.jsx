import React from 'react';
import logo from '../../assets/logo.png';

const Header = ({ onLogoClick }) => {
    return (
        <header className="app-header fade-in">
            <div className="logo-container" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
                <img src={logo} alt="KLU Logo" className="logo-img" />
            </div>
            <h1 className="app-title">Tulips Boys Hostel</h1>
            <p className="app-subtitle">Today's Evening Snack</p>
        </header>
    );
};

export default Header;
