import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './baseModal.module.scss';
import { X } from 'lucide-react';

type ModalConfig = {
    isOpen: boolean;
    props?: object[];
    onOpen?: () => void;
    onClose?: () => void;
};

type BaseModalContextType = {
    openModals: { [key: string]: ModalConfig };
    toggleOpen: (modalKey: string) => void;
    setModalConfig: (modalKey: string, config: Partial<ModalConfig>) => void;
};
export const BaseModalContext = createContext<BaseModalContextType>({
    openModals: {},
    toggleOpen: () => {},
    setModalConfig: () => {},
});

type BaseModalProviderProps = {
    children: React.ReactNode;
};

const BaseModalProvider: React.FC<BaseModalProviderProps> = ({ children }) => {
    const [openModals, setOpenModals] = useState<{ [key: string]: ModalConfig }>({});

    const toggleOpen = useCallback((modalKey: string) => {
        setOpenModals((prevOpenModals) => {
            const isOpen = !prevOpenModals[modalKey]?.isOpen;
            const modalConfig = {
                ...prevOpenModals[modalKey],
                isOpen,
            };

            if (isOpen && modalConfig.onOpen) {
                modalConfig.onOpen();
            }
            if (!isOpen && modalConfig.onClose) {
                modalConfig.onClose();
            }

            return {
                ...prevOpenModals,
                [modalKey]: modalConfig,
            };
        });
    }, []);

    const setModalConfig = useCallback((modalKey: string, config: Partial<ModalConfig>) => {
        setOpenModals((prevOpenModals) => ({
            ...prevOpenModals,
            [modalKey]: {
                ...prevOpenModals[modalKey],
                ...config,
            },
        }));
    }, []);

    return (
        <BaseModalContext.Provider value={{ openModals, toggleOpen, setModalConfig }}>
            {children}
        </BaseModalContext.Provider>
    );
};

