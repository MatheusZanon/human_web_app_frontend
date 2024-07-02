import { useCriarParametro } from '@/api/http/robos';
import { criarParametroSchema, CriarParametroType } from '@/utils/types/robos/criar_parametro';
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

function CriarRoboParametroModal({ roboId }: { roboId: string }) {
    const { register, handleSubmit } = useForm<CriarParametroType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(criarParametroSchema),
    });
    const tipos = Object.keys(criarParametroSchema.shape.tipo.Values);

    const { mutate: criarParametro, isPending, isSuccess, isError, error } = useCriarParametro({ roboId });

    const onSubmit = (data: CriarParametroType) => {
        criarParametro(data);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Parâmetro criado com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error(`Erro ao criar parâmetro! ${error?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isError, error]);

    return (
        <BaseModalProvider>
            <BaseModalTrigger variant='primary' modalKey='criar-robo-parametro'>
                Criar Parâmetro
            </BaseModalTrigger>
            <BaseModalRoot modalKey='criar-robo-parametro'>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>Criar Parâmetro</BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>
                        <form className='d-flex flex-column gap-2'>
                            <div>
                                <label htmlFor='nome_parametro' className='form-label'>
                                    Nome
                                </label>
                                <input id='nome_parametro' type='text' className='form-control' {...register('nome')} />
                            </div>
                            <div>
                                <label htmlFor='tipo' className='form-label'>
                                    Tipo
                                </label>
                                <select id='robos' className='form-select' defaultValue='' {...register('tipo')}>
                                    <option value=''>Selecione um tipo</option>
                                    {tipos.map((tipo) => (
                                        <option key={tipo} value={tipo}>
                                            {tipo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </BaseModalBody>
                    <BaseModalFooter>
                        <BaseModalConfirmationButton onClick={handleSubmit(onSubmit)} disabled={isPending}>
                            Criar
                        </BaseModalConfirmationButton>
                        <BaseModalCloseButton>Cancelar</BaseModalCloseButton>
                    </BaseModalFooter>
                </BaseModalContent>
            </BaseModalRoot>
        </BaseModalProvider>
    );
}

export { CriarRoboParametroModal };
