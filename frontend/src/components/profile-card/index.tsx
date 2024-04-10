import styles from './profileCard.module.scss';

function ProfileCard({
    profilePicture,
    profileHeader,
    name,
    roles,
    email,
}: {
    profilePicture?: string;
    profileHeader?: string;
    name: string;
    roles: string[];
    email: string;
}) {

    return (
        <div className='d-flex flex-column'>
            <div className='position-relative rounded overflow-hidden'>
                <img
                    src={profileHeader ? profileHeader : 'https://dummyimage.com/1600x451/000/fff'}
                    alt='dummy cover photo'
                    className='img-fluid'
                />
            </div>
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
    );
}

export default ProfileCard;