type BaseModalRootProps = {
    modalKey: string;
    modalProps?: object[];
    defaultOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

// Tipos e contexto para o modal específico
type ModalContextType = {
    modalKey: string;
    toggleOpen: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};

const BaseModalRoot: React.FC<BaseModalRootProps> = ({
    modalKey,
    modalProps,
    defaultOpen = false,
    onOpen,
    onClose,
    children,
    className: classNameProp,
}) => {
    const { openModals, setModalConfig, toggleOpen } = useContext(BaseModalContext);

    useEffect(() => {
        setModalConfig(modalKey, { isOpen: defaultOpen, props: modalProps, onOpen, onClose });
    }, [defaultOpen, onOpen, onClose, modalKey, modalProps, setModalConfig]);

    const isOpen = openModals[modalKey]?.isOpen || false;

    useEffect(() => {
        function disableScrolling() {
            const x = window.scrollX;
            const y = window.scrollY;
            window.onscroll = function () {
                window.scrollTo({ left: x, top: y, behavior: 'instant' });
            };
        }

        function enableScrolling() {
            window.onscroll = function () {};
        }

        if (openModals[modalKey]?.isOpen) {
            disableScrolling();
        } else {
            enableScrolling();
        }

        return () => {
            enableScrolling();
        };
    }, [openModals, modalKey]);

    const containerVariants = {
        initial: { opacity: 0, blur: '0px' },
        animate: { opacity: 1, blur: '5px' },
        exit: { opacity: 0, blur: '0px' },
    };

    return (
        <ModalContext.Provider value={{ modalKey, toggleOpen: () => toggleOpen(modalKey) }}>
            <AnimatePresence mode='wait'>
                {isOpen && (
                    <motion.div
                        className={`${styles.baseModalRoot} ${classNameProp} d-flex flex-column`}
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
        </ModalContext.Provider>
    );
};

type baseModalTriggerProps = {
    modalKey: string;
    children: React.ReactNode;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    styles?: React.CSSProperties;
};

const BaseModalTrigger: React.FC<baseModalTriggerProps> = ({
    modalKey,
    children,
    onClick: onClickProps,
    onMouseEnter: onMouseEnterProps,
    onMouseLeave: onMouseLeaveProps,
    variant = 'ghost',
    size = 'md',
    styles: stylesProps,
}) => {
    const { toggleOpen } = useContext(BaseModalContext);

    return (
        <button
            type='button'
            onClick={() => {
                onClickProps && onClickProps();
                toggleOpen(modalKey);
            }}
            onMouseEnter={() => {
                onMouseEnterProps && onMouseEnterProps();
            }}
            onMouseLeave={() => {
                onMouseLeaveProps && onMouseLeaveProps();
            }}
            className={`${styles.modalTrigger} btn ${variant !== 'ghost' ? `btn-${variant}` : ''} btn-${size} d-flex align-items-center gap-1`}
            style={stylesProps}
        >
            {children}
        </button>
    );
};

type baseModalContentProps = {
    children: React.ReactNode;
    styles?: React.CSSProperties;
};

const BaseModalContent: React.FC<baseModalContentProps> = ({ children, styles: stylesProps }) => {
    const { openModals } = useContext(BaseModalContext);
    const { toggleOpen, modalKey } = useModalContext();
    const isOpen = openModals[modalKey]?.isOpen || false;
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const clickedOutsideModal = modalRef.current && !modalRef.current.contains(event.target as Node);
            const clickedOnOpenButton =
                (event.target as HTMLElement).className &&
                (event.target as HTMLElement).className.includes('modalTrigger');
            if (clickedOutsideModal && !clickedOnOpenButton && isOpen) {
                toggleOpen();
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                toggleOpen();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, toggleOpen]);

    const contentVariants = {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
    };
    return (
        <motion.div
            ref={modalRef}
            className={`${styles.modalContent} d-flex flex-column`}
            style={{ ...stylesProps }}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={contentVariants}
            transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
        >
            <div className='d-flex w-100 justify-content-end'>
                <BaseModalCloseButton />
            </div>
            <div className='d-flex flex-column flex-grow-1 align-items-center w-100 overflow-x-hidden'>{children}</div>
        </motion.div>
    );
};

type baseModalBodyProps = {
    children: React.ReactNode;
};

const BaseModalBody: React.FC<baseModalBodyProps> = ({ children }) => {
    return (
        <div className={`${styles.modalBody} d-flex flex-column w-100 overflow-y-auto px-4 flex-grow-1 py-2`}>
            {children}
        </div>
    );
};

type baseModalCloseButtonProps = {
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
};

const BaseModalCloseButton: React.FC<baseModalCloseButtonProps> = ({ children, variant = 'ghost', size = 'md' }) => {
    const { toggleOpen } = useModalContext();

    return (
        <button
            type='button'
            className={`${styles.modalCloseButton} d-flex align-items-center gap-1 btn ${variant !== 'ghost' ? `btn-${variant}` : ''} btn-${size}`}
            onClick={toggleOpen}
        >
            <X size={18} />
            {children}
        </button>
    );
};

type baseModalConfirmationButtonPropsWithoutOnClick = {
    onClick?: undefined;
};

type baseModalConfirmationButtonPropsWithOnClick = {
    onClick: () => void;
};

type baseModalConfirmationButtonProps = {
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
} & (baseModalConfirmationButtonPropsWithoutOnClick | baseModalConfirmationButtonPropsWithOnClick);

const BaseModalConfirmationButton: React.FC<baseModalConfirmationButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
}) => {
    const { toggleOpen } = useModalContext();
    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
            toggleOpen();
        }
    }, [onClick, toggleOpen]);

    return (
        <button
            type='button'
            className={`${styles.modalConfirmationButton} d-flex align-items-center gap-1 btn ${variant !== 'ghost' ? `btn-${variant}` : ''} btn-${size}`}
            onClick={handleClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

type baseModalTitleProps = {
    children: React.ReactNode;
};

const BaseModalTitle: React.FC<baseModalTitleProps> = ({ children }) => {
    return (
        <div className={`${styles.modalTitle} text-wrap mb-2`}>
            <h3 className='d-flex gap-1 align-items-center'>{children}</h3>
        </div>
    );
};

type baseModalHeaderProps = {
    children: React.ReactNode;
};

const BaseModalHeader: React.FC<baseModalHeaderProps> = ({ children }) => {
    return <div className={`${styles.modalHeader} d-flex align-items-center w-100 px-4 border-bottom`}>{children}</div>;
};

type baseModalFooterProps = {
    children: React.ReactNode;
};

const BaseModalFooter: React.FC<baseModalFooterProps> = ({ children }) => {
    return (
        <div className={`${styles.modalFooter} d-flex align-items-center gap-1 w-100 px-4 border-top py-2`}>
            {children}
        </div>
    );
};

export {
    BaseModalRoot,
    BaseModalTrigger,
    BaseModalContent,
    BaseModalBody,
    BaseModalConfirmationButton,
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
    baseModalConfirmationButtonProps,
    baseModalCloseButtonProps,
};
