import styles from './profileCard.module.scss';

function ProfileCard() {
  return (
    <div className='d-flex flex-column'>
      <div className='position-relative rounded overflow-hidden'>
        <img src='https://dummyimage.com/1600x451/000/fff' alt='dummy cover photo' className='img-fluid' />
      </div>
      <div className={`${styles.profileCardInfo}`}>
        <div className={`${styles.profileCardPicture}`}>
          <img
            src='https://github.com/brunoapolinario010.png'
            alt='profile picture'
            className='img-fluid rounded-circle'
          />
        </div>
        <div className={`${styles.profileCardDetails} text-muted`}>
          <div className={`${styles.profileCardName}`}>
            <span className={`${styles.profileName} text-primary m-0`}>Bruno Apolinário</span>
            Developer
          </div>
          <div className={`${styles.profileCardEmail}`}>
            <span className={`${styles.profileEmail} m-0`}>mail@email.com</span>
            Email
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
