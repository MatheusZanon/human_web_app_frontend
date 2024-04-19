import { fromNowDays } from '@/libs';
import styles from './robo-card.module.scss';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useExecutarRobo, useRoboParametrosById, useGetRoboRotinasById } from '@/api/http/robos';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CardProps = {
    children?: React.ReactNode;
    id: string;
    image: string;
    title: string;
    text: string;
    categoria: string;
    details_link: string;
    btn: string;
    executions: number;
    last_execution: string;
};

function Card({
    id,
    image,
    title,
    text,
    categoria,
    details_link,
    btn,
    executions,
    last_execution,
    children,
}: CardProps) {
    const [showModal, setShowModal] = useState(false);

    const { data: roboParametros } = useRoboParametrosById({
        roboId: id,
    });

    const { data: roboRotinas, isSuccess: isRoboRotinasSuccess } = useGetRoboRotinasById({ roboId: id ? id : '' });
    const createSchemaFromResponse = (response: typeof roboParametros) => {
        const schemaObject: Record<string, z.ZodType> = {};

        // Iterar sobre as chaves da resposta da API
        for (const key in response) {
            // eslint-disable-next-line no-prototype-builtins
            if (response.hasOwnProperty(key)) {
                const parametroInfo = response[key].parametro_info;
                const tipo = parametroInfo.tipo;

                // Definir o tipo do Zod com base no tipo do parâmetro
                switch (tipo) {
                    case 'TEXT' || 'DATE':
                        schemaObject[parametroInfo.nome] = z.string().min(1, 'Este campo é obrigatório');
                        break;
                    case 'NUMBER':
                        schemaObject[parametroInfo.nome] = z
                            .number({
                                invalid_type_error: 'Por favor digite um número',
                            })
                            .min(1, 'Este campo é obrigatório');
                        break;
                    // Adicione outros casos conforme necessário
                    default:
                        schemaObject[parametroInfo.nome] = z.unknown(); // Se o tipo não for reconhecido, aceitamos qualquer tipo
                        break;
                }
            }
        }

        return z.object(schemaObject);
    };

    const RoboParametrosSchema = createSchemaFromResponse(roboParametros);
    type RoboParametrosType = z.infer<typeof RoboParametrosSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RoboParametrosType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        defaultValues: roboParametros
            ? Object.fromEntries(
                  roboParametros.map((parametro) => [parametro?.parametro_info?.nome ?? '', parametro?.valor ?? '']),
              )
            : {},
        resolver: zodResolver(RoboParametrosSchema),
    });

    const { mutate: executarRobo } = useExecutarRobo({
        roboId: id,
    });

    const onSubmit = (data: RoboParametrosType) => {
        executarRobo(data);
    };
    return (
        <div className={`card ${styles.card} shadow`}>
            <img src={image} alt='dummy' className='card-img-top' />
            <div className='card-body d-flex flex-column justify-content-between'>
                <div className='row'>
                    <h5 className='card-title d-flex justify-content-between align-items-center'>
                        {title}
                        <a href={details_link}>
                            <Search width={20} height={20} />
                        </a>
                    </h5>
                    <p className='card-text'>{text}</p>
                </div>
                <div className=''>
                    <hr />
                    <div className={`${styles.cardTags}`}>
                        <p className='fw-bold d-flex justify-content-between'>
                            Categoria: <span className='text-muted fw-normal'>{categoria}</span>
                        </p>
                        <p className='fw-bold d-flex justify-content-between'>
                            Execuções: <span className='text-muted fw-normal'>{executions}</span>
                        </p>
                        <p className='fw-bold d-flex justify-content-between'>
                            Ultima execução:{' '}
                            <span className='text-muted fw-normal'>
                                {fromNowDays(new Date(last_execution)) != 0 ? (
                                    <>{fromNowDays(new Date(last_execution))} dias</>
                                ) : (
                                    <>Hoje</>
                                )}
                            </span>
                        </p>
                    </div>
                    <button type='button' className='btn btn-primary' onClick={() => setShowModal(true)}>
                        {btn}
                    </button>
                </div>
                <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} id='modalTeste'>
                    <div className='modal-dialog modal-dialog-centered'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>{title}</h5>
                                <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className='modal-body'>
                                {roboParametros && roboParametros.length > 0 ? (
                                    <>
                                        <h2>Parametros</h2>
                                        <form className='d-flex flex-column gap-2'>
                                            {roboParametros.map((parametro) => (
                                                <div key={parametro.id} className='d-flex'>
                                                    <div className='flex-grow-1'>
                                                        <label
                                                            className='form-label d-flex justify-content-between'
                                                            htmlFor={`parametro_${parametro.id}`}
                                                        >
                                                            <span className='flex-grow-1'>
                                                                {parametro.parametro_info.nome}
                                                            </span>
                                                        </label>
                                                        {parametro.parametro_info.tipo.toLowerCase().trim() ===
                                                            'date' && (
                                                            <input
                                                                type='date'
                                                                id={`parametro_${parametro.id}`}
                                                                defaultValue={parametro.valor}
                                                                {...register(parametro.parametro_info.nome)}
                                                                className={`form-control`}
                                                            />
                                                        )}
                                                        {parametro.parametro_info.tipo.toLowerCase().trim() ===
                                                            'integer' && (
                                                            <input
                                                                type='number'
                                                                id={`parametro_${parametro.id}`}
                                                                defaultValue={parametro.valor}
                                                                {...register(parametro.parametro_info.nome)}
                                                                className={`form-control`}
                                                            />
                                                        )}
                                                        {parametro.parametro_info.tipo.toLowerCase().trim() ===
                                                            'float' && (
                                                            <input
                                                                type='number'
                                                                id={`parametro_${parametro.id}`}
                                                                defaultValue={parametro.valor}
                                                                {...register(parametro.parametro_info.nome)}
                                                                className={`form-control`}
                                                            />
                                                        )}
                                                        {parametro.parametro_info.tipo.toLowerCase().trim() ===
                                                            'boolean' && (
                                                            <input
                                                                type='checkbox'
                                                                id={`parametro_${parametro.id}`}
                                                                defaultValue={parametro.valor}
                                                                {...register(parametro.parametro_info.nome)}
                                                                className={`form-check-input`}
                                                            />
                                                        )}
                                                        {parametro.parametro_info.tipo.toLowerCase().trim() ===
                                                            'text' && (
                                                            <input
                                                                type='text'
                                                                id={`parametro_${parametro.id}`}
                                                                defaultValue={parametro.valor}
                                                                {...register(parametro.parametro_info.nome)}
                                                                className={`form-control`}
                                                            />
                                                        )}
                                                        {errors[parametro.parametro_info.nome] && (
                                                            <p className='text-danger'>
                                                                {
                                                                    errors[parametro.parametro_info.nome]
                                                                        ?.message as string
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            {isRoboRotinasSuccess && roboRotinas.length > 0 && (
                                                <div>
                                                    <label className='form-label'>Rotina</label>
                                                    <select
                                                        id='rotinas'
                                                        className='form-select'
                                                        defaultValue=''
                                                        {...register('rotina')}
                                                    >
                                                        <option value=''>Selecione uma rotina</option>
                                                        {roboRotinas.map((rotina) => (
                                                            <option key={rotina.id} value={rotina.nome}>
                                                                {rotina.nome}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <p className='text-muted'>Nenhum parametro encontrado</p>
                                        {roboRotinas && roboRotinas.length > 0 && (
                                            <>
                                                <form>
                                                    <div>
                                                        <label className='form-label'>Rotina</label>
                                                        <select
                                                            id='rotinas'
                                                            className='form-select'
                                                            defaultValue=''
                                                            {...register('rotina')}
                                                        >
                                                            <option value=''>Selecione uma rotina</option>
                                                            {roboRotinas.map((rotina) => (
                                                                <option key={rotina.id} value={rotina.nome}>
                                                                    {rotina.nome}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </form>
                                            </>
                                        )}
                                    </>
                                )}
                                {children}
                            </div>
                            <div className='modal-footer'>
                                <button onClick={handleSubmit(onSubmit)} className='btn btn-primary'>
                                    Executar
                                </button>
                                <button
                                    type='button'
                                    className='btn'
                                    data-bs-dismiss='modal'
                                    onClick={() => setShowModal(false)}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
