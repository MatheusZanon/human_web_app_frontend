import { Pen } from 'lucide-react';
import styles from './userProfileCard.module.scss';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { useUserProfileCard } from './profile-card-provider';

function UserProfileCard() {
    const { hasRole } = useAuthenticatedUser();
    const { user, handleEditMode } = useUserProfileCard();
    return (
        <div className='d-flex flex-column'>
            <div className='position-relative rounded overflow-hidden'>
                <img
                    src={user?.profile_header || 'https://dummyimage.com/1600x451/000/fff'}
                    alt={`${user?.username} profile header`}
                    className='img-fluid'
                />
            </div>
            <div className='d-flex justify-content-between'>
                <div>
                    <div className={`${styles.profileCardInfo}`}>
                        <div className={`${styles.profileCardPicture}`}>
                            <img
                                src={
                                    user?.profile_picture
                                        ? user.profile_picture
                                        : 'https://dummyimage.com/160x160/000/fff'
                                }
                                alt={`${user?.username} profile picture`}
                                className='img-fluid rounded-circle'
                            />
                        </div>
                        <div className={`${styles.profileCardDetails} text-muted`}>
                            <div className={`${styles.profileCardName}`}>
                                <span
                                    className={`${styles.profileName} text-primary m-0`}
                                >{`${user?.first_name} ${user?.last_name}`}</span>
                                <div>{user?.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {(hasRole('admin') || hasRole('TI')) && (
                    <div className={`${styles.profileCardActions} d-flex gap-2`}>
                        <div className='d-flex align-items-center'>
                            <button
                                className='btn d-flex align-items-center gap-2'
                                type='button'
                                onClick={() => handleEditMode()}
                            >
                                <Pen size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfileCard;
