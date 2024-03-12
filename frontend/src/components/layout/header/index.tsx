import ModeToggle from '@/components/theme/mode-toggle';
import { ProfilePicture } from '@/components/profile-picture';
import styles from './header.module.scss';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { SidebarContext } from '../aside';

function NavHeader() {
  const { open } = useContext(SidebarContext);

  return (
    <motion.header
      className={`d-flex justify-content-end align-items-center ${styles.header}`}
      initial={{ width: 'calc(100% - 256px)', left: '256px' }}
      animate={{ width: open ? 'calc(100% - 256px)' : 'calc(100% - 56px)', left: open ? '256px' : '56px' }}
      transition={{ type: 'spring', damping: 15, stiffness: 110 }}
    >
      <ModeToggle className={`${styles.modeToggle}`} />
      <ProfilePicture src='https://github.com/brunoapolinario010.png' alt='Bruno Apolinário' />
    </motion.header>
  );
}

export default NavHeader;
