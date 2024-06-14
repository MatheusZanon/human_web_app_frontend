import { useState } from 'react';
import { fromNowDays } from '@/libs';
import styles from './robo-card.module.scss';
import { Search } from 'lucide-react';
import { useExecutarRobo, useRoboParametrosById, useGetRoboRotinasById } from '@/api/http/robos';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import financeiroLogo from '/financeiro.svg';
import relatorioLogo from '/relatorio.svg';
import { useNavigate } from 'react-router-dom';
import { useGetClientesFinanceiro } from '@/api/http/dashboard';
import UploadDropzone from '@/components/upload-dropzone';

type RoboCardProps = {
    children?: React.ReactNode;
    id: string;
    title: string;
    text: string;
    categoria: string;
    details_link: string;
    btn: string;
    executions: number;
    last_execution: string;
};

function RoboCard({ id, title, text, categoria, details_link, executions, last_execution, children }: RoboCardProps) {
    const { data: roboParametros } = useRoboParametrosById({
        roboId: id,
    });

    const { data: roboRotinas, isSuccess: isRoboRotinasSuccess } = useGetRoboRotinasById({ roboId: id ? id : '' });

    const { data: clientesFinanceiro, isSuccess: isGetClientesFinanceiroSuccess } = useGetClientesFinanceiro();

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
        getValues,
        formState: { errors },
        watch,
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

    const initialFolderId = import.meta.env.VITE_FOLDER_ID;
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');

    const configuraMes = (data: string) => {
        setMes(data)
    }
    const configuraAno = (data: string) => {
        setAno(data)
    }

    const { mutate: executarRobo, isPending: isExecuting } = useExecutarRobo({
        roboId: id,
    });

    const onSubmit = (data: RoboParametrosType) => {
        executarRobo(data);
    };

    const navigate = useNavigate();
    return (
        <div className={`card ${styles.card} shadow`}>
            <img
                src={
                    categoria
                        .toLocaleLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '') === 'financeiro'
                        ? financeiroLogo
                        : categoria
                                .toLocaleLowerCase()
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '') === 'relatorio'
                          ? relatorioLogo
                          : '/fallback-image.png'
                }
                alt={`Imagem categoria ${categoria}`}
                className={`card-img-top p-2 ${styles.img}`}
            />
            <div className='card-body d-flex flex-column justify-content-between'>
                <div className='row'>
                    <h5 className='card-title d-flex justify-content-between align-items-center'>
                        {title}
                        <a onClick={() => navigate('/main/' + details_link)}>
                            <Search width={20} height={20} color='#588fe8' type='button'/>
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
                    <BaseModalProvider>
                        <BaseModalTrigger variant='primary' modalKey='executar-robo'>
                            Executar
                        </BaseModalTrigger>
                        <BaseModalRoot modalKey='executar-robo'>
                            <BaseModalContent>
                                <BaseModalHeader>
                                    <BaseModalTitle>{title}</BaseModalTitle>
                                </BaseModalHeader>
                                <BaseModalBody>
                                    {roboParametros && roboParametros.length > 0 ? (
                                        <>
                                            <h2>Parametros</h2>
                                            <form className='d-flex flex-column gap-2'>
                                                {roboParametros.map((parametro) => (
                                                    <>
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
                                                                        {...register(parametro.parametro_info.nome,
                                                                            {
                                                                                setValueAs: (value) => (
                                                                                    parseInt(value),
                                                                                    title === 'Organiza Extrato' && parametro.parametro_info.nome === 'mes' &&
                                                                                        configuraMes(value),
                                                                                    
                                                                                    title === 'Organiza Extrato' && parametro.parametro_info.nome === 'ano' &&
                                                                                        configuraAno(value)    
                                                                                ),
                                                                                onChange: (e) => {
                                                                                    {title === 'Organiza Extrato' && parametro.parametro_info.nome === 'mes' &&
                                                                                        configuraMes(e.target.value)
                                                                                    }
                            
                                                                                    {title === 'Organiza Extrato' && parametro.parametro_info.nome === 'ano' &&
                                                                                        configuraAno(e.target.value)
                                                                                    }  
                                                                                }
                                                                            }
                                                                        )}
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
                                                                        {...register(
                                                                            parametro.parametro_info.nome)}
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
                                                    </>
                                                ))}
                                                {isRoboRotinasSuccess && roboRotinas.length > 0 && (
                                                    <div>
                                                        <label className='form-label d-flex justify-content-between'>
                                                            <span className='flex-grow-1'>Rotina</span>
                                                        </label>
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
                                                        {watch('rotina') &&
                                                            watch('rotina') === '5. Refazer Processo' &&
                                                            isGetClientesFinanceiroSuccess && (
                                                                <>
                                                                    <div
                                                                    className='d-flex flex-column gap-1 overflow-y-auto mb-4'
                                                                    style={{ maxHeight: '200px' }}
                                                                    >
                                                                        {clientesFinanceiro.map((cliente) => (
                                                                            <div key={cliente.id}>
                                                                                <div className='form-check'>
                                                                                    <input
                                                                                        className='form-check-input'
                                                                                        type='checkbox'
                                                                                        id={`cliente_${cliente.id}`}
                                                                                        value={cliente.id}
                                                                                        {...register('clientes')}
                                                                                    />
                                                                                    <label
                                                                                        className='form-check-label'
                                                                                        htmlFor={`cliente_${cliente.id}`}
                                                                                    >
                                                                                        {cliente.nome_razao_social}
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <label className='form-label d-flex justify-content-between'>
                                                                        <span className='flex-grow-1'>Carregar Extratos a Refazer</span>
                                                                    </label>
                                                                    <UploadDropzone 
                                                                        url={`google_drive/upload_extrato_robo/?mes=${mes}&ano=${ano}`}
                                                                        parents={initialFolderId}
                                                                        onUploadComplete={() => {}}
                                                                    />
                                                                </>
                                                            )}
                                                    </div>
                                                )}
                                            </form>
                                        </>
                                    ) : (
                                        <>
                                            <p className='text-muted'>Nenhum parametro encontrado</p>
                                            {roboRotinas && roboRotinas.length > 0 && (
                                                <form>
                                                    <div>
                                                        <label className='form-label d-flex justify-content-between'>
                                                            <span className='flex-grow-1'>Rotina</span>
                                                        </label>
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
                                            )}
                                        </>
                                    )}
                                    {children}
                                </BaseModalBody>
                                <BaseModalFooter>
                                    <BaseModalConfirmationButton
                                        onClick={() => onSubmit(getValues())}
                                        disabled={isExecuting}
                                        variant='primary'
                                    >
                                        Executar
                                    </BaseModalConfirmationButton>
                                    <BaseModalCloseButton>Fechar</BaseModalCloseButton>
                                </BaseModalFooter>
                            </BaseModalContent>
                        </BaseModalRoot>
                    </BaseModalProvider>
                </div>
            </div>
        </div>
    );
}

export default RoboCard;
