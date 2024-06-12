import { createContext, useContext, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Bot, Dot, DollarSign, UserCog2Icon, UsersRound, ChevronLeft, ChevronRight } from 'lucide-react';
import { SubMenu, SubMenuItem } from '@/components/sub-menu';
import styles from './aside.module.scss';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';

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
    const isActive = location.pathname.split('/').slice(2).join('/') === to;

    return (
        <>
            <NavLink
                className={`d-flex align-items-center ${styles.navlink}`}
                aria-current={isActive ? 'page' : false}
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
    const { hasRole } = useAuthenticatedUser();

    return (
        <motion.nav
            className={`d-block ${styles.sidebar}`}
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
                <div className='w-100 d-flex justify-content-center align-items-center' style={{ maxWidth: '56px' }}>
                    <img className={'img-fluid'} src='/human-logo.svg' alt='Logo Human' />
                </div>
                <motion.span
                    className={`${styles.brandTitle}`}
                    initial={{ opacity: 0 }}
                    animate={open ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {open ? 'Human' : null}
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
                {hasRole('ADMIN') && (
                    <NavItem
                        icon={<LineChart className={open ? 'me-2' : ''} />}
                        title={open ? 'Dashboard' : ''}
                        to='dashboard'
                    />
                )}
                {(hasRole('ADMIN') || hasRole('TI') || hasRole('RH_GERENCIA')) && (
                    <NavItem
                        icon={<UsersRound className={open ? 'me-2' : ''} />}
                        title={open ? 'Ativar Funcionários' : ''}
                        to='activate-users'
                    />
                )}
                <li className='nav-item'>
                    <NavItem icon={<Bot className={open ? 'me-2' : ''} />} title={open ? 'Robôs' : ''} to='robos' />
                </li>
                {(hasRole('ADMIN') || hasRole('FINANCEIRO_OPERACAO') || hasRole('TI')) && (
                    <li className='nav-item'>
                        <SubMenu
                            sbmIcon={<DollarSign className={open ? 'me-2' : ''} />}
                            sbmTitle='Finanças'
                            parentOpen={open}
                        >
                            <SubMenuItem
                                icon={<Dot className={'me-2'} />}
                                title={'Clientes'}
                                to='financeiro/clientes'
                                open={open}
                            />
                            <SubMenuItem
                                icon={<Dot className={'me-2'} />}
                                title={'Relatorios'}
                                to='financeiro/relatorios'
                                open={open}
                            />
                            <SubMenuItem
                                icon={<Dot className={'me-2'} />}
                                title={'Arquivos Drive'}
                                to='financeiro/drive'
                                open={open}
                            />
                        </SubMenu>
                    </li>
                )}
                {(hasRole('ADMIN') || hasRole('RH_OPERACAO') || hasRole('RH_GERENCIA') || hasRole('TI')) && (
                    <li className='nav-item'>
                        <SubMenu
                            sbmIcon={<UserCog2Icon className={open ? 'me-2' : ''} />}
                            sbmTitle='RH'
                            parentOpen={open}
                        >
                            <SubMenuItem
                                icon={<Dot className={open ? 'me-2' : ''} />}
                                title={'Funcionários'}
                                to='rh/funcionarios'
                                open={open}
                            />
                            <SubMenuItem
                                icon={<Dot className={open ? 'me-2' : ''} />}
                                title={'Folha de Ponto'}
                                to='rh/folha-de-ponto'
                                open={open}
                            />
                        </SubMenu>
                    </li>
                )}
            </motion.ul>
        </motion.nav>
    );
}

export default Sidebar;
