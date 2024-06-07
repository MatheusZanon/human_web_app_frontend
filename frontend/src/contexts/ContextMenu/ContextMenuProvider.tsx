import React, { createContext, useContext, useState, useCallback } from 'react';

type ContextMenuType = string | null;

interface ContextMenuProviderProps {
    visible : boolean;
    position : {x: number, y: number};
    type : ContextMenuType;
    showContextMenu : (event: React.MouseEvent, type: ContextMenuType) => void;
    hideContextMenu : () => void;
}

const ContextMenuContext = createContext<ContextMenuProviderProps | undefined>(undefined);

export const useContextMenu = (): ContextMenuProviderProps => {
    const context = useContext(ContextMenuContext);
    if (!context) {
        throw new Error('useContextMenu must be used within a ContextMenuProvider');
    }
    return context;
}

export const ContextMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [type, setType] = useState<ContextMenuType>(null);

    const showContextMenu = useCallback((event: React.MouseEvent, type: ContextMenuType) => {
        event.preventDefault();
        setPosition({ x: event.clientX, y: event.clientY });
        setType(type);
        setVisible(true);
    }, []);

    const hideContextMenu = useCallback(() => {
        setVisible(false);
        setType(null);
    }, []);

    return (
        <ContextMenuContext.Provider value={{ visible, position, type, showContextMenu, hideContextMenu }}>
            {children}
        </ContextMenuContext.Provider>
    );
};

