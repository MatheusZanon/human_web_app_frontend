import { formatCellphone } from '@/libs';
import { useProfileCard } from '../profile-card/profile-card-provider';
import styles from './update-user-modal.module.scss';

const UpdateUserModal: React.FC = () => {
    const { user, editMode, handleEditMode } = useProfileCard();

    return (
        editMode && (
            <div className={`${styles.modalWrapper}`}>
                <div className={`${styles.modalContent} p-4 gap-2`}>
                    <form className='d-flex flex-column gap-2 w-100 h-100 px-1 overflow-auto'>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='username' className='form-label'>
                                Nome de usuário:
                            </label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                className='form-control'
                                defaultValue={user?.username}
                            />
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='email' className='form-label'>
                                Email:
                            </label>
                            <input
                                type='text'
                                id='email'
                                name='email'
                                className='form-control'
                                defaultValue={user?.email}
                            />
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='firstName' className='form-label'>
                                Nome:
                            </label>
                            <input
                                type='text'
                                id='firstName'
                                name='firstName'
                                className='form-control'
                                defaultValue={user?.first_name}
                            />
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='lastName' className='form-label'>
                                Sobrenome:
                            </label>
                            <input
                                type='text'
                                id='lastName'
                                name='lastName'
                                className='form-control'
                                defaultValue={user?.last_name}
                            />
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='phone' className='form-label'>
                                Celular
                            </label>
                            <input
                                type='text'
                                id='phone'
                                name='phone'
                                className='form-control'
                                defaultValue={formatCellphone(user?.telefone_celular || '00000000000')}
                            />
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <p className='form-label'>
                                Cargos:
                            </p>
                            {user?.groups &&
                                user.groups.map((group) => (
                                    <div key={group} className='w-100 d-flex align-items-center gap-2 mb-1'>
                                        <input
                                            type='checkbox'
                                            id={`group-${group}`}
                                            name={`group-${group}`}
                                            className='form-check'
                                            defaultChecked={user.groups.includes(group)}
                                        />
                                        <label htmlFor={`group-${group}`}>
                                            {group.replace('_', ' ')}
                                        </label>
                                    </div>
                                ))}
                        </div>
                        <button className='btn btn-primary' onClick={() => handleEditMode()}>
                            Salvar
                        </button>
                    </form>
                </div>
            </div>
        )
    );
};

export { UpdateUserModal };
