import { createContext, useContext, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Bot, LogIn, UserRoundPlus, LineChart, ChevronLeft, ChevronRight } from 'lucide-react';
import logo from '@/assets/react.svg';
import SubMenu from '@/components/sub-menu';
import styles from './aside.module.scss';

export const SidebarContext = createContext<{
  open: boolean;
  toggleMinimized: () => void;
}>({
  open: false,
  toggleMinimized: () => {
    throw new Error('`sidebarContext` must be used within a `SidebarProvider` component');
  },
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  const toggleMinimized = () => setOpen((prevOpen) => !prevOpen);
  const contextValue = useMemo(
    () => ({
      open,
      toggleMinimized,
    }),
    [open],
  );

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>;
}

function NavItem({ icon, title, to }: { icon: React.ReactNode; title: string; to: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <>
      <NavLink
        className={`d-flex align-items-center ${styles.navlink}`}
        aria-current={isActive ? 'page' : undefined}
        to={to}
      >
        {icon}
        {title}
      </NavLink>
    </>
  );
}

function Sidebar() {
  const { open, toggleMinimized } = useContext(SidebarContext);

  return (
    <motion.nav
      className={`col-md-3 col-lg-2 d-block ${styles.sidebar}`}
      initial={{ width: '256px', top: '0' }}
      animate={{
        width: open ? '256px' : '56px',
      }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 110,
      }}
    >
      <div className={`d-flex align-items-center gap-2 ${styles.brandWrapper}`} style={{ padding: '1rem 0' }}>
        <img className={'img-fluid'} src={logo} alt='Logo Human RH' />
        <motion.span
          className={`${styles.brandTitle}`}
          initial={{ opacity: 0 }}
          animate={open ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {open ? 'Human RH' : null}
        </motion.span>
      </div>
      <div className='d-flex justify-content-end align-items-center py-2'>
        <button
          className={`btn ${styles.toggleBtn}`}
          type='button'
          onClick={toggleMinimized}
          onFocus={(event) => event.currentTarget.blur()}
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>
      <motion.ul
        className={`${styles.navlist}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <NavItem icon={<Home className={open ? 'me-2' : ''} />} title={open ? 'Home' : ''} to='/' />
        <li className='nav-item'>
          <SubMenu sbmIcon={<Bot className={open ? 'me-2' : ''} />} sbmTitle='Robôs' parentOpen={open}>
            <NavItem icon={<Bot className={open ? 'me-2' : ''} />} title={open ? 'Todos' : ''} to='/robos' />
            <NavItem
              icon={<Bot className={open ? 'me-2' : ''} />}
              title={open ? 'Financeiro' : ''}
              to='/robos/financeiro'
            />
            <NavItem icon={<Bot className={open ? 'me-2' : ''} />} title={open ? 'RH' : ''} to='/robos/rh' />
          </SubMenu>
        </li>
        <li className='nav-item'>
          <SubMenu sbmIcon={<LineChart className={open ? 'me-2' : ''} />} sbmTitle='Relatórios' parentOpen={open}>
            <NavItem icon={<LineChart className={open ? 'me-2' : ''} />} title={open ? 'Todos' : ''} to='/relatorios' />
            <NavItem
              icon={<LineChart className={open ? 'me-2' : ''} />}
              title={open ? 'Valores Financeiro' : ''}
              to='/relatorios/valores-financeiro'
            />
          </SubMenu>
        </li>
        <NavItem
          icon={<UserRoundPlus className={open ? 'me-2' : ''} />}
          title={open ? 'Registrar' : ''}
          to='/register'
        />
        <NavItem icon={<LogIn className={open ? 'me-2' : ''} />} title={open ? 'Login' : ''} to='/login' />
      </motion.ul>
    </motion.nav>
  );
}

export default Sidebar;