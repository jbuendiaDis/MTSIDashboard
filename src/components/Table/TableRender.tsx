import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Container,
  Card,
} from '@mui/material';

interface TableColumn {
  name: string;
  selector?: (row: any) => any;
  cell?: (row: any) => JSX.Element | false;
  sortable?: boolean;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  rowsPerPageOptions?: number[];
}

const CustomTable: React.FC<TableProps> = ({
  columns,
  data,
  rowsPerPageOptions = [5, 10, 25],
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="xl">
      <Card>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.name}>{column.name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.name}>
                      {column.cell
                        ? column.cell(row)
                        : column.selector
                        ? column.selector(row)
                        : ''}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export default CustomTable;
