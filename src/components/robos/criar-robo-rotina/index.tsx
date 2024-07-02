import { useCriarRotina } from '@/api/http/robos';
import { CriarRotinaType, criarRotinaSchema } from '@/utils/types/robos/criar_rotina';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
    BaseModalBody,
    BaseModalCloseButton,
    BaseModalConfirmationButton,
    BaseModalContent,
    BaseModalFooter,
    BaseModalHeader,
    BaseModalProvider,
    BaseModalRoot,
    BaseModalTitle,
    BaseModalTrigger,
} from '@/components/baseModal';
import { useEffect } from 'react';

function CriarRoboRotinaModal({ roboId }: { roboId: string }) {
    const { register, handleSubmit } = useForm<CriarRotinaType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(criarRotinaSchema),
    });

    const { mutate: criarRotina, isPending, isSuccess, isError, error } = useCriarRotina({ roboId });

    const onSubmit = (data: CriarRotinaType) => {
        criarRotina(data);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Rotina criada com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error(`Erro ao criar rotina! ${error?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isError, error]);

    return (
        <BaseModalProvider>
            <BaseModalTrigger variant='secondary' modalKey='criar-robo-rotina'>Criar Rotina</BaseModalTrigger>
            <BaseModalRoot modalKey='criar-robo-rotina'>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>Criar Rotina</BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>
                        <form className='d-flex flex-column gap-2'>
                            <div>
                                <label htmlFor='nome_parametro' className='form-label'>
                                    Nome
                                </label>
                                <input id='nome_parametro' type='text' className='form-control' {...register('nome')} />
                            </div>
                        </form>
                    </BaseModalBody>
                    <BaseModalFooter>
                        <BaseModalConfirmationButton variant='primary' onClick={handleSubmit(onSubmit)} disabled={isPending}>
                            Criar
                        </BaseModalConfirmationButton>
                        <BaseModalCloseButton>Fechar</BaseModalCloseButton>
                    </BaseModalFooter>
                </BaseModalContent>
            </BaseModalRoot>
        </BaseModalProvider>
    );
}

export { CriarRoboRotinaModal };
