import api from '@/utils/axios';
import {
    BaseModalBody,
    BaseModalContent,
    BaseModalHeader,
    BaseModalRoot,
    BaseModalTitle,
    BaseModalFooter,
    BaseModalConfirmationButton,
    BaseModalCloseButton
} from '@/components/baseModal';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler, FieldValues} from 'react-hook-form';

type CriarPastaProps = {
    parents: string;
    isOpen: boolean;
    onDismiss: () => void;
}

const CriarPasta: React.FC<CriarPastaProps> = ({parents, isOpen, onDismiss}) => {
    const {register, handleSubmit, setValue} = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const formData = {
                folder_name: data.folder_name,
                parents: parents
            }
            const response = await api.post('google_drive/criar_pasta/', formData, {withCredentials: true});
            if (response.status === 200) {
                toast('Pasta criada com sucesso!', {type: "success", position: "bottom-right"});
                setValue('folder_name', '');
            }
        } catch(error: any) {
            if (error.response?.status === 400) {
                toast('Erro ao criar pasta, ela já existe!', {type: "error", position: "bottom-right"});
            } else {
                toast('Erro ao criar pasta: ' + error, {type: "error", position: "bottom-right"});
            }
        }
      };

    if (!isOpen) return null;

    return (
        <BaseModalRoot defaultOpen={isOpen} modalKey='criar_pasta' onClose={onDismiss}>
            <BaseModalContent>
                <BaseModalHeader>
                    <BaseModalTitle>Nova Pasta</BaseModalTitle>
                </BaseModalHeader>
                <BaseModalBody>
                    <form className='d-flex flex-column gap-2 w-100 h-100 px-1 pb-1'>
                        <div className='d-flex flex-column w-100'>
                            <input {...register('folder_name')} type="text" className='form-control' placeholder='Nome da pasta' />
                        </div>
                    </form>
                </BaseModalBody>
                <BaseModalFooter>
                    <BaseModalConfirmationButton onClick={handleSubmit(onSubmit)}>Criar</BaseModalConfirmationButton>
                    <BaseModalCloseButton>Cancelar</BaseModalCloseButton>
                </BaseModalFooter>
            </BaseModalContent>
        </BaseModalRoot>
    )
}

export default CriarPasta;