import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './sub-menu.module.scss';

type SubMenuProps = {
  children: React.ReactNode;
  sbmIcon: React.ReactNode;
  sbmTitle: string;
  parentOpen: boolean;
} & React.HTMLAttributes<HTMLUListElement>;
const SubMenu: React.FC<SubMenuProps> = ({ children, sbmIcon, sbmTitle, parentOpen }) => {
  const [open, setOpen] = useState(false);

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
      <button
        className={`d-flex align-items-center w-100 ${styles.subMenuToggle} ${open ? 'pb-2' : ''}`}
        onClick={toggleMinimized}
      >
        {sbmIcon}
        {parentOpen ? sbmTitle : ''}
      </button>
      <motion.ul
        className={`d-flex flex-column w-100 ${styles.subMenuList} ${open ? 'active' : ''}`}
        initial={closedAnimation}
        animate={open ? openAnimation : closedAnimation}
      >
        <AnimatePresence initial={false}>
          {open &&
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
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  );
};

export default SubMenu;
