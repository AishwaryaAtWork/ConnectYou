import { createContext, useContext, useEffect, useState } from 'react';

const ScreenSizeContext = createContext();

export const ScreenSizeProvider = ({ children }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [openChatBox, setOpenChatBox] = useState(false);
    const [openLeftNav, setOpenLeftNav] = useState(false);
    const [openMainSidebar, setOpenMainSidebar] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    });

    return (
        <ScreenSizeContext.Provider value={{ isSmallScreen, openChatBox, setOpenChatBox, showAttachmentMenu, setShowAttachmentMenu, 
            openLeftNav, setOpenLeftNav, openSearch, setOpenSearch, openMainSidebar, setOpenMainSidebar }}>
            {children}
        </ScreenSizeContext.Provider>
    );
};

export const useScreenSize = () => {
    return useContext(ScreenSizeContext);
};
