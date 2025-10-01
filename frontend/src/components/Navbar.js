import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav 
                className="navbar navbar-expand-lg fixed-top"
                style={{
                    background: isScrolled 
                        ? 'rgba(255, 255, 255, 0.95)' 
                        : 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: isScrolled 
                        ? '1px solid rgba(102, 126, 234, 0.1)' 
                        : '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: isScrolled 
                        ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
                        : '0 2px 10px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    padding: isScrolled ? '0.5rem 0' : '1rem 0'
                }}
            >
                <div className="container">
                    {/* Brand Logo */}
                    <Link 
                        className="navbar-brand d-flex align-items-center" 
                        to='/'
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: '800',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        <i className="fas fa-blog mr-2" style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: '1.3rem'
                        }}></i>
                        Blog Lyfe
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="navbar-toggler border-0 p-2"
                        type="button"
                        onClick={toggleMobileMenu}
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '10px',
                            boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 2px 10px rgba(102, 126, 234, 0.3)';
                        }}
                    >
                        <div style={{
                            width: '20px',
                            height: '15px',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <span style={{
                                display: 'block',
                                height: '2px',
                                width: '100%',
                                background: 'white',
                                borderRadius: '1px',
                                transition: 'all 0.3s ease',
                                transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
                            }}></span>
                            <span style={{
                                display: 'block',
                                height: '2px',
                                width: '100%',
                                background: 'white',
                                borderRadius: '1px',
                                transition: 'all 0.3s ease',
                                opacity: isMobileMenuOpen ? '0' : '1'
                            }}></span>
                            <span style={{
                                display: 'block',
                                height: '2px',
                                width: '100%',
                                background: 'white',
                                borderRadius: '1px',
                                transition: 'all 0.3s ease',
                                transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
                            }}></span>
                        </div>
                    </button>

                    {/* Navigation Menu */}
                    <div 
                        className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}
                        style={{
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <ul className="navbar-nav ml-auto">
                            {/* <li className="nav-item mx-1">
                                <NavLink 
                                    className="nav-link position-relative px-3 py-2"
                                    exact 
                                    to='/'
                                    onClick={closeMobileMenu}
                                    style={{
                                        color: location.pathname === '/' ? 'white' : '#2c3e50',
                                        background: location.pathname === '/' 
                                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                            : 'transparent',
                                        borderRadius: '25px',
                                        fontWeight: '600',
                                        fontSize: '0.95rem',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: location.pathname === '/' 
                                            ? '0 4px 15px rgba(102, 126, 234, 0.3)'
                                            : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (location.pathname !== '/') {
                                            e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                                            e.target.style.color = '#667eea';
                                            e.target.style.transform = 'translateY(-2px)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (location.pathname !== '/') {
                                            e.target.style.background = 'transparent';
                                            e.target.style.color = '#2c3e50';
                                            e.target.style.transform = 'translateY(0)';
                                        }
                                    }}
                                >
                                    <i className="fas fa-home mr-2"></i>
                                    Home
                                </NavLink>
                            </li> */}
                            
                            <li className="nav-item mx-1">
                                <NavLink 
                                    className="nav-link position-relative px-3 py-2"
                                    exact 
                                    to='/blog'
                                    onClick={closeMobileMenu}
                                    style={{
                                        color: location.pathname === '/blog' ? 'white' : '#2c3e50',
                                        background: location.pathname === '/blog' 
                                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                            : 'transparent',
                                        borderRadius: '25px',
                                        fontWeight: '600',
                                        fontSize: '0.95rem',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: location.pathname === '/blog' 
                                            ? '0 4px 15px rgba(102, 126, 234, 0.3)'
                                            : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (location.pathname !== '/blog') {
                                            e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                                            e.target.style.color = '#667eea';
                                            e.target.style.transform = 'translateY(-2px)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (location.pathname !== '/blog') {
                                            e.target.style.background = 'transparent';
                                            e.target.style.color = '#2c3e50';
                                            e.target.style.transform = 'translateY(0)';
                                        }
                                    }}
                                >
                                    <i className="fas fa-newspaper mr-2"></i>
                                    Articles
                                </NavLink>
                            </li>

                            {/* Search Button */}
                            {/* <li className="nav-item mx-1">
                                <button 
                                    className="btn nav-link px-3 py-2 border-0"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                        color: '#667eea',
                                        borderRadius: '25px',
                                        fontWeight: '600',
                                        fontSize: '0.95rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                                        e.target.style.color = 'white';
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)';
                                        e.target.style.color = '#667eea';
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                >
                                    <i className="fas fa-search mr-2"></i>
                                    Search
                                </button>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Spacer for fixed navbar */}
            <div style={{ height: isScrolled ? '70px' : '90px', transition: 'height 0.3s ease' }}></div>
        </>
    );
};

export default Navbar;
