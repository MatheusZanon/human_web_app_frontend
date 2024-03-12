function TableHead({ children }: tableProps) {
  return <thead className='align-middle'>{children}</thead>;
}

function TableBody({ children }: tableProps) {
  return <tbody className='align-middle'>{children}</tbody>;
}

function TableFooter({ children }: tableProps) {
  return <tfoot className='align-middle'>{children}</tfoot>;
}

function TableRow({ children }: tableProps) {
  return <tr>{children}</tr>;
}

function TableHeader({ children }: tableProps) {
  return (
    <th colSpan={1} rowSpan={1}>
      {children}
    </th>
  );
}

type tableDataProps = {
  children: React.ReactNode;
  colSpan?: number;
};

function TableData({ children, colSpan }: tableDataProps) {
  return <td colSpan={colSpan}>{children}</td>;
}

type tableProps = {
  children: React.ReactNode;
};

function Table({ children }: tableProps) {
  return <table className='table table-hover'>{children}</table>;
}

export { Table, TableRow, TableHeader, TableHead, TableBody, TableData, TableFooter };
