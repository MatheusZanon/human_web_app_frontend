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
            <div className='container'>
                <div className='d-flex flex-column justify-content-center align-items-center gap-1'>
                    <span>Human Gestão de Pessoas | Coder Insights</span>
                    <div className='d-flex align-items-center gap-1'>
                        <span>Copyright &copy; {new Date().getFullYear()}</span>
                        <a href='#' target='_blank' rel='noreferrer' className='me-3'>
                            <img src='/coderinsights-logo.svg' alt='Coder Insights' />
                        </a>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}

export default Footer;
