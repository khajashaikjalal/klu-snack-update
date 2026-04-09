import React from 'react';
import logo from '../../assets/logo.png';

const Header = ({ onLogoClick }) => {
    return (
        <header className="flex flex-col align-center w-full mb-8 mt-2 fade-in">
            <div className="flex flex-col align-center mb-3" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
                <img src={logo} alt="KLU Logo" style={{ width: '180px' }} />
            </div>
            <h1 className="text-center mb-2" style={{ background: 'none', WebkitTextFillColor: '#C41E3A', color: '#C41E3A', fontSize: '2.4rem' }}>
                Tulips Boys Hostel
            </h1>
            <p className="text-center text-gray-600 font-medium" style={{ fontSize: '1.2rem' }}>Today's Evening Snack</p>
        </header>
    );
};

export default Header;
