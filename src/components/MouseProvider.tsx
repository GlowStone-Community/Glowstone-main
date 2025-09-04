'use client';

import { createContext, useContext, useEffect, useState } from "react";


const MouseContext = createContext<{
    x:number;
    y:number;
}> ({x:0, y:0}); //  the positon of cursor

export const MouseProvider = ({children}: {children: React.ReactNode}) => {

    const [mousePosition, setMousePosition] = useState({x:0, y:0});
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({x:e.clientX, y:e.clientY});
        };
        window.addEventListener('mousemove', handleMouseMove);
        // remove the event listener when the component unmounts
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    return (
        <MouseContext.Provider value={mousePosition}>{children}</MouseContext.Provider>
    )
};

// custom hook to use the mouse position
export const useMousePosition = () => {
    return useContext(MouseContext);
}