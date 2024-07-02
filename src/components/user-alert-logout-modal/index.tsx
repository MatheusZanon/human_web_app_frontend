import React from 'react';
import {
    BaseModalBody,
    BaseModalConfirmationButton,
    BaseModalContent,
    BaseModalFooter,
    BaseModalHeader,
    BaseModalProvider,
    BaseModalRoot,
    BaseModalTitle,
} from '../baseModal';
import { AlertCircle } from 'lucide-react';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <BaseModalProvider>
            <BaseModalRoot modalKey='logout' defaultOpen={isOpen} onClose={onClose}>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>
                            Sessão expirada <AlertCircle color='red' />
                        </BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>
                        <div className='alert alert-danger'>
                            <h4 className='mb-0'>Sua sessão expirou.</h4>
                            <h4>Por favor, faça login novamente.</h4>
                        </div>
                    </BaseModalBody>
                    <BaseModalFooter>
                        <BaseModalConfirmationButton onClick={onClose}>Continuar</BaseModalConfirmationButton>
                    </BaseModalFooter>
                </BaseModalContent>
            </BaseModalRoot>
        </BaseModalProvider>
    );
};

export default LogoutModal;
