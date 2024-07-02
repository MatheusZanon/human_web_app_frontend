import React from "react";

interface ContentProps {
    children: React.ReactNode;
    title: string;
}

export const Content = ({ children, title }: ContentProps) => {
    return (
        <div className="px-3 pb-3 shadow rounded mb-2">
            <h1 className='mb-3'>{title}</h1>
            {children}
        </div>
    );
}
