import { Table, TableBody, TableData, TableHeader, TableRow, TableHead } from '@/components/table';
import { fromUtcDate, formatDate } from '@/libs';
import { User } from '@/utils/types/user';
import { Pencil, Trash2 } from 'lucide-react';
import mock from '@/components/table/mock.json';
function Home() {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Date of Birth</TableHeader>
            <TableHeader>Age</TableHeader>
            <TableHeader>Country</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {mock.map((item: User, index) => (
            <TableRow key={index}>
              <TableData>{item.id}</TableData>
              <TableData>{item.first_name}</TableData>
              <TableData>{item.last_name}</TableData>
              <TableData>{item.email}</TableData>
              <TableData>{formatDate(fromUtcDate(item.date_of_birth))}</TableData>
              <TableData>{item.age}</TableData>
              <TableData>{item.country}</TableData>
              <TableData>{item.phone}</TableData>
              <TableData>
                <div className='d-flex gap-2'>
                  <button className='btn btn-warning btn-sm p-1 d-flex justify-content-center align-items-center'>
                    <Pencil width={16} height={16} />
                  </button>
                  <button className='btn btn-danger btn-sm p-1 d-flex justify-content-center align-items-center'>
                    <Trash2 width={16} height={16} />
                  </button>
                </div>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Home;
