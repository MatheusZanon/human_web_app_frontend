import {
    useDeleteClienteFolhaPonto,
    useGetClientesFolhaPonto,
    usePostClienteFolhaPonto,
    useUpdateClienteFolhaPonto,
} from '@/api/http/clientes_financeiro';
import { useGetClientesFinanceiro } from '@/api/http/dashboard';
import AlertMessage from '@/components/alert-message';
import {
    BaseModalBody,
    BaseModalConfirmationButton,
    BaseModalContent,
    BaseModalFooter,
    BaseModalHeader,
    BaseModalRoot,
    BaseModalTitle,
    BaseModalTrigger,
} from '@/components/baseModal';
import { Content } from '@/components/layout/content';
import { Table, TableBody, TableData, TableHead, TableHeader, TableRow } from '@/components/table';
import { DotNestedKeys } from '@/utils/types/dot_nested_object';
import { UpdateSchemaType, updateSchema } from '@/utils/types/rh/atualizar_cliente_folha_ponto';
import { ClienteFolhaPonto } from '@/utils/types/rh/cliente_folha_ponto';
import { AddSchemaType, addSchema } from '@/utils/types/rh/criar_cliente_folha_ponto';
import { RemoveSchemaType, removeSchema } from '@/utils/types/rh/remover_cliente_folha_ponto';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowBigLeftDash, ArrowBigRightDash, Check, Pencil, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ClientesFolhaPontoRH() {
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortBy, setSortBy] = useState<DotNestedKeys<ClienteFolhaPonto>>('cliente.nome_razao_social');
    const [url, setUrl] = useState<string>('clientes_financeiro/folha_ponto?limit=12&offset=0');
    const { data: clientesFolhaPonto, isSuccess: isGetClientesFolhaPontoSuccess } = useGetClientesFolhaPonto(url);
    const [selectedRegistro, setSelectedRegistro] = useState<ClienteFolhaPonto | null>(null);
    const { data: clientesFinanceiro, isSuccess: isGetClientesFinanceiroSuccess } = useGetClientesFinanceiro(
        true,
        false,
    );

    const {
        mutate: postClienteFolhaPontoMutate,
        isPending: isPostClienteFolhaPontoPending,
        error: postClienteFolhaPontoError,
        isError: isPostClienteFolhaPontoError,
        isSuccess: isPostClienteFolhaPontoSuccess,
    } = usePostClienteFolhaPonto();

    const {
        mutate: deleteClienteFolhaPontoMutate,
        isPending: isDeleteClienteFolhaPontoPending,
        error: deleteClienteFolhaPontoError,
        isError: isDeleteClienteFolhaPontoError,
        isSuccess: isDeleteClienteFolhaPontoSuccess,
    } = useDeleteClienteFolhaPonto();

    const {
        mutate: updateClienteFolhaPontoMutate,
        isPending: isUpdateClienteFolhaPontoPending,
        error: updateClienteFolhaPontoError,
        isError: isUpdateClienteFolhaPontoError,
        isSuccess: isUpdateClienteFolhaPontoSuccess,
    } = useUpdateClienteFolhaPonto();

    const { register: registerAdd, handleSubmit: handleSubmitAdd } = useForm<AddSchemaType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(addSchema),
    });

    const {
        register: registerRemove,
        setValue: setValueRemove,
        handleSubmit: handleSubmitRemove,
    } = useForm<RemoveSchemaType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(removeSchema),
    });

    const {
        register: registerUpdate,
        setValue: setValueUpdate,
        handleSubmit: handleSubmitUpdate,
    } = useForm<UpdateSchemaType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(updateSchema),
    });

    const onSubmitAdd = ({ id_clientes }: AddSchemaType) => {
        postClienteFolhaPontoMutate({ id_clientes });

        if (isPostClienteFolhaPontoPending) {
            toast.loading('Adicionando...');
        }

        if (isPostClienteFolhaPontoError) {
            toast.error(postClienteFolhaPontoError.response?.data as string);
        }

        if (isPostClienteFolhaPontoSuccess) {
            toast.success('Adicionado com sucesso');
        }
    };

    const onSubmitRemove = ({ id }: RemoveSchemaType) => {
        deleteClienteFolhaPontoMutate({ id });

        if (isDeleteClienteFolhaPontoPending) {
            toast.loading('Removendo...');
        }

        if (isDeleteClienteFolhaPontoError) {
            toast.error(deleteClienteFolhaPontoError.response?.data as string);
        }

        if (isDeleteClienteFolhaPontoSuccess) {
            toast.success('Removido com sucesso');
        }
    };

    const onSubmitUpdate = ({ id, id_cliente, registrado, colaborador }: UpdateSchemaType) => {
        updateClienteFolhaPontoMutate({ id, id_cliente, registrado, colaborador });

        if (isUpdateClienteFolhaPontoPending) {
            toast.loading('Atualizando...');
        }

        if (isUpdateClienteFolhaPontoError) {
            toast.error(updateClienteFolhaPontoError.response?.data as string);
        }

        if (isUpdateClienteFolhaPontoSuccess) {
            toast.success('Atualizado com sucesso');
        }
    };

    const handleSort = (columnKey: DotNestedKeys<ClienteFolhaPonto>) => {
        if (sortBy === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnKey as DotNestedKeys<ClienteFolhaPonto>);
            setSortDirection('asc');
        }
    };

    const clientes = isGetClientesFolhaPontoSuccess ? clientesFolhaPonto.results : [];

    const sortedData = [...clientes].sort((a, b) => {
        // Checa se o sortBy é uma chave de um objeto
        if (sortBy.includes('.')) {
            const keys = sortBy.split('.');
            // Percorre as chaves do objeto enquanto houver chaves
            while (keys.length > 0) {
                const key = keys.shift()!;
                // Atribui o valor da chave ao objeto
                if (key) {
                    a = a[key];
                    b = b[key];
                }
            }

            // Compara os valores que devem ser usados na ordenação
            if (a < b) return sortDirection === 'asc' ? -1 : 1;
            if (a > b) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        }

        if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    }) as ClienteFolhaPonto[];

    return (
        <Content title='Folha de Ponto'>
            {isGetClientesFolhaPontoSuccess && (
                <div className='d-flex gap-2'>
                    <button
                        className='btn btn-primary'
                        onClick={() => setUrl(clientesFolhaPonto.previous ?? '')}
                        disabled={!clientesFolhaPonto.previous}
                    >
                        <ArrowBigLeftDash />
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={() => setUrl(clientesFolhaPonto.next ?? '')}
                        disabled={!clientesFolhaPonto.next}
                    >
                        <ArrowBigRightDash />
                    </button>
                    <BaseModalTrigger modalKey='add' variant='secondary'>
                        Adicionar Cliente
                    </BaseModalTrigger>
                </div>
            )}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader
                            columnKey='cliente.nome_razao_social'
                            sortable
                            sortDirection={sortBy === 'cliente.nome_razao_social' ? sortDirection : undefined}
                            onSort={() => {
                                handleSort('cliente.nome_razao_social');
                            }}
                        >
                            Nome
                        </TableHeader>
                        <TableHeader
                            columnKey='registrado'
                            sortable
                            sortDirection={sortBy === 'registrado' ? sortDirection : undefined}
                            onSort={() => handleSort('registrado')}
                        >
                            Registrado na Tangerino
                        </TableHeader>
                        <TableHeader
                            columnKey='colaborador'
                            sortable
                            sortDirection={sortBy === 'colaborador' ? sortDirection : undefined}
                            onSort={() => {
                                handleSort('colaborador');
                            }}
                        >
                            Colaborador
                        </TableHeader>
                        <TableHeader
                            columnKey='cliente.regiao'
                            sortable
                            sortDirection={sortBy === 'cliente.regiao' ? sortDirection : undefined}
                            onSort={() => {
                                handleSort('cliente.regiao');
                            }}
                        >
                            Região
                        </TableHeader>
                        <TableHeader>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData &&
                        sortedData.length > 0 &&
                        sortedData.map((result) => (
                            <TableRow key={result.id}>
                                <TableData>{result.cliente.nome_razao_social}</TableData>
                                <TableData>
                                    <div className='d-flex justify-content-center align-items-center w-100 h-100'>
                                        {result.registrado ? (
                                            <Check className='text-success' />
                                        ) : (
                                            <X className='text-danger' />
                                        )}
                                    </div>
                                </TableData>
                                <TableData>
                                    <div className='d-flex justify-content-center align-items-center w-100 h-100'>
                                        {result.colaborador ? (
                                            <Check className='text-success' />
                                        ) : (
                                            <X className='text-danger' />
                                        )}
                                    </div>
                                </TableData>
                                <TableData>{result.cliente.regiao}</TableData>
                                <TableData>
                                    <div className='d-flex gap-2'>
                                        <BaseModalTrigger
                                            modalKey='edit'
                                            variant='warning'
                                            onClick={() => {
                                                setSelectedRegistro(result);
                                                setValueUpdate('id', result.id.toString(), {
                                                    shouldValidate: true,
                                                });
                                                setValueUpdate('id_cliente', result.cliente.id.toString(), {
                                                    shouldValidate: true,
                                                });
                                                setValueUpdate('registrado', result.registrado, {
                                                    shouldValidate: true,
                                                });
                                                setValueUpdate('colaborador', result.colaborador, {
                                                    shouldValidate: true,
                                                });
                                            }}
                                        >
                                            <Pencil size={16} />
                                        </BaseModalTrigger>
                                        <BaseModalTrigger
                                            modalKey='remove'
                                            variant='danger'
                                            onClick={() => {
                                                setSelectedRegistro(result);
                                                setValueRemove('id', result.cliente.id.toString(), {
                                                    shouldValidate: true,
                                                });
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </BaseModalTrigger>
                                    </div>
                                </TableData>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            {sortedData && sortedData.length < 1 && <AlertMessage message='Nenhum registro encontrado' />}

            <BaseModalRoot modalKey='add'>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>Adicionar cliente no processo</BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>
                        <p>Por favor selecione os clientes a serem adicionados ao processo de ponto.</p>
                        <form className='d-flex flex-column gap-1 overflow-y-auto mb-4' style={{ maxHeight: '600px' }}>
                            {isGetClientesFinanceiroSuccess &&
                                clientesFinanceiro.length > 0 &&
                                clientesFinanceiro.map((cliente) => (
                                    <div key={cliente.id}>
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                id={`cliente_${cliente.id}`}
                                                value={cliente.id}
                                                {...registerAdd('id_clientes')}
                                            />
                                            <label className='form-check-label' htmlFor={`cliente_${cliente.id}`}>
                                                {cliente.nome_razao_social}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            {isGetClientesFinanceiroSuccess && clientesFinanceiro.length < 1 && (
                                <AlertMessage message='Nenhum registro encontrado' />
                            )}
                        </form>
                    </BaseModalBody>
                    <BaseModalFooter>
                        <BaseModalConfirmationButton onClick={handleSubmitAdd(onSubmitAdd)}>
                            Adicionar
                        </BaseModalConfirmationButton>
                    </BaseModalFooter>
                </BaseModalContent>
            </BaseModalRoot>

            <BaseModalRoot modalKey='edit'>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>Editar processo de ponto</BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>
                        <p>
                            Alterando os dados do processo de ponto para o cliente:{' '}
                            {selectedRegistro?.cliente.nome_razao_social}
                        </p>
                        <form className='w-100 user-select-none'>
                            <input type='text' {...registerUpdate('id')} className='d-none' />
                            <input type='text' {...registerUpdate('id_cliente')} className='d-none' />
                            <div className='w-100 d-flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='registrado'
                                    {...registerUpdate('registrado')}
                                    className={`form-check-input`}
                                />
                                <label htmlFor='registrado' className='form-label'>
                                    Registrado na Tangerino
                                </label>
                            </div>
                            <div className='w-100 d-flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='colaborador'
                                    {...registerUpdate('colaborador')}
                                    className={`form-check-input`}
                                />
                                <label htmlFor='colaborador' className='form-label'>
                                    Possui colaboradores
                                </label>
                            </div>
                        </form>
                    </BaseModalBody>
                    <BaseModalFooter>
                        <BaseModalConfirmationButton onClick={handleSubmitUpdate(onSubmitUpdate)}>
                            Remover
                        </BaseModalConfirmationButton>
                    </BaseModalFooter>
                </BaseModalContent>
            </BaseModalRoot>

            <BaseModalRoot modalKey='remove'>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>Excluir cliente do processo</BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>
                        <p>{`Tem certeza que deseja excluir o cliente ${selectedRegistro?.cliente.nome_razao_social}?`}</p>
                        <form className='d-none'>
                            <input type='text' {...registerRemove('id')} />
                        </form>
                    </BaseModalBody>
                    <BaseModalFooter>
                        <BaseModalConfirmationButton onClick={handleSubmitRemove(onSubmitRemove)}>
                            Remover
                        </BaseModalConfirmationButton>
                    </BaseModalFooter>
                </BaseModalContent>
            </BaseModalRoot>
        </Content>
    );
}
