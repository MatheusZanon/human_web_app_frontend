import { api } from '@/utils/axios';
import { UserRound, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './profilePicture.module.scss';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';

function ProfilePicture() {
    const { authenticatedUser } = useAuthenticatedUser();

    const logout = () => {
        return () => {
            api.post('session/logout/');
            sessionStorage.setItem('redirected', 'false');
        };
    };
    if (!authenticatedUser) return null;
    const initials = (authenticatedUser.first_name.charAt(0) + authenticatedUser.last_name.charAt(0)).toUpperCase();

    return (
        <div
            className='dropdown d-flex align-items-center justify-content-center'
            style={{ width: '50px', height: '50px' }}
        >
            <button
                className='d-flex align-items-center justify-content-center overflow-hidden bg-transparent w-100 h-100 border-0 p-0'
                data-bs-toggle='dropdown'
                aria-expanded='false'
            >
                {authenticatedUser?.profile_picture ? (
                    <img
                        src={authenticatedUser.profile_picture}
                        alt={`${authenticatedUser.username} profile picture`}
                        className='w-100 h-100 img-fluid object-fit-cover rounded-circle'
                    />
                ) : (
                    <div
                        className={`d-flex align-items-center justify-content-center ${styles.profileInitials} w-100 h-100 rounded-circle`}
                    >
                        <span className='visually-hidden'>{authenticatedUser.username} profile picture</span>
                        {initials}
                    </div>
                )}
            </button>
            <div className='dropdown-menu'>
                <Link className={`dropdown-item ${styles.dropdownItem}`} to={'/main/profile'}>
                    <UserRound className='me-2' width={20} height={20} />
                    Perfil
                </Link>
                <Link className={`dropdown-item ${styles.dropdownItem}`} to='/' onClick={logout()}>
                    <LogOut className='me-2' width={20} height={20} />
                    Logout
                </Link>
            </div>
        </div>
    );
}

export { ProfilePicture };
