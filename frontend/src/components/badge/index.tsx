import React from 'react';
import styles from './badge.module.scss';
import type { LucideIcon } from 'lucide-react';

export interface BadgeProps extends Omit<React.ComponentProps<'span'>, 'color'> {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark';
    href?: string;
    icon?: React.ReactElement<React.ComponentProps<LucideIcon>>;
    size?: 'sm' | 'md' | 'lg';
    children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'primary', size = 'md', href, icon, children, ...props }) => {
    const iconWithClassName = icon
        ? React.cloneElement(icon, {
              className: `${icon.props.className || ''} me-1`,
              size: size === 'sm' ? 14 : size === 'md' ? 18 : 22,
          })
        : null;

    const Content: React.FC = () => (
        <span
            className={`badge bg-${variant} ${variant === 'dark' || variant === 'secondary' ? 'text-white' : 'text-black'} d-flex align-items-center ${styles[size]}`}
            {...props}
        >
            <span className='visually-hidden'>Badge</span>
            {iconWithClassName}
            {children && <span className='d-flex align-items-center flex-grow-1'>{children}</span>}
        </span>
    );
    return href ? <a href={href}>{<Content />}</a> : <Content />;
};

export { Badge };
