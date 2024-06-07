import React, {Children, useEffect} from 'react';
import { useContextMenu } from '@/contexts/ContextMenu/ContextMenuProvider';
import styles from './contextMenu.module.scss';


export const ContextMenu: React.FC<{ children: React.ReactNode}> = ({children}) => {
    const {visible, position, hideContextMenu, type} = useContextMenu();

    useEffect (() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (!e.target) return;
            hideContextMenu();
        };

        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
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
    type: string | null
}

export const ContextMenuButton: React.FC<ContextMenuButtonProps> = ({ children, onClick, type : typeButton }) => {
    const {type} = useContextMenu();
    if (type !== typeButton) return null;
    return (
        <div className={`btn ${styles.contextMenuButton}`} onClick={onClick}>{children}</div>
    );
}