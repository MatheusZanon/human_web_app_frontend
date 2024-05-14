import { useEffect, useState, useRef, useMemo } from 'react';
import { useGetClientes, usePostCliente } from '@/api/http/clientes_financeiro';
import { Search, Trash2 } from 'lucide-react';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead } from '@/components/table';
import { ArrowBigLeftDash, ArrowBigRightDash, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Content } from '@/components/layout/content';
import { cnpjFormatter, cpfFormatter, formatCnpj, formatCpf, phoneFormatter } from '@/libs';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import {
    BaseModalBody,
    BaseModalContent,
    BaseModalFooter,
    BaseModalHeader,
    BaseModalProvider,
    BaseModalRoot,
    BaseModalTitle,
    BaseModalTrigger,
} from '@/components/baseModal';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CriarClienteType } from '@/utils/types/criar_cliente';
import { toast } from 'react-toastify';

const newClienteFormSchema = z
    .object({
        nome_razao_social: z.string().min(1, { message: 'Este campo é obrigatório' }),
        nome_fantasia: z.string().min(1, { message: 'Este campo é obrigatório' }),
        cnpj: z.union([z.string().length(18, 'CNPJ inválido'), z.string().length(0, 'CNPJ inválido')]),
        cpf: z.union([z.string().length(14, 'CPF inválido'), z.string().length(0, 'CPF inválido')]),
        email: z.string().email({ message: 'Email inválido' }),
        telefone_celular: z
            .string()
            .trim()
            .regex(/^(\(?\d{2}\)?\s?)?(\d{5})-?(\d{4})$/, 'Formato de telefone inválido. Use o formato (XX) XXXXX-XXXX')
            .min(1, 'Este campo é obrigatório'),
        regiao: z.string().min(1, { message: 'Este campo é obrigatório' }),
    })
    .refine(
        (data) => {
            const hasCNPJ = Boolean(data?.cnpj);
            const hasCPF = Boolean(data?.cpf);

            // Deve ter pelo menos um deles preenchido
            if (!hasCNPJ && !hasCPF) {
                return false; // Se ambos estiverem vazios, a condição falha
            }

            // Se ambos estiverem preenchidos, também é uma falha
            if (hasCNPJ && hasCPF) {
                return false;
            }

            return true; // Se apenas um estiver preenchido, a condição é verdadeira
        },
        {
            message: 'Preencha apenas um dos campos: CNPJ ou CPF.',
            path: ['cpf'], // Exibe a mensagem para ambos os campos
        },
    );

