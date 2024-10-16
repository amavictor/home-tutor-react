import { useState, useEffect } from "react";

/**
 * Hook to check if the device is a mobile device.
 * 
 * @returns {boolean} `true` if the device is a mobile device, `false` otherwise.
 */
export const useDevice = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        /**
         * Function to check if the window width is less than 768px.
         */
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Set the initial state of isMobile to the current window width
        handleResize();
        // Add an event listener to window resize to update the state of isMobile
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
};
