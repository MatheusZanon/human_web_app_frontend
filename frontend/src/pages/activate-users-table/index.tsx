import { useActivateUser, useGetAllGroups, useGetAllUsers } from '@/api/http';
import { Table, TableBody, TableData, TableHead, TableHeader, TableRow } from '@/components/table';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { Group } from '@/utils/types/group';
import { User } from '@/utils/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import LoadingScreen from '@/components/loading-screen';
import { Content } from '@/components/layout/content';

function ActivateUsersTable() {
    const { data, isSuccess, isLoading, isError } = useGetAllUsers();
    const { data: groups } = useGetAllGroups();
    const { mutate: activate, isSuccess: activateSuccess, isError: activateError, error } = useActivateUser();
    const { hasRole } = useAuthenticatedUser();
    const [sortBy, setSortBy] = useState<keyof User>('id');
    const [sortDirection, setSortDirection] = useState('asc');
    const [showModal, setShowModal] = useState<number | null>(null);
    const [showActivateModal, setShowActivateModal] = useState<number | null>(null);

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
        return <div><LoadingScreen /></div>;
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
        <Content title='Ativação de Funcionários'>
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
                        {(hasRole('RH_GERENCIA') || hasRole('ADMIN') || hasRole('TI')) && (
                            <TableHeader>Actions</TableHeader>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map(
                        (funcionario) =>
                            !funcionario.is_active && (
                                <TableRow key={funcionario.id}>
                                    <TableData>{funcionario.id}</TableData>
                                    <TableData>
                                    {`${funcionario.first_name} ${funcionario.last_name}`}
                                    </TableData>
                                    <TableData>
                                        {
                                            funcionario.groups.length > 0
                                                ? funcionario.groups.map((group, index) =>
                                                        index !== funcionario.groups.length - 1
                                                            ? `${group}, `
                                                            : `${group}`
                                                    )
                                                : 'Sem Cargo'
                                        }
                                    </TableData>
                                    <TableData>{funcionario.telefone_celular}</TableData>
                                    {(hasRole('RH_GERENCIA') || hasRole('ADMIN') || hasRole('TI')) && (
                                        <TableData>
                                            <div className='d-flex gap-2 justify-content-center'>
                                                <>
                                                    <button
                                                        className='btn btn-success btn-sm p-1 d-flex justify-content-center align-items-center'
                                                        onClick={
                                                            funcionario.groups.length > 0
                                                                ? () => setShowActivateModal(funcionario.id)
                                                                : () => setShowModal(funcionario.id)
                                                        }
                                                    >
                                                        <ShieldCheck width={22} height={16} />
                                                    </button>
                                                    <div
                                                        className={`modal ${showActivateModal === funcionario.id ? 'd-block' : 'd-none'}`}
                                                        id='modalActivate'
                                                    >
                                                        <div className='modal-dialog modal-dialog-centered'>
                                                            <div className='modal-content'>
                                                                <div className='modal-header'>
                                                                    <h5 className='modal-title'>
                                                                        Ativar Funcionário
                                                                    </h5>
                                                                    <button
                                                                        type='button'
                                                                        className='btn-close'
                                                                        data-bs-dismiss='modal'
                                                                        aria-label='Close'
                                                                        onClick={() => setShowActivateModal(null)}
                                                                    ></button>
                                                                </div>
                                                                <div className='modal-body'>
                                                                    <p>
                                                                        Tem certeza que deseja ativar o funcionário{' '}
                                                                        {`${funcionario.first_name} ${funcionario.last_name}`}
                                                                        ?
                                                                    </p>
                                                                </div>
                                                                <div className='modal-footer'>
                                                                    <button
                                                                        className='btn btn-success'
                                                                        type='submit'
                                                                        onClick={() =>
                                                                            funcionario.groups.length > 0
                                                                                ? handleActivate(funcionario.id, {
                                                                                        id: findGroupsIds(
                                                                                            funcionario,
                                                                                            groups!,
                                                                                        ),
                                                                                    })
                                                                                : setShowModal(funcionario.id)
                                                                        }
                                                                    >
                                                                        Ativar
                                                                    </button>
                                                                    <button
                                                                        type='button'
                                                                        className='btn'
                                                                        data-bs-dismiss='modal'
                                                                        onClick={() => setShowActivateModal(null)}
                                                                    >
                                                                        Fechar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                                    >
                                                                        <p>
                                                                            Para ativar um funcionário selecione ao
                                                                            menos um cargo
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
                                                                                                    value={group.id}
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
                                                                    </form>
                                                                </div>
                                                                <div className='modal-footer'>
                                                                    <button
                                                                        className='btn btn-success'
                                                                        type='button'
                                                                        onClick={handleSubmit((data) => handleActivate(funcionario.id, data))}
                                                                    >
                                                                        Ativar
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
        </Content>
    );
}

export default ActivateUsersTable;
