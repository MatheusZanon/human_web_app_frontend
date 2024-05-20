import { criarParametroSchema, CriarParametroType } from '@/utils/types/criar_parametro';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Pencil } from 'lucide-react';
import { RoboParametros } from '@/utils/types/robo_parametros';
import { useAlterarParametro } from '@/api/http/robos';
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

function AlterarRoboParametro({ roboId, parametro }: { roboId: string; parametro: RoboParametros }) {
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

    const { mutate: alterarParametro, isPending, isSuccess, isError, error } = useAlterarParametro({ roboId });

    const onSubmit = (parametroId: number, data: CriarParametroType) => {
        alterarParametro({ parametroId, data });
        if (isSuccess) {
            toast.success('Parâmetro alterado com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }

        if (isError) {
            toast.error(`Erro ao alterar parâmetro! ${error?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    };

    return (
        <BaseModalProvider>
            <BaseModalTrigger>
                <Pencil size={18} />
            </BaseModalTrigger>
            <BaseModalRoot>
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
                                    defaultValue={parametro.parametro_info.nome}
                                    className='form-control'
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
                                    defaultValue={tipos.filter((tipo) => parametro.parametro_info.tipo === tipo)}
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
        </BaseModalProvider>
    );
}

export { AlterarRoboParametro };
