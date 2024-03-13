import { UserRound, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './profilePicture.module.scss';

type ProfilePictureProps = {
  src: string;
  alt: string;
};

function ProfilePicture({ src, alt }: ProfilePictureProps) {
  return (
    <div className='dropdown'>
      <button
        className='d-flex align-items-center justify-content-center overflow-hidden bg-transparent border-0'
        data-bs-toggle='dropdown'
        aria-expanded='false'
        style={{ width: '50px', height: '50px' }}
      >
        <img src={src} alt={`${alt} profile picture`} className='img-fluid rounded-circle' />
      </button>
      <div className='dropdown-menu'>
        <Link className={`dropdown-item ${styles.dropdownItem}`} to={'/profile'}>
          <UserRound className='me-2' width={20} height={20} />
          Profile
        </Link>
        <Link className={`dropdown-item ${styles.dropdownItem}`} to='/login'>
          <LogOut className='me-2' width={20} height={20} />
          Logout
        </Link>
      </div>
    </div>
  );
}

export { ProfilePicture };
