import { useCriarOption, useRoboParametrosById } from '@/api/http/robos';
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
import { useEffect, useMemo } from 'react';
import { criarOptionSchema, CriarOptionType } from '@/utils/types/robos/criar_option';

function CriarRoboOptionModal({ roboId }: { roboId: string }) {
    const { register, handleSubmit } = useForm<CriarOptionType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(criarOptionSchema),
    });
    const { mutate: criarOption, isPending, isSuccess, isError, error } = useCriarOption({ roboId });

    const {
        data: roboParametros
    } = useRoboParametrosById({ roboId: roboId ? roboId : '' });

    const roboSelects = useMemo(() => {
        if (roboParametros) {
            return roboParametros.map((parametro) => {
                if (parametro.parametro_info.tipo.toLowerCase() === 'select') {
                    return parametro;
                }
            }).filter((parametro) => parametro !== undefined);
        }
    }, [roboParametros]);

    const onSubmit = (data: CriarOptionType) => {
        criarOption(data);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Option criada com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error(`Erro ao criar option! ${error?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isError, error]);

    return (
        <BaseModalProvider>
            <BaseModalTrigger variant='secondary' modalKey='criar-robo-option'>
                Criar Option
            </BaseModalTrigger>
            <BaseModalRoot modalKey='criar-robo-option'>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>Criar Option</BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>
                        <form className='d-flex flex-column gap-2'>
                            <div>
                                <label htmlFor='robo_select' className='form-label'>
                                    Select
                                </label>
                                <select id='robo_select' className='form-select' {...register('select_id')}>
                                    <option value="">Selecione um select</option>
                                    {roboSelects?.map((parametro) => (
                                        <option key={parametro.parametro_info.id} value={parametro.parametro_info.id}>
                                            {parametro.parametro_info.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor='nome_option' className='form-label'>
                                    Nome
                                </label>
                                <input id='nome_option' type='text' className='form-control' {...register('option_name')} />
                            </div>
                        </form>
                    </BaseModalBody>
                    <BaseModalFooter>
                        <BaseModalConfirmationButton onClick={handleSubmit(onSubmit, console.log)} disabled={isPending}>
                            Criar
                        </BaseModalConfirmationButton>
                        <BaseModalCloseButton>Cancelar</BaseModalCloseButton>
                    </BaseModalFooter>
                </BaseModalContent>
            </BaseModalRoot>
        </BaseModalProvider>
    );
}

export { CriarRoboOptionModal };
