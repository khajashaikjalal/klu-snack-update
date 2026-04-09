import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const SelectDropdown = ({ options, value, onChange, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full mb-3" ref={dropdownRef}>
            <button
                type="button"
                className={`input-field dropdown-trigger flex justify-between align-center ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                style={disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
                <span className="truncate font-medium">{value}</span>
                <ChevronDown size={20} className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
            </button>

            {isOpen && (
                <div className="custom-dropdown-menu">
                    <ul className="dropdown-list">
                        {options.map((option) => (
                            <li
                                key={option}
                                className={`dropdown-item ${value === option ? 'selected' : ''}`}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SelectDropdown;
