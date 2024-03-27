import { Outlet } from 'react-router-dom';
import styles from './main.module.scss';
import { useContext } from 'react';
import { SidebarContext } from '../aside';
import { motion, useMotionValue } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Main() {
  const { open } = useContext(SidebarContext);
  const width = useMotionValue(open ? 'calc(100% - 256px)' : 'calc(100% - 56px)');
  const marginLeft = useMotionValue(open ? '256px' : '56px');

  return (
    <>
    <motion.main
      className={`${styles.main}`}
      initial={{ width: 'calc(100% - 256px)', marginLeft: '256px' }}
      style={{ width, marginLeft }}
      animate={{ width: open ? 'calc(100% - 256px)' : 'calc(100% - 56px)', marginLeft: open ? '256px' : '56px' }}
      transition={{ type: 'spring', damping: 15, stiffness: 110 }}
    >
      <Outlet />
    </motion.main>
    <ToastContainer />
    </>  
    );
}

export default Main;
