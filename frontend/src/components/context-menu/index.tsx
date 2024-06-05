import styles from './contextMenu.module.scss';

type ContextMenuProps = {
    top: number;
    left: number;
    children: React.ReactNode;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ top, left, children }) => {
    return (
        <div className={`card ${styles.contextMenu}`} style={{ top: top, left: left }}>
            <div className={`card-body ${styles.contextMenuBody}`}>
                {children}
            </div>
        </div>
    );
}

export default ContextMenu;