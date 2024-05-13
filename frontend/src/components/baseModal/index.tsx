import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './baseModal.module.scss';
import { X } from 'lucide-react';

type BaseModalContextType = {
    open: boolean;
    toggleOpen: () => void;
    onOpen?: (fn?: () => void) => void;
    onClose?: (fn?: () => void) => void;
};
const BaseModalContext = createContext<BaseModalContextType>({
    open: false,
    onOpen: () => {},
    onClose: () => {},
    toggleOpen: () => {},
});

type BaseModalProviderProps = {
    children: React.ReactNode;
    defaultOpen?: boolean;
    onOpenCallback?: () => void;
    onCloseCallback?: () => void;
};

const BaseModalProvider: React.FC<BaseModalProviderProps> = ({
    children,
    defaultOpen = false,
    onOpenCallback,
    onCloseCallback,
}) => {
    const [open, setOpen] = useState(defaultOpen);

    const toggleOpen = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, [setOpen]);

    const onOpen = useCallback(
        (fn?: () => void) => {
            if (open === true && fn) return fn();
            return;
        },
        [open],
    );

    const onClose = useCallback(
        (fn?: () => void) => {
            if (open === false && fn) return fn();
            return;
        },
        [open],
    );

    onOpen(onOpenCallback);
    onClose(onCloseCallback);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;

        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalOverflow;
        }

        return () => {
            // Restaurar o valor original do overflow quando o componente for desmontado
            document.body.style.overflow = originalOverflow;
        };
    }, [open]);

    return (
        <BaseModalContext.Provider value={{ open, toggleOpen, onOpen, onClose }}>{children}</BaseModalContext.Provider>
    );
};

type BaseModalRootProps = {
    children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

const BaseModalRoot: React.FC<BaseModalRootProps> = ({ children, className: classNameProp }) => {
    const { open } = useContext(BaseModalContext);
    const containerVariants = {
        initial: { opacity: 0, blur: '0px' },
        animate: { opacity: 1, blur: '5px' },
        exit: { opacity: 0, blur: '0px' },
    };
    return (
        <AnimatePresence mode='wait'>
            {open && (
                <motion.div
                    className={`${styles.baseModalRoot} ${classNameProp} 'd-flex' flex-column`}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    variants={containerVariants}
                    transition={{ duration: 0.2, type: 'tween' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

type baseModalTriggerProps = {
    children: React.ReactNode;
};

const BaseModalTrigger: React.FC<baseModalTriggerProps> = ({ children }) => {
    const { toggleOpen } = useContext(BaseModalContext);
    return (
        <button type='button' onClick={toggleOpen} className={`${styles.modalTrigger} btn btn-primary`}>
            {children}
        </button>
    );
};

type baseModalContentProps = {
    children: React.ReactNode;
};

const BaseModalContent: React.FC<baseModalContentProps> = ({ children }) => {
    const { open, toggleOpen, onClose } = useContext(BaseModalContext);

    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
        onClose?.();
        toggleOpen();
    }, [onClose, toggleOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const clickedOutsideModal = modalRef.current && !modalRef.current.contains(event.target as Node);
            const clickedOnOpenButton = (event.target as HTMLElement).className.includes('modalTrigger');
            if (clickedOutsideModal && !clickedOnOpenButton && open) {
                handleClose();
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && open) {
                handleClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [open, handleClose]);

    const contentVariants = {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
    };
    return (
        <motion.div
            ref={modalRef}
            className={`${styles.modalContent} d-flex flex-column`}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={contentVariants}
            transition={{ duration: 0.2, type: 'spring', damping: 15, stiffness: 120, delay: 0.2 }}
        >
            <div className='d-flex w-100 justify-content-end'>
                <BaseModalCloseButton />
            </div>
            <div className='d-flex flex-column flex-grow-1 align-items-center w-100 overflow-y-scroll p-4'>{children}</div>
        </motion.div>
    );
};

type baseModalBodyProps = {
    children: React.ReactNode;
};

const BaseModalBody: React.FC<baseModalBodyProps> = ({ children }) => {
    return <div className={`${styles.modalBody} d-flex flex-column w-100 flex-grow-1`}>{children}</div>;
};

type baseModalCloseButtonProps = {
    children?: React.ReactNode;
};

const BaseModalCloseButton: React.FC<baseModalCloseButtonProps> = ({ children }) => {
    const { onClose, toggleOpen } = useContext(BaseModalContext);

    const handleClose = useCallback(() => {
        onClose?.();
        toggleOpen();
    }, [onClose, toggleOpen]);

    return (
        <button className={`${styles.modalCloseButton} btn`} onClick={handleClose}>
            <X size={18} />
            {children}
        </button>
    );
};

type baseModalTitleProps = {
    children: React.ReactNode;
};

const BaseModalTitle: React.FC<baseModalTitleProps> = ({ children }) => {
    return (
        <div className={styles.modalTitle}>
            <h3>{children}</h3>
        </div>
    );
};

type baseModalHeaderProps = {
    children: React.ReactNode;
};

const BaseModalHeader: React.FC<baseModalHeaderProps> = ({ children }) => {
    return <div className={`${styles.modalHeader} d-flex align-items-center w-100 border-bottom mb-2`}>{children}</div>;
};

type baseModalFooterProps = {
    children: React.ReactNode;
};

const BaseModalFooter: React.FC<baseModalFooterProps> = ({ children }) => {
    return <div className={`${styles.modalFooter} d-flex align-items-center w-100 border-top mt-2`}>{children}</div>;
};

export {
    BaseModalRoot,
    BaseModalTrigger,
    BaseModalContent,
    BaseModalBody,
    BaseModalCloseButton,
    BaseModalTitle,
    BaseModalHeader,
    BaseModalFooter,
    BaseModalProvider,
};

export type {
    BaseModalRootProps,
    baseModalTitleProps,
    baseModalFooterProps,
    baseModalHeaderProps,
    baseModalContentProps,
    baseModalBodyProps,
    baseModalCloseButtonProps,
};
