import { formatCellphone, phoneFormatter } from '@/libs';
import { useProfileCard } from '../profile-card/profile-card-provider';
import { useGetAllGroups, useUpdateUser } from '@/api/http/user';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Pen } from 'lucide-react';
import {
    BaseModalBody,
    BaseModalConfirmationButton,
    BaseModalContent,
    BaseModalFooter,
    BaseModalHeader,
    BaseModalProvider,
    BaseModalRoot,
    BaseModalTitle,
    BaseModalTrigger,
} from '../baseModal';
import { useEffect } from 'react';

const UpdateUserModal: React.FC = () => {
    const { user } = useProfileCard();

    const { data: userGroups, isLoading: isUserGroupsLoading } = useGetAllGroups();

    const updateUserSchema = z.object({
        username: z.string().min(1, 'Este campo é obrigatório'),
        email: z.string().email('Formato de email inválido').min(1, 'Este campo é obrigatório'),
        first_name: z.string().min(1, 'Este campo é obrigatório'),
        last_name: z.string().min(1, 'Este campo é obrigatório'),
        phone: z
            .string()
            .trim()
            .regex(/^(\(?\d{2}\)?\s?)?(\d{5})-?(\d{4})$/, 'Formato de telefone inválido. Use o formato (XX) XXXXX-XXXX')
            .min(1, 'Este campo é obrigatório'),
        groups: z.array(z.string()).min(1, 'Selecione pelo menos um grupo'),
    });

    type UpdateUserType = z.infer<typeof updateUserSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<UpdateUserType>({
        resolver: zodResolver(updateUserSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
    });

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = phoneFormatter(event.target.value);
        setValue('phone', formattedPhone);
    };

    const {
        mutate: updateUser,
        isPending: isUpdateUserPending,
        error: updateUserError,
        isSuccess: isUpdateUserSuccess,
    } = useUpdateUser();

    const onSubmit = ({ email, first_name, last_name, groups, phone, username }: UpdateUserType) => {
        const cleanedPhone = phone.replace(/\D/g, '');
        const currentPhone = user?.telefone_celular?.replace(/\D/g, '');
        const phoneToSave = cleanedPhone !== currentPhone ? cleanedPhone : null;
        const updatedValues: Partial<UpdateUserType> = {};

        if (user?.email !== email) {
            updatedValues.email = email;
        }

        if (user?.first_name !== first_name) {
            updatedValues.first_name = first_name;
        }

        if (user?.last_name !== last_name) {
            updatedValues.last_name = last_name;
        }

        function arraysContainSameElements(arr1: string[], arr2: string[]) {
            if (arr1.length !== arr2.length) {
                return false; // Se o comprimento for diferente, os arrays são diferentes
            }

            const sortedArr1 = [...arr1].sort();
            const sortedArr2 = [...arr2].sort();

            return sortedArr1.every((val, index) => val === sortedArr2[index]); // Verifica se todos os elementos são iguais após a ordenação
        }
        if (
            !arraysContainSameElements(
                user!.groups,
                userGroups!.filter((group) => groups.includes(group.id.toString())).map((group) => group.name),
            )
        ) {
            updatedValues.groups = groups;
        }

        if (user?.username !== username) {
            updatedValues.username = username;
        }

        if (phoneToSave) {
            updatedValues.phone = phoneToSave;
        }

        updateUser({ userId: user!.id, data: updatedValues });
    };

    useEffect(() => {
        if (isUpdateUserPending) {
            toast.info('Atualizando usuário...', {
                autoClose: 3000,
            });
        }
    }, [isUpdateUserPending]);

    useEffect(() => {
        if (isUpdateUserSuccess) {
            toast.dismiss();
            toast.success('Usuário atualizado com sucesso!', {
                autoClose: 3000,
            });
        }
    }, [isUpdateUserSuccess]);

    useEffect(() => {
        if (updateUserError) {
            toast.dismiss();
            toast.error(`Erro ao atualizar usuário! ${updateUserError}`, {
                autoClose: 3000,
            });
        }
    }, [updateUserError]);

    return (
        <BaseModalProvider>
            <BaseModalTrigger variant='ghost' modalKey='atualizar-usuario'>
                <Pen size={18} />
            </BaseModalTrigger>
            <BaseModalRoot modalKey='atualizar-usuario'>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>{`Editar Usuário ${user?.username}`}</BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>
                        <form className='d-flex flex-column gap-2 w-100 h-100 px-1 overflow-auto'>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='username' className='form-label'>
                                    Nome de usuário:
                                </label>
                                <input
                                    type='text'
                                    id='username'
                                    className='form-control'
                                    {...register('username')}
                                    defaultValue={user?.username}
                                />
                                {errors.username && (
                                    <p className='text-danger'>{errors.username.message?.toString()}</p>
                                )}
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='email' className='form-label'>
                                    Email:
                                </label>
                                <input
                                    type='text'
                                    id='email'
                                    className='form-control'
                                    {...register('email')}
                                    defaultValue={user?.email}
                                />
                                {errors.email && <p className='text-danger'>{errors.email.message?.toString()}</p>}
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='firstName' className='form-label'>
                                    Nome:
                                </label>
                                <input
                                    type='text'
                                    id='firstName'
                                    className='form-control'
                                    {...register('first_name')}
                                    defaultValue={user?.first_name}
                                />
                                {errors.first_name && (
                                    <p className='text-danger'>{errors.first_name.message?.toString()}</p>
                                )}
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='lastName' className='form-label'>
                                    Sobrenome:
                                </label>
                                <input
                                    type='text'
                                    id='lastName'
                                    className='form-control'
                                    {...register('last_name')}
                                    defaultValue={user?.last_name}
                                />
                                {errors.last_name && (
                                    <p className='text-danger'>{errors.last_name.message?.toString()}</p>
                                )}
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='phone' className='form-label'>
                                    Celular
                                </label>
                                <input
                                    type='text'
                                    id='phone'
                                    className='form-control'
                                    {...register('phone')}
                                    onChange={handlePhoneChange}
                                    placeholder={formatCellphone('00000000000')}
                                    defaultValue={
                                        user?.telefone_celular ? formatCellphone(user?.telefone_celular) : undefined
                                    }
                                />
                                {errors.phone && <p className='text-danger'>{errors.phone.message?.toString()}</p>}
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <p className='form-label'>Cargos:</p>
                                {errors.groups && (
                                    <p className='text-danger mb-0'>{errors.groups.message?.toString()}</p>
                                )}
                                {isUserGroupsLoading && <p>Loading...</p>}
                                {userGroups &&
                                    !isUserGroupsLoading &&
                                    userGroups.map((group) => (
                                        <div key={group.id} className='w-100 d-flex flex-column mb-1'>
                                            <div className='d-flex w-100 h-100 align-items-center gap-2'>
                                                <input
                                                    type='checkbox'
                                                    id={`group-${group.name}`}
                                                    className='form-check'
                                                    value={group.id}
                                                    defaultChecked={user?.groups.includes(group.name)}
                                                    {...register('groups')}
                                                />
                                                <label htmlFor={`group-${group.name}`}>
                                                    {group.name.replace('_', ' ')}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </form>
                    </BaseModalBody>
                    <BaseModalFooter>
                        <BaseModalConfirmationButton onClick={handleSubmit(onSubmit)}>
                            Salvar
                        </BaseModalConfirmationButton>
                    </BaseModalFooter>
                </BaseModalContent>
            </BaseModalRoot>
        </BaseModalProvider>
    );
};

export { UpdateUserModal };
