import { ChevronUp, ChevronDown } from 'lucide-react';

type TableProps = {
    children: React.ReactNode;
    onContextMenu?: (e: React.MouseEvent) => void;
};

type TableHeaderProps = {
    children: React.ReactNode;
    sortable?: boolean;
    columnKey?: string;
    sortDirection?: string;
    onSort?: () => void;
    className?: string;
    onContextMenu?: (e: React.MouseEvent) => void;
};

interface TableRowProps {
    children: React.ReactNode;
    className?: string;
};

type TableDataProps = {
    children?: React.ReactNode;
    colSpan?: number;
    onContextMenu?: (e: React.MouseEvent) => void;
};

function Table({ children }: TableProps) {
    return <table className='table table-hover w-100'>{children}</table>;
}

function TableHeader({ children, sortable, columnKey, sortDirection, onSort, className }: TableHeaderProps) {
    const handleSort = () => {
        if (sortable && columnKey && onSort) {
            onSort();
        }
    };
    return (
        <th colSpan={1} rowSpan={1} onClick={handleSort} style={{ cursor: sortable ? 'pointer' : 'default' }}>
            <div className={`d-flex justify-content-between align-items-center ${className}`}>
                {children}
                {sortable && (
                    <div className='d-flex flex-column'>
                        <ChevronUp size={18} opacity={sortDirection === 'asc' ? 1 : 0.3} />
                        <ChevronDown size={18} opacity={sortDirection === 'desc' ? 1 : 0.3} />
                    </div>
                )}
            </div>
        </th>
    );
}

function TableHead({ children, onContextMenu }: TableProps) {
    return <thead className='align-middle' onContextMenu={onContextMenu}>{children}</thead>;
}

function TableBody({ children }: TableProps) {
    return <tbody className={`align-middle`}>{children}</tbody>;
}

function TableRow({ children, className: classNameProps }: TableRowProps) {
    return <tr className={classNameProps}>{children}</tr>;
}

function TableData({ children, colSpan, onContextMenu }: TableDataProps) {
    return <td colSpan={colSpan} onContextMenu={onContextMenu}>{children}</td>;
}

function TableFooter({ children }: TableProps) {
    return <tfoot className='align-middle'>{children}</tfoot>;
}

function TableFilter({ children }: TableProps) {
    return (
        <td colSpan={1} rowSpan={1}>
            {children}
        </td>
    );
}

function TableSort({ children }: TableProps) {
    return (
        <td colSpan={1} rowSpan={1}>
            {children}
        </td>
    );
}

export { Table, TableRow, TableHeader, TableHead, TableBody, TableData, TableFooter, TableFilter, TableSort };
