import { useActivateUser, useGetAllGroups, useGetInactiveUsers } from '@/api/http/user';
import { Table, TableBody, TableData, TableHead, TableHeader, TableRow } from '@/components/table';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { Group } from '@/utils/types/user/group';
import { User } from '@/utils/types/user/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import LoadingScreen from '@/components/loading-screen';
import { Content } from '@/components/layout/content';
import { formatCellphone } from '@/libs';
import { Badge } from '@/components/badge';
import AlertMessage from '@/components/alert-message';
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

function ActivateUsersTable() {
    const { data, isSuccess, isLoading, isError } = useGetInactiveUsers();
    const { data: groups } = useGetAllGroups();
    const { mutate: activate, isSuccess: activateSuccess, isError: activateError, error } = useActivateUser();
    const { hasRole } = useAuthenticatedUser();
    const [sortBy, setSortBy] = useState<keyof User>('id');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        if (activateSuccess) {
            toast.success('Funcionário ativado com sucesso!', {
                autoClose: 3000,
            });
        }
    }, [activateSuccess]);

    useEffect(() => {
        if (activateError) {
            toast.error(`Erro ao ativar funcionário! ${error?.response?.data}`, {
                autoClose: 3000,
            });
        }
    }, [activateError, error]);

    const schema = z.object({
        id: z.array(z.coerce.number(), { required_error: 'Selecione pelo menos um grupo' }),
    });
    type GroupType = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
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
        return (
            <div>
                <LoadingScreen />
            </div>
        );
    }

    if (data.length === 0 && isSuccess) {
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
                </Table>
                <AlertMessage message='Não há funcionários inativos!' />
            </Content>
        );
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
        activate({ userId, data });
    };

    const findGroupsIds = (funcionario: User, groups: Group[]) => {
        const groupsIds = funcionario.groups.map((funcionarioGroup) => {
            const match = groups?.find((group) => group.name === funcionarioGroup);
            return match && match.id;
        });

        return groupsIds as number[];
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
                        <TableHeader
                            sortable
                            sortDirection={sortBy === 'situacao' ? sortDirection : ''}
                            columnKey='situacao'
                            onSort={() => handleSort('situacao')}
                        >
                            Situação
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
                                    <TableData>{`${funcionario.first_name} ${funcionario.last_name}`}</TableData>
                                    <TableData>
                                        {funcionario.groups.length > 0
                                            ? funcionario.groups.map((group, index) =>
                                                  index !== funcionario.groups.length - 1 ? `${group}, ` : `${group}`,
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
                                                {funcionario.situacao}
                                            </Badge>
                                        ) : (
                                            '-'
                                        )}
                                    </TableData>
                                    {(hasRole('RH_GERENCIA') || hasRole('ADMIN') || hasRole('TI')) && (
                                        <TableData>
                                            <div className='d-flex gap-2 justify-content-center'>
                                                {funcionario.groups.length > 0 && (
                                                    <BaseModalProvider>
                                                        <BaseModalTrigger
                                                            variant='success'
                                                            modalKey='reativar-funcionario'
                                                        >
                                                            <ShieldCheck width={22} height={16} />
                                                        </BaseModalTrigger>
                                                        <BaseModalRoot modalKey='reativar-funcionario'>
                                                            <BaseModalContent>
                                                                <BaseModalHeader>
                                                                    <BaseModalTitle>Ativar Funcionário</BaseModalTitle>
                                                                </BaseModalHeader>
                                                                <BaseModalBody>
                                                                    <p>{`Tem certeza que deseja ativar o funcionário ${funcionario.first_name} ${funcionario.last_name}?`}</p>
                                                                </BaseModalBody>
                                                                <BaseModalFooter>
                                                                    <BaseModalConfirmationButton
                                                                        variant='success'
                                                                        onClick={() =>
                                                                            handleActivate(funcionario.id, {
                                                                                id: findGroupsIds(funcionario, groups!),
                                                                            })
                                                                        }
                                                                    >
                                                                        Ativar
                                                                    </BaseModalConfirmationButton>
                                                                    <BaseModalCloseButton>
                                                                        Cancelar
                                                                    </BaseModalCloseButton>
                                                                </BaseModalFooter>
                                                            </BaseModalContent>
                                                        </BaseModalRoot>
                                                    </BaseModalProvider>
                                                )}
                                                {funcionario.groups.length <= 0 && (
                                                    <BaseModalProvider>
                                                        <BaseModalTrigger
                                                            variant='success'
                                                            modalKey='ativar-funcionario'
                                                        >
                                                            <ShieldCheck width={22} height={16} />
                                                        </BaseModalTrigger>
                                                        <BaseModalRoot modalKey='ativar-funcionario'>
                                                            <BaseModalContent>
                                                                <BaseModalHeader>
                                                                    <BaseModalTitle>Ativar Funcionário</BaseModalTitle>
                                                                </BaseModalHeader>
                                                                <BaseModalBody>
                                                                    <form className='d-flex flex-column gap-2'>
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
                                                                                                    {...register('id')}
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
                                                                </BaseModalBody>
                                                                <BaseModalFooter>
                                                                    <BaseModalConfirmationButton
                                                                        variant='success'
                                                                        onClick={handleSubmit((data) => {
                                                                            handleActivate(funcionario.id, data);
                                                                            setValue('id', []);
                                                                        })}
                                                                    >
                                                                        Ativar
                                                                    </BaseModalConfirmationButton>
                                                                    <BaseModalCloseButton>
                                                                        Cancelar
                                                                    </BaseModalCloseButton>
                                                                </BaseModalFooter>
                                                            </BaseModalContent>
                                                        </BaseModalRoot>
                                                    </BaseModalProvider>
                                                )}
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
