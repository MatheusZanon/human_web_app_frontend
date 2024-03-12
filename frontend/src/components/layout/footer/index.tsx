import { useContext } from 'react';
import { SidebarContext } from '../aside';
import { motion, useMotionValue } from 'framer-motion';

function Footer() {
  const { open } = useContext(SidebarContext);
  const width = useMotionValue(open ? 'calc(100% - 256px)' : 'calc(100% - 56px)');
  const marginLeft = useMotionValue(open ? '256px' : '56px');

  return (
    <motion.footer
      className='p-3 text-muted text-center'
      style={{ width, marginLeft }}
      animate={{ width: open ? 'calc(100% - 256px)' : 'calc(100% - 56px)', marginLeft: open ? '256px' : '56px' }}
      transition={{ type: 'spring', damping: 15, stiffness: 110 }}
    >
      <div className='container text-center'>
        Copyright &copy; {new Date().getFullYear()} - Human RH
        <div className='d-flex justify-content-center align-items-center'>
          <a href='#' target='_blank' rel='noreferrer' className='me-3'></a>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
