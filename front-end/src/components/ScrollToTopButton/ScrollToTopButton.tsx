import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollToTopButton: React.FC = () => {
    const [visible, setVisible] = useState(false);

    const handleScroll = () => {
        // Show the button if scrolled more than 300px from the top
        if (window.scrollY > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        visible && (
            <Button
                variant="contained"
                color="primary"
                onClick={scrollToTop}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    borderRadius: '50%',
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000, // Ensure the button is above other content
                }}
            >
                <ArrowUpwardIcon />
            </Button>
        )
    );
};

export default ScrollToTopButton;
