import React, {useState, useEffect} from 'react';
import styles from './contextMenu.module.scss';

type ContextMenuProps = {
    children: React.ReactNode;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({children}) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        setPosition({ x: event.clientX, y: event.clientY });
        setVisible(true);
    };

    const handleCloseMenu = () => {
        setVisible(false);
    };

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleCloseMenu);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleCloseMenu);
        };
    }, []);

    if (!visible) return null;

    const { x, y } = position;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const srcW = 200; // Largura estimada do menu
    const srcH = 100; // Altura estimada do menu

    const top = y + srcH > screenH ? y - srcH : y;
    const left = x + srcW > screenW ? x - srcW : x;

    return (
        <div className={`card ${styles.contextMenu}`} style={{ top: top, left: left }} onContextMenu={(e) => e.preventDefault()}>
            <div className={`card-body ${styles.contextMenuBody}`}>                
                {children}
            </div>
        </div>
    );
}

type ContextMenuButtonProps = {
    children: React.ReactNode,
    onClick?: () => void,
}

export const ContextMenuButton: React.FC<ContextMenuButtonProps> = ({ children, onClick }) => {
    return <div className={`btn ${styles.contextMenuButton}`} onClick={onClick}>{children}</div>;
}