import { useActivateUser, useGetAllGroups, useGetAllUsers } from '@/api/http';
import { Table, TableBody, TableData, TableHead, TableHeader, TableRow } from '@/components/table';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { Group } from '@/utils/types/group';
import { User } from '@/utils/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck, ShieldX } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

function ActivateUsersTable() {
    const { data, isSuccess, isLoading, isError } = useGetAllUsers();
    const { data: groups } = useGetAllGroups();
    const { mutate: activate, isSuccess: activateSuccess, isError: activateError, error } = useActivateUser();
    const { hasPermission } = useAuthenticatedUser();
    const [sortBy, setSortBy] = useState<keyof User>('id');
    const [sortDirection, setSortDirection] = useState('asc');
    const [showModal, setShowModal] = useState<number | null>(null);

    const schema = z.object({
        id: z.array(z.coerce.number(), { required_error: 'Selecione pelo menos um grupo' }),
    });
    type GroupType = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GroupType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        defaultValues: {
            id: undefined,
        },
        resolver: zodResolver(schema),
    });

    if (!data || isLoading) {
        return <div>Loading...</div>;
    }

    if (!data && isSuccess) {
        return <div>Não existem funcionários para ativar!</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

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

    const handleActivate = (userId: number, data: GroupType) => {
        setShowModal(null);
        activate({ userId, data });

        if (activateSuccess) {
            toast.success('Funcionário ativado com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }

        if (activateError) {
            toast.error(`Erro ao ativar funcionário ${error?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    };

    const findGroupsIds = (funcionario: User, groups: Group[]) => {
        const groupsIds = funcionario.groups.map((funcionarioGroup) => {
            const match = groups?.find((group) => group.name === funcionarioGroup);
            return match ? match.id : null;
        });

        return groupsIds;
    };

    return (
        <div>
            <h1>Activate Users Table</h1>
            <div className='px-3 pb-3 shadow rounded'>
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
                                sortDirection={sortBy === 'cpf' ? sortDirection : ''}
                                columnKey='cpf'
                                onSort={() => handleSort('cpf')}
                            >
                                CPF
                            </TableHeader>
                            <TableHeader
                                sortable
                                sortDirection={sortBy === 'telefone_celular' ? sortDirection : ''}
                                columnKey='telefone_celular'
                                onSort={() => handleSort('telefone_celular')}
                            >
                                Telefone
                            </TableHeader>
                            {hasPermission('Can change funcionarios') && <TableHeader>Actions</TableHeader>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map(
                            (funcionario) =>
                                !funcionario.is_active && (
                                    <TableRow key={funcionario.id}>
                                        <TableData>{funcionario.id}</TableData>
                                        <TableData>
                                            {`${funcionario.username} —
                                            ${
                                                funcionario.groups.length > 0
                                                    ? funcionario.groups.map((group, index) =>
                                                          index !== funcionario.groups.length - 1
                                                              ? `${group}, `
                                                              : `${group}`,
                                                      )
                                                    : 'Sem Cargo'
                                            }`}
                                        </TableData>
                                        <TableData>{funcionario.cpf}</TableData>
                                        <TableData>{funcionario.telefone_celular}</TableData>
                                        {hasPermission('Can change funcionarios') && (
                                            <TableData>
                                                <div className='d-flex gap-2'>
                                                    {hasPermission('Can change funcionarios') && (
                                                        <>
                                                            <button
                                                                className='btn btn-success btn-sm p-1 d-flex justify-content-center align-items-center'
                                                                onClick={() =>
                                                                    funcionario.groups.length > 0
                                                                        ? handleActivate(funcionario.id, {
                                                                              id: findGroupsIds(funcionario, groups!),
                                                                          })
                                                                        : setShowModal(funcionario.id)
                                                                }
                                                            >
                                                                <ShieldCheck width={22} height={16} />
                                                            </button>
                                                            <div
                                                                className={`modal ${showModal === funcionario.id ? 'd-block' : 'd-none'}`}
                                                                id={`modal_${funcionario.id}`}
                                                            >
                                                                <div className='modal-dialog modal-dialog-centered'>
                                                                    <div className='modal-content'>
                                                                        <div className='modal-header'>
                                                                            <h5 className='modal-title'>
                                                                                Ativação — {funcionario.username}
                                                                            </h5>
                                                                            <button
                                                                                type='button'
                                                                                className='btn-close'
                                                                                data-bs-dismiss='modal'
                                                                                aria-label='Close'
                                                                                onClick={() => setShowModal(null)}
                                                                            />
                                                                        </div>
                                                                        <div className='modal-body'>
                                                                            <form
                                                                                className='d-flex flex-column gap-2'
                                                                                onSubmit={handleSubmit((data) =>
                                                                                    handleActivate(
                                                                                        funcionario.id,
                                                                                        data,
                                                                                    ),
                                                                                )}
                                                                            >
                                                                                <p>
                                                                                    Para ativar um funcionário selecione
                                                                                    ao menos um cargo
                                                                                </p>
                                                                                <div>
                                                                                    <h5>Cargo</h5>
                                                                                    {groups &&
                                                                                        groups.map(
                                                                                            (group) =>
                                                                                                group.name
                                                                                                    .trim()
                                                                                                    .toLocaleLowerCase() !==
                                                                                                    'admin' &&
                                                                                                group.name
                                                                                                    .trim()
                                                                                                    .toLocaleLowerCase() !==
                                                                                                    'ti' && (
                                                                                                    <div
                                                                                                        key={group.id}
                                                                                                        className='form-check'
                                                                                                    >
                                                                                                        <input
                                                                                                            className='form-check-input'
                                                                                                            type='checkbox'
                                                                                                            {...register(
                                                                                                                'id',
                                                                                                            )}
                                                                                                            value={
                                                                                                                group.id
                                                                                                            }
                                                                                                            id={`group_${group.id}`}
                                                                                                        />
                                                                                                        <label
                                                                                                            className='form-check-label'
                                                                                                            htmlFor={`group_${group.id}`}
                                                                                                        >
                                                                                                            {group.name}
                                                                                                        </label>
                                                                                                    </div>
                                                                                                ),
                                                                                        )}
                                                                                    {errors.id && (
                                                                                        <p className='text-danger'>
                                                                                            {errors.id.message}
                                                                                        </p>
                                                                                    )}
                                                                                </div>
                                                                                <div>
                                                                                    <button
                                                                                        className='btn btn-success'
                                                                                        type='submit'
                                                                                    >
                                                                                        Ativar
                                                                                    </button>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                        <div className='modal-footer'>
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
                                                            <button className='btn btn-danger btn-sm p-1 d-flex justify-content-center align-items-center'>
                                                                <ShieldX width={22} height={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </TableData>
                                        )}
                                    </TableRow>
                                ),
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default ActivateUsersTable;