function ClientesFinanceiro() {
    const [url, setUrl] = useState<string>('clientes_financeiro/?limit=12&offset=0');
    const clientes = useGetClientes(url);
    const clienteResults = useMemo(() => {
        return clientes.data && 'results' in clientes.data ? clientes.data.results : [];
    }, [clientes.data]);
    const [filtro, setFiltro] = useState<string>('');
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const { mutate: createCliente, isPending: isCreatingCliente, error: createClienteError } = usePostCliente();
    const { hasRole } = useAuthenticatedUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<CriarClienteType>({
        resolver: zodResolver(newClienteFormSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
    });

    const handleCNPJChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedCNPJ = cnpjFormatter(event.target.value);
        setValue('cnpj', formattedCNPJ);
    };

    const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedCPF = cpfFormatter(event.target.value);
        setValue('cpf', formattedCPF);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = phoneFormatter(event.target.value);
        setValue('telefone_celular', formattedPhone);
    };

    const onSubmit = (data: CriarClienteType) => {
        createCliente(data);

        if (isCreatingCliente) {
            toast.loading('Por favor, aguarde...');
        }

        if (!isCreatingCliente) {
            toast.dismiss();
        }

        if (!isCreatingCliente && !createClienteError) {
            toast.success('Cliente criado com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }

        if (!isCreatingCliente && createClienteError) {
            toast.error(`Erro ao atualizar dados! ${createClienteError?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setUrl(`clientes_financeiro/?limit=12&offset=0&search=${filtro}`);
        }, 500); // Delay de 500ms para evitar muitas requisições enquanto digita

        return () => {
            clearTimeout(delayDebounce);
        };
    }, [filtro]);

    useEffect(() => {
        if (clienteResults.length > 0 && inputRef.current) {
            inputRef.current.focus();
        }
    }, [clienteResults]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(event.target.value);
    };

    const handleEdit = (id: number) => {
        navigate(`${id}`);
    };

    return (
        <>
            <Content title='Clientes'>
                <div className='d-flex gap-2 justify-content-between align-items-center' style={{ height: '7vh' }}>
                    <div className='d-flex align-items-center gap-2 flex-grow-1'>
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => clientes?.data?.previous && setUrl(clientes.data.previous)}
                            disabled={!clientes?.data?.previous}
                        >
                            <ArrowBigLeftDash />
                        </button>
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => clientes?.data?.next && setUrl(clientes.data.next)}
                            disabled={!clientes?.data?.next}
                        >
                            <ArrowBigRightDash />
                        </button>
                        <input
                            ref={inputRef}
                            type='text'
                            className='form-control mx-2 w-25 custom-input'
                            value={filtro}
                            placeholder='Filtrar'
                            onChange={handleSearchChange}
                        />
                        {(hasRole('ADMIN') || hasRole('FINANCEIRO_OPERACAO')) && (
                            <BaseModalProvider>
                                <BaseModalTrigger variant='primary'>Adicionar Cliente</BaseModalTrigger>
                                <BaseModalRoot>
                                    <BaseModalContent>
                                        <BaseModalHeader>
                                            <BaseModalTitle>Adicionar Cliente</BaseModalTitle>
                                        </BaseModalHeader>
                                        <BaseModalBody>
                                            <form className='d-flex flex-column gap-2 w-100 h-100 px-1 pb-1 overflow-auto'>
                                                <div className='d-flex flex-column w-100'>
                                                    <label htmlFor='nome_razao_social' className='form-label'>
                                                        Nome Razão Social:
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='nome_razao_social'
                                                        {...register('nome_razao_social')}
                                                        className='form-control'
                                                    />
                                                    {errors.nome_razao_social && (
                                                        <p className='text-danger'>
                                                            {errors.nome_razao_social.message?.toString()}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className='d-flex flex-column w-100'>
                                                    <label htmlFor='nome_fantasia' className='form-label'>
                                                        Nome Fantasia:
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='nome_fantasia'
                                                        {...register('nome_fantasia')}
                                                        className='form-control'
                                                    />
                                                    {errors.nome_fantasia && (
                                                        <p className='text-danger'>
                                                            {errors.nome_fantasia.message?.toString()}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className='d-flex flex-column w-100'>
                                                    <label htmlFor='email' className='form-label'>
                                                        Email:
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='email'
                                                        {...register('email')}
                                                        className='form-control'
                                                    />
                                                    {errors.email && (
                                                        <p className='text-danger'>
                                                            {errors.email.message?.toString()}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className='d-flex flex-column w-100'>
                                                    <label htmlFor='telefone_celular' className='form-label'>
                                                        Telefone Celular:
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='telefone_celular'
                                                        {...register('telefone_celular')}
                                                        onChange={handlePhoneChange}
                                                        className='form-control'
                                                    />
                                                    {errors.telefone_celular && (
                                                        <p className='text-danger'>
                                                            {errors.telefone_celular.message?.toString()}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className='d-flex flex-column w-100'>
                                                    <label htmlFor='regiao' className='form-label'>
                                                        Região:
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='regiao'
                                                        {...register('regiao')}
                                                        className='form-control'
                                                    />
                                                    {errors.regiao && (
                                                        <p className='text-danger'>
                                                            {errors.regiao.message?.toString()}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className='d-flex flex-column w-100'>
                                                    <label htmlFor='cnpj' className='form-label'>
                                                        CNPJ:
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='cnpj'
                                                        {...register('cnpj')}
                                                        onChange={handleCNPJChange}
                                                        className='form-control'
                                                    />
                                                    {errors.cnpj && (
                                                        <p className='text-danger'>{errors.cnpj.message?.toString()}</p>
                                                    )}
                                                </div>
                                                <div className='d-flex flex-column w-100'>
                                                    <label htmlFor='cpf' className='form-label'>
                                                        CPF:
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='cpf'
                                                        {...register('cpf')}
                                                        onChange={handleCPFChange}
                                                        className='form-control'
                                                    />
                                                    {errors.cpf && (
                                                        <p className='text-danger'>{errors.cpf.message?.toString()}</p>
                                                    )}
                                                </div>
                                            </form>
                                        </BaseModalBody>
                                        <BaseModalFooter>
                                            <button
                                                type='button'
                                                className='btn btn-primary'
                                                onClick={handleSubmit(onSubmit)}
                                            >
                                                Adicionar
                                            </button>
                                        </BaseModalFooter>
                                    </BaseModalContent>
                                </BaseModalRoot>
                            </BaseModalProvider>
                        )}
                    </div>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>ID</TableHeader>
                            <TableHeader>Razão Social</TableHeader>
                            <TableHeader>CNPJ</TableHeader>
                            <TableHeader>CPF</TableHeader>
                            <TableHeader>Região</TableHeader>
                            <TableHeader>Ações</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clienteResults.length > 0 &&
                            clienteResults.map((cliente) => (
                                <TableRow key={cliente.id}>
                                    <TableData>{cliente.id}</TableData>
                                    <TableData>{cliente.nome_razao_social}</TableData>
                                    {cliente.cnpj ? (
                                        <TableData>{formatCnpj(cliente.cnpj)}</TableData>
                                    ) : (
                                        <TableData>-</TableData>
                                    )}
                                    {cliente.cpf ? (
                                        <TableData>{formatCpf(cliente.cpf)}</TableData>
                                    ) : (
                                        <TableData>-</TableData>
                                    )}
                                    <TableData>{cliente.regiao}</TableData>
                                    <TableData>
                                        <div className='d-flex gap-2'>
                                            <button
                                                className='btn btn-warning btn-sm p-1 d-flex justify-content-center align-items-center'
                                                onClick={() => handleEdit(cliente.id)}
                                            >
                                                <Search width={16} height={16} />
                                            </button>
                                            <button className='btn btn-danger btn-sm p-1 d-flex justify-content-center align-items-center'>
                                                <Trash2 width={16} height={16} />
                                            </button>
                                        </div>
                                    </TableData>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                {!clienteResults.length && (
                    <h6 className='text-center align-self-center'>
                        Nenhum cliente encontrado{' '}
                        <p className='mt-2'>
                            <AlertTriangle />
                        </p>
                    </h6>
                )}
            </Content>
        </>
    );
}

export default ClientesFinanceiro;
export { newClienteFormSchema };
