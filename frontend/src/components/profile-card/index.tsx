import { Pen } from 'lucide-react';
import styles from './profileCard.module.scss';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';

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
    return (
        <div className='d-flex flex-column'>
            <div className='position-relative rounded overflow-hidden'>
                <img
                    src={profileHeader ? profileHeader : 'https://dummyimage.com/1600x451/000/fff'}
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
                                    {roles.length > 0
                                        ? roles.map((role, index) =>
                                              index !== roles.length - 1
                                                  ? `${role.replace('_', ' ')}, `
                                                  : `${role.replace('_', ' ')}`,
                                          )
                                        : 'Sem Cargo'}
                                </div>
                            </div>
                            <div className={`${styles.profileCardEmail}`}>
                                <span className={`${styles.profileEmail} m-0`}>{email}</span>
                                Email
                            </div>
                        </div>
                    </div>
                </div>
                {(hasRole('admin') || hasRole('TI') || authenticatedUser?.id === id) && (
                    <div className={`${styles.profileCardActions} d-flex gap-2`}>
                        <div className='d-flex align-items-center'>
                            <button className='btn d-flex align-items-center gap-2'>
                                <Pen size={18} />
                                Editar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileCard;
