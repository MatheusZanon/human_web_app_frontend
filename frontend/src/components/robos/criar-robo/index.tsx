import { useCreateRobo } from '@/api/http/robos';
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
import { CriarRoboType } from '@/utils/types/robos/criar_robo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const criarRoboSchema = z.object({
    nome: z.string().min(1, 'Este campo é obrigatório'),
    categoria: z.string().min(1, 'Este campo é obrigatório'),
    descricao: z.string().min(1, 'Este campo é obrigatório'),
});

function CriarRoboCard() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<CriarRoboType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(criarRoboSchema),
    });

    const { mutate: create, isPending, isSuccess, isError, error } = useCreateRobo();

    function onSubmit(data: CriarRoboType) {
        create(data);
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Robo criado com sucesso', {
                autoClose: 3000,
                position: 'bottom-right',
            });
            reset({
                nome: '',
                categoria: '',
                descricao: '',
            });
        }
    }, [isSuccess, reset]);

    useEffect(() => {
        if (isError) {
            toast.error(`Erro ao criar robo!`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isError, error]);

    return (
        <BaseModalProvider>
            <BaseModalTrigger variant='primary' modalKey='criar-robo'>
                Criar Robo
            </BaseModalTrigger>
            <BaseModalRoot modalKey='criar-robo'>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>Criar Robo</BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>
                        <form className='d-flex flex-column gap-2'>
                            <div>
                                <label htmlFor='nome_robo' className='form-label'>
                                    Nome
                                </label>
                                <input id='nome_robo' type='text' className='form-control' {...register('nome')} />
                                {errors.nome && <small className='text-danger'>{errors.nome?.message as string}</small>}
                            </div>
                            <div>
                                <label htmlFor='categoria_robo' className='form-label'>
                                    Categoria
                                </label>
                                <input
                                    id='categoria_robo'
                                    type='text'
                                    className='form-control'
                                    {...register('categoria')}
                                />
                                {errors.categoria && (
                                    <small className='text-danger'>{errors.categoria?.message as string}</small>
                                )}
                            </div>
                            <div>
                                <label htmlFor='descricao_robo' className='form-label'>
                                    Descrição
                                </label>
                                <input
                                    id='descricao_robo'
                                    type='text'
                                    className='form-control'
                                    {...register('descricao')}
                                />
                                {errors.descricao && (
                                    <small className='text-danger'>{errors.descricao?.message as string}</small>
                                )}
                            </div>
                        </form>
                    </BaseModalBody>
                    <BaseModalFooter>
                        <BaseModalConfirmationButton
                            onClick={isValid ? handleSubmit(onSubmit) : undefined}
                            disabled={isPending}
                            variant='primary'
                        >
                            Criar Robo
                        </BaseModalConfirmationButton>
                        <BaseModalCloseButton>Fechar</BaseModalCloseButton>
                    </BaseModalFooter>
                </BaseModalContent>
            </BaseModalRoot>
        </BaseModalProvider>
    );
}

export { CriarRoboCard };
