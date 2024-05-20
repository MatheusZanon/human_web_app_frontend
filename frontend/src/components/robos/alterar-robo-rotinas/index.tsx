import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Pencil } from 'lucide-react';
import RoboRotina from '@/utils/types/robo_rotinas';
import { CriarRotinaType, criarRotinaSchema } from '@/utils/types/criar_rotina';
import { useAlterarRotina } from '@/api/http/robos';
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

function AlterarRoboRotina({ roboId, rotina }: { roboId: string; rotina: RoboRotina }) {
    const { register, handleSubmit, setValue } = useForm<CriarRotinaType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(criarRotinaSchema),
    });

    const { mutate: alterarRotina, isPending, isSuccess, isError, error } = useAlterarRotina({ roboId });

    const onSubmit = (rotinaId: number, data: CriarRotinaType) => {
        alterarRotina({ rotinaId, data });
        if (isSuccess) {
            toast.success('Rotina alterada com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }

        if (isError) {
            toast.error(`Erro ao alterar rotina! ${error?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    };

    return (
        <BaseModalProvider onOpenCallback={() => setValue('nome', rotina.nome)}>
            <BaseModalTrigger>
                <Pencil size={18} />
            </BaseModalTrigger>
            <BaseModalRoot>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>Alterar Rotina</BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>
                        <form className='d-flex flex-column gap-2'>
                            <div>
                                <label htmlFor='rotina' className='form-label'>
                                    Nome
                                </label>
                                <input
                                    id='rotina'
                                    type='text'
                                    defaultValue={rotina.nome}
                                    className='form-control'
                                    {...register('nome')}
                                />
                            </div>
                        </form>
                    </BaseModalBody>
                    <BaseModalFooter>
                        <BaseModalConfirmationButton
                            onClick={handleSubmit((data) => onSubmit(rotina.id, data))}
                            disabled={isPending}
                        >
                            Salvar
                        </BaseModalConfirmationButton>
                        <BaseModalCloseButton>Fechar</BaseModalCloseButton>
                    </BaseModalFooter>
                </BaseModalContent>
            </BaseModalRoot>
        </BaseModalProvider>
    );
}

export { AlterarRoboRotina };
