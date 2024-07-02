import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './sub-menu.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

function SubMenuItem({ icon, title, to, open }: { icon: React.ReactNode; title: string; to: string, open: boolean }) {
    const location = useLocation();
    const isActive = location.pathname.split('/').slice(2).join('/') === to;

    return (
        <>
            <NavLink
                className={`d-flex align-items-center ${styles.navlink}`}
                aria-current={isActive ? 'page' : false}
                data-submenu-open={open}
                to={to}
            >
                {icon}
                {title}
            </NavLink>
        </>
    );
}

type SubMenuProps = {
    children: React.ReactNode;
    sbmIcon: React.ReactNode;
    sbmTitle: string;
    parentOpen: boolean;
} & React.HTMLAttributes<HTMLUListElement>;
const SubMenu: React.FC<SubMenuProps> = ({ children, sbmIcon, sbmTitle, parentOpen }) => {
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const location = useLocation();

    const toggleMinimized = () => setOpen(!open);

    const openAnimation = {
        height: 'fit-content',
        transition: {
            type: 'spring',
            damping: 15,
            stiffness: 110,
        },
    };

    const closedAnimation = {
        height: 0,
        transition: {
            type: 'spring',
            damping: 15,
            stiffness: 110,
        },
    };

    const transition = {
        duration: 0.4,
        ease: 'easeInOut',
        delay: 0.1,
    };

    return (
        <motion.div className={`w-100 ${styles.subMenuContainer}`}>
            <>
                <button
                    className={`d-flex align-items-center w-100 ${styles.subMenuToggle} ${open ? 'pb-2' : ''}`}
                    aria-expanded={open || hover}
                    aria-current={
                        !open &&
                        location.pathname.includes(
                            sbmTitle
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '')
                                .toLowerCase(),
                        )
                            ? 'page'
                            : false
                    }
                    onClick={parentOpen ? toggleMinimized : () => null}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    {sbmIcon}
                    {parentOpen ? <span className='d-flex flex-grow-1'>{sbmTitle}</span> : ''}
                    {parentOpen && <span>{open ? <ChevronUp /> : <ChevronDown />}</span>}
                </button>
                <motion.ul
                    className={`d-flex flex-column w-100 ${styles.subMenuList} ${open ? 'active' : ''}`}
                    initial={closedAnimation}
                    animate={open ? openAnimation : closedAnimation}
                >
                    <AnimatePresence initial={false}>
                        {parentOpen &&
                            open &&
                            React.Children.map(children, (child, index) => {
                                return (
                                    <motion.li
                                        key={index}
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                        initial='hidden'
                                        animate='visible'
                                        exit='hidden'
                                        custom={index}
                                        transition={transition}
                                        className={`${styles.subMenuItem}`}
                                    >
                                        {child}
                                    </motion.li>
                                );
                            })}
                        {!parentOpen && hover && (
                            <div
                                className={`dropdown-menu ${hover ? 'show' : ''}`}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            >
                                {children}
                            </div>
                        )}
                    </AnimatePresence>
                </motion.ul>
            </>
        </motion.div>
    );
};

export { SubMenu, SubMenuItem };
