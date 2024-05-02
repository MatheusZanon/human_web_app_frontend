import { Pen } from 'lucide-react';
import styles from './profileCard.module.scss';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { useProfileCard } from './profile-card-provider';

function ProfileCard({
    id,
    profilePicture,
    profileHeader,
    name,
    roles,
    email,
}: {
    id: number | undefined;
    profilePicture?: string;
    profileHeader?: string;
    name: string;
    roles: string[];
    email: string;
}) {
    const { authenticatedUser, hasRole } = useAuthenticatedUser();
    const { user, handleEditMode } = useProfileCard();
    return (
        <div className='d-flex flex-column'>
            <div className='position-relative rounded overflow-hidden'>
                <img
                    src={user?.profile_picture || 'https://dummyimage.com/1600x451/000/fff'}
                    alt='dummy cover photo'
                    className='img-fluid'
                />
            </div>
            <div className='d-flex justify-content-between'>
                <div>
                    <div className={`${styles.profileCardInfo}`}>
                        <div className={`${styles.profileCardPicture}`}>
                            <img
                                src={profilePicture ? profilePicture : 'https://dummyimage.com/160x160/000/fff'}
                                alt='profile picture'
                                className='img-fluid rounded-circle'
                            />
                        </div>
                        <div className={`${styles.profileCardDetails} text-muted`}>
                            <div className={`${styles.profileCardName}`}>
                                <span className={`${styles.profileName} text-primary m-0`}>{name}</span>
                                <div>
                                    {email}
                                </div>
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

export default ProfileCard;
