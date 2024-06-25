import { criarParametroSchema, CriarParametroType } from '@/utils/types/robos/criar_parametro';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { RoboParametros } from '@/utils/types/robos/robo_parametros';
import { useAlterarParametro } from '@/api/http/robos';
import {
    BaseModalBody,
    BaseModalCloseButton,
    BaseModalConfirmationButton,
    BaseModalContent,
    BaseModalFooter,
    BaseModalHeader,
    BaseModalRoot,
    BaseModalTitle,
} from '@/components/baseModal';
import { useEffect } from 'react';

function AlterarRoboParametro({
    roboId,
    parametro,
    modalKey,
}: {
    roboId: string;
    parametro: RoboParametros;
    modalKey: string;
}) {
    const { register, handleSubmit, setValue, getValues } = useForm<CriarParametroType>({
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

    const { mutate: alterarParametro, isPending, isSuccess, isError, error } = useAlterarParametro({ roboId });

    const onSubmit = (parametroId: number, data: CriarParametroType) => {
        alterarParametro({ parametroId, data });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Parâmetro alterado com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error(`Erro ao alterar parâmetro! ${error?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isError, error]);

    return (
        <BaseModalRoot
            modalKey={modalKey}
            onOpen={() => {
                setValue('nome', parametro.parametro_info.nome);
                setValue('tipo', parametro.parametro_info.tipo as CriarParametroType['tipo']);
            }}
        >
            <BaseModalContent>
                <BaseModalHeader>
                    <BaseModalTitle>Alterar Parâmetro</BaseModalTitle>
                </BaseModalHeader>
                <BaseModalBody>
                    <form className='d-flex flex-column gap-2'>
                        <div>
                            <label htmlFor='nome_parametro' className='form-label'>
                                Nome
                            </label>
                            <input
                                id='nome_parametro'
                                type='text'
                                className='form-control'
                                defaultValue={getValues('nome')}
                                {...register('nome')}
                            />
                        </div>
                        <div>
                            <label htmlFor='tipo' className='form-label'>
                                Tipo
                            </label>
                            <select
                                id='robos'
                                className='form-select'
                                defaultValue={getValues('tipo')}
                                {...register('tipo')}
                            >
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
                    <BaseModalConfirmationButton
                        variant='primary'
                        onClick={handleSubmit((data) => {
                            onSubmit(Number(parametro.parametro_info.id), data);
                        })}
                        disabled={isPending}
                    >
                        Salvar
                    </BaseModalConfirmationButton>
                    <BaseModalCloseButton>Cancelar</BaseModalCloseButton>
                </BaseModalFooter>
            </BaseModalContent>
        </BaseModalRoot>
    );
}

export { AlterarRoboParametro };
