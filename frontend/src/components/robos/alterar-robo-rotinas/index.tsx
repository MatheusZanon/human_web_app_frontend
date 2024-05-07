import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Pencil } from 'lucide-react';
import RoboRotina from '@/utils/types/robo_rotinas';
import { CriarRotinaType, criarRotinaSchema } from '@/utils/types/criar_rotina';
import { useAlterarRotina } from '@/api/http/robos';

function AlterarRoboRotina({ roboId, rotina }: { roboId: string; rotina: RoboRotina }) {
    const [showAlterarRotinaModal, setAlterarRotinaModal] = useState(false);
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
        <>
            <button
                className='btn py-0 px-2'
                type='button'
                onClick={() => {
                    setAlterarRotinaModal(true), setValue('nome', rotina.nome);
                }}
            >
                <Pencil size={18} />
            </button>
            <div className={`modal ${showAlterarRotinaModal ? 'd-block' : 'd-none'}`} id='modalTeste'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Alterar Rotina</h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                                onClick={() => {
                                    setAlterarRotinaModal(false), setValue('nome', '');
                                }}
                            ></button>
                        </div>
                        <div className='modal-body'>
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
                        </div>
                        <div className='modal-footer'>
                            <button
                                type='submit'
                                className='btn btn-primary'
                                onClick={handleSubmit((data) => onSubmit(rotina.id, data))}
                                disabled={isPending}
                                aria-disabled={isPending}
                            >
                                Alterar
                            </button>
                            <button
                                type='button'
                                className='btn'
                                data-bs-dismiss='modal'
                                onClick={() => {
                                    setAlterarRotinaModal(false), setValue('nome', '');
                                }}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export { AlterarRoboRotina };
