import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopOnRouteChange: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scrolling for a nicer experience
        });
    }, [location]);

    return null; // This component doesn't render anything
};

export default ScrollToTopOnRouteChange;
