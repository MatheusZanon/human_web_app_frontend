import { useState } from 'react';
import { Table, TableHead, TableRow, TableHeader, TableBody, TableData } from '@/components/table';
import { Pen, Search, Trash2 } from 'lucide-react';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { User } from '@/utils/types/user';
import { useNavigate } from 'react-router-dom';
import { useDeactivateUser, useUpdateSituacao } from '@/api/http/user';
import { toast } from 'react-toastify';
import { formatCellphone } from '@/libs';
import { Badge } from '../badge';
import {
    BaseModalBody,
    BaseModalCloseButton,
    BaseModalContent,
    BaseModalFooter,
    BaseModalHeader,
    BaseModalProvider,
    BaseModalRoot,
    BaseModalTitle,
    BaseModalTrigger,
} from '../baseModal';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function TabelaFuncionarios({ data }: { data: User[] }) {
    const { hasRole, authenticatedUser } = useAuthenticatedUser();
    const [sortBy, setSortBy] = useState<keyof User>('id');
    const [sortDirection, setSortDirection] = useState('asc');
    const [showModal, setShowModal] = useState<number | null>(null);
    const { mutate: deactivateUser, isSuccess, isError, error } = useDeactivateUser();
    const {
        mutate: updateSituacao,
        isSuccess: isSuccessSituacao,
        isError: isErrorSituacao,
        error: errorSituacao,
    } = useUpdateSituacao();
    const navigate = useNavigate();

    const handleDeactivate = (id: number) => {
        deactivateUser(id);
        setShowModal(null);

        if (isSuccess) {
            toast.success('Funcionário desativado com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }

        if (isError) {
            toast.error(`Erro ao desativar funcionário ${error?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    };

    const handleSort = (columnKey: string) => {
        if (sortBy === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnKey as keyof User);
            setSortDirection('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const handleEdit = (id: number) => {
        navigate(`${id}`);
    };

    const changeSituacaoSchema = z.object({
        situacao: z.union([z.literal('ATIVO'), z.literal('FERIAS'), z.literal('SUSPENSO')]),
    });

    type ChangeSituacaoType = z.infer<typeof changeSituacaoSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ChangeSituacaoType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(changeSituacaoSchema),
    });

    const onSubmit = (id: number, data: ChangeSituacaoType) => {
        updateSituacao({ userId: id, data: data });

        if (isSuccessSituacao) {
            toast.success('Situação alterada com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }

        if (isErrorSituacao) {
            toast.error(`Erro ao alterar situação do funcionário ${errorSituacao?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader columnKey='id' onSort={() => handleSort('id')}>
                        ID
                    </TableHeader>
                    <TableHeader
                        sortable
                        sortDirection={sortBy === 'username' ? sortDirection : ''}
                        columnKey='username'
                        onSort={() => handleSort('username')}
                    >
                        Nome
                    </TableHeader>
                    <TableHeader
                        sortable
                        sortDirection={sortBy === 'groups' ? sortDirection : ''}
                        columnKey='groups'
                        onSort={() => handleSort('groups')}
                    >
                        Cargo
                    </TableHeader>
                    <TableHeader
                        sortable
                        sortDirection={sortBy === 'telefone_celular' ? sortDirection : ''}
                        columnKey='telefone_celular'
                        onSort={() => handleSort('telefone_celular')}
                    >
                        Telefone
                    </TableHeader>
                    <TableHeader
                        sortable
                        sortDirection={sortBy === 'situacao' ? sortDirection : ''}
                        columnKey='situacao'
                        onSort={() => handleSort('situacao')}
                    >
                        Situação
                    </TableHeader>
                    {(hasRole('RH_GERENCIA') || hasRole('RH_OPERACAO') || hasRole('ADMIN') || hasRole('TI')) && (
                        <TableHeader>Actions</TableHeader>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedData.map(
                    (funcionario) =>
                        funcionario.is_active &&
                        !funcionario.groups.map((group) => group.toLocaleLowerCase()).includes('admin') && (
                            <TableRow key={funcionario.id}>
                                <TableData>{funcionario.id}</TableData>
                                <TableData>{`${funcionario.first_name} ${funcionario.last_name}`}</TableData>
                                <TableData>
                                    {funcionario.groups.length > 0
                                        ? funcionario.groups.map((group, index) =>
                                              index !== funcionario.groups.length - 1
                                                  ? `${group.replace('_', ' ')}, `
                                                  : `${group.replace('_', ' ')}`,
                                          )
                                        : 'Sem Cargo'}
                                </TableData>
                                <TableData>
                                    <span className={`${funcionario.telefone_celular ? '' : 'text-muted'}`}>
                                        {funcionario.telefone_celular
                                            ? formatCellphone(funcionario.telefone_celular)
                                            : formatCellphone('00000000000')}
                                    </span>
                                </TableData>
                                <TableData>
                                    {funcionario.situacao ? (
                                        <Badge
                                            variant={
                                                funcionario.situacao === 'ATIVO'
                                                    ? 'success'
                                                    : funcionario.situacao === 'INATIVO'
                                                      ? 'danger'
                                                      : 'warning'
                                            }
                                        >
                                            <span className='d-flex justify-content-center align-items-center flex-grow-1'>
                                                {funcionario.situacao}
                                            </span>
                                            <BaseModalProvider>
                                                <BaseModalTrigger size='sm' modalKey='alterar-situacao'>
                                                    <Pen size={16} />
                                                </BaseModalTrigger>
                                                <BaseModalRoot
                                                    onOpen={() =>
                                                        setValue(
                                                            'situacao',
                                                            funcionario.situacao as ChangeSituacaoType['situacao'],
                                                        )
                                                    }
                                                    modalKey='alterar-situacao'
                                                >
                                                    <BaseModalContent>
                                                        <BaseModalHeader>
                                                            <BaseModalTitle>
                                                                {`Alterar situação para ${funcionario.first_name} ${funcionario.last_name}`}
                                                            </BaseModalTitle>
                                                        </BaseModalHeader>
                                                        <BaseModalBody>
                                                            <form>
                                                                <select
                                                                    id='situacao'
                                                                    className='form-select'
                                                                    {...register('situacao')}
                                                                >
                                                                    <option value='ATIVO'>ATIVO</option>
                                                                    <option value='SUSPENSO'>SUSPENSO</option>
                                                                    <option value='FERIAS'>FERIAS</option>
                                                                </select>
                                                                {errors.situacao && (
                                                                    <p className='text-danger mt-2 mb-0 text-wrap'>
                                                                        {errors.situacao.message}
                                                                    </p>
                                                                )}
                                                            </form>
                                                        </BaseModalBody>
                                                        <BaseModalFooter>
                                                            <button
                                                                className='btn btn-primary'
                                                                onClick={handleSubmit((data) =>
                                                                    onSubmit(funcionario.id, data),
                                                                )}
                                                            >
                                                                Salvar
                                                            </button>
                                                        </BaseModalFooter>
                                                    </BaseModalContent>
                                                </BaseModalRoot>
                                            </BaseModalProvider>
                                        </Badge>
                                    ) : (
                                        '-'
                                    )}
                                </TableData>
                                {(hasRole('RH_GERENCIA') ||
                                    hasRole('RH_OPERACAO') ||
                                    hasRole('ADMIN') ||
                                    hasRole('TI')) && (
                                    <TableData>
                                        <div className='d-flex gap-2'>
                                            <>
                                                <button
                                                    className='btn btn-warning btn-sm p-1 d-flex justify-content-center align-items-center'
                                                    onClick={() => handleEdit(funcionario.id)}
                                                >
                                                    <Search width={16} height={16} />
                                                </button>
                                                {funcionario.id !== authenticatedUser?.id &&
                                                    (hasRole('ADMIN') || hasRole('RH_GERENCIA') || hasRole('TI')) && (
                                                        <BaseModalProvider>
                                                            <BaseModalTrigger
                                                                variant='danger'
                                                                size='sm'
                                                                modalKey='desativar-funcionario'
                                                            >
                                                                <Trash2 size={16} />
                                                            </BaseModalTrigger>
                                                            <BaseModalRoot modalKey='desativar-funcionario'>
                                                                <BaseModalContent>
                                                                    <BaseModalHeader>
                                                                        <BaseModalTitle>
                                                                            Desativar Funcionário
                                                                        </BaseModalTitle>
                                                                    </BaseModalHeader>
                                                                    <BaseModalBody>
                                                                        <p>
                                                                            Tem certeza que deseja desativar o
                                                                            funcionário{' '}
                                                                            {`${funcionario.first_name} ${funcionario.last_name}`}
                                                                            ?
                                                                        </p>
                                                                    </BaseModalBody>
                                                                    <BaseModalFooter>
                                                                        <button
                                                                            className='btn btn-danger'
                                                                            onClick={() =>
                                                                                handleDeactivate(funcionario.id)
                                                                            }
                                                                        >
                                                                            Desativar
                                                                        </button>
                                                                        <BaseModalCloseButton variant='ghost'>
                                                                            Cancelar
                                                                        </BaseModalCloseButton>
                                                                    </BaseModalFooter>
                                                                </BaseModalContent>
                                                            </BaseModalRoot>
                                                        </BaseModalProvider>
                                                    )}
                                                <div
                                                    className={`modal ${showModal === funcionario.id ? 'd-block' : 'd-none'}`}
                                                    id='modalDeactivate'
                                                >
                                                    <div className='modal-dialog modal-dialog-centered'>
                                                        <div className='modal-content'>
                                                            <div className='modal-header'>
                                                                <h5 className='modal-title'>Desativar Funcionário</h5>
                                                                <button
                                                                    type='button'
                                                                    className='btn-close'
                                                                    data-bs-dismiss='modal'
                                                                    aria-label='Close'
                                                                    onClick={() => setShowModal(null)}
                                                                ></button>
                                                            </div>
                                                            <div className='modal-body'>
                                                                <p>
                                                                    Tem certeza que deseja desativar o funcionário{' '}
                                                                    {`${funcionario.first_name} ${funcionario.last_name}`}
                                                                    ?
                                                                </p>
                                                            </div>
                                                            <div className='modal-footer'>
                                                                <button
                                                                    className='btn btn-danger'
                                                                    type='submit'
                                                                    onClick={() => handleDeactivate(funcionario.id)}
                                                                >
                                                                    Desativar
                                                                </button>
                                                                <button
                                                                    type='button'
                                                                    className='btn'
                                                                    data-bs-dismiss='modal'
                                                                    onClick={() => setShowModal(null)}
                                                                >
                                                                    Fechar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        </div>
                                    </TableData>
                                )}
                            </TableRow>
                        ),
                )}
            </TableBody>
        </Table>
    );
}

export { TabelaFuncionarios };
