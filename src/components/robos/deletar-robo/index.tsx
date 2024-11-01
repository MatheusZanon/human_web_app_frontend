import { useDeleteRobo } from '@/api/http/robos';
import { Robo } from '@/utils/types/robos/robo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
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

const deletarRoboSchema = z.object({
    id: z.string().min(1, 'Selecione um robô'),
});
type id = z.infer<typeof deletarRoboSchema>;

function DeletarRoboCard({ robos }: { robos: Robo[] }) {
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<id>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(deletarRoboSchema),
    });

    const { mutate: deleteRobo, isPending, isSuccess } = useDeleteRobo();

    function onSubmit(data: id) {
        const id = parseInt(data.id);
        deleteRobo(id);
    }

    useEffect(() => {
        if (isPending) {
            toast.info('Excluindo Robo...', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isPending]);

    useEffect(() => {
        if (isSuccess) {
            toast.dismiss();
            toast.success('Robo excluído com sucesso', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isSuccess]);

    return (
        <BaseModalProvider>
            <BaseModalTrigger variant='danger' modalKey='deletar-robo'>
                Excluir Robo
            </BaseModalTrigger>
            <BaseModalRoot modalKey='deletar-robo'>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>Excluir Robo</BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>
                        {robos.length === 0 && <div>Não existem robos para serem deletados!</div>}
                        {robos.length > 0 && (
                            <form className='d-flex flex-column gap-2'>
                                <div>
                                    <label className='form-label'>Robos</label>
                                    <select id='robos' className='form-select' defaultValue='' {...register('id')}>
                                        <option value=''>Selecione um robô</option>
                                        {robos.map((robo) => (
                                            <option key={robo.id} value={robo.id}>
                                                {robo.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        )}
                    </BaseModalBody>
                    <BaseModalFooter>
                        <BaseModalConfirmationButton
                            onClick={isValid ? handleSubmit(onSubmit) : undefined}
                            disabled={isPending}
                            aria-disabled={isPending}
                        >
                            Excluir
                        </BaseModalConfirmationButton>
                        <BaseModalCloseButton>Cancelar</BaseModalCloseButton>
                    </BaseModalFooter>
                </BaseModalContent>
            </BaseModalRoot>
        </BaseModalProvider>
        /*<>
            <button className='btn btn-danger' onClick={() => setShowDeleteModal(true)}>
                Deletar Robo
            </button>
            <div className={`modal ${showDeleteModal ? 'd-block' : 'd-none'}`} id='modalTeste'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>{'Deletar Robo'}</h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                                onClick={() => setShowDeleteModal(false)}
                            ></button>
                        </div>
                        <div className='modal-body'>
                            {robos.length === 0 && <div>Não existem robos para serem deletados!</div>}
                            {robos.length > 0 && (
                                <form className='d-flex flex-column gap-2'>
                                    <div>
                                        <label className='form-label'>Robos</label>
                                        <select id='robos' className='form-select' defaultValue='' {...register('id')}>
                                            <option value=''>Selecione um robô</option>
                                            {robos.map((robo) => (
                                                <option key={robo.id} value={robo.id}>
                                                    {robo.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                            )}
                        </div>
                        <div className='modal-footer'>
                            <button
                                type='submit'
                                className='btn btn-danger'
                                onClick={handleSubmit((data) => onSubmit(data))}
                                disabled={isPending}
                                aria-disabled={isPending}
                            >
                                Deletar
                            </button>
                            <button
                                type='button'
                                className='btn'
                                data-bs-dismiss='modal'
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>*/
    );
}

export { DeletarRoboCard };
