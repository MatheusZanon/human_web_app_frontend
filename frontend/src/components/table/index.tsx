import { ChevronUp, ChevronDown } from 'lucide-react';

type TableProps = {
    children: React.ReactNode;
};

type TableRowProps = {
    children: React.ReactNode;
};

type TableHeaderProps = {
    children: React.ReactNode;
    sortable?: boolean;
    columnKey?: string;
    sortDirection?: string;
    onSort?: () => void;
    className?: string;
};

type TableDataProps = {
    children: React.ReactNode;
    colSpan?: number;
};

function Table({ children }: TableProps) {
    return <table className='table table-hover'>{children}</table>;
}

function TableHeader({ children, sortable, columnKey, sortDirection, onSort , className}: TableHeaderProps) {
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

function TableHead({ children }: TableProps) {
    return <thead className='align-middle'>{children}</thead>;
}

function TableBody({ children }: TableProps) {
    return <tbody className='align-middle'>{children}</tbody>;
}

function TableRow({ children }: TableRowProps) {
    return <tr>{children}</tr>;
}

function TableData({ children, colSpan }: TableDataProps) {
    return <td colSpan={colSpan}>{children}</td>;
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
