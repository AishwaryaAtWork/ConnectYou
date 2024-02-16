import React, { createContext, useState, useEffect, useContext } from 'react';

const ScreenSizeContext = createContext();

export const ScreenSizeProvider = ({ children }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 769);
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    });

    return (
        <ScreenSizeContext.Provider value={{ isSmallScreen }}>
            {children}
        </ScreenSizeContext.Provider>
    );
};

export const useScreenSize = () => {
    return useContext(ScreenSizeContext);
};

