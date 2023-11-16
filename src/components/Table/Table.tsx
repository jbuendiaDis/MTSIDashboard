import React, { useState } from 'react';
import {
  Container,
  Grid,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TableSortLabel,
  Typography,
  IconButton,
  TablePagination,
  Popover,
  List,
  ListItem,
  ListItemText,
  Card,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { Tabletoolbar } from './TableToolbar';
import { TableNoData } from './TableNoData';
import { Action, Row, SortData, TableProps } from '../../models/table';

const Table = ({
  title,
  columns,
  data,
  showCheckboxes,
  tableHead,
  customButton,
  renderCustomButton,
}: TableProps) => {
  const [sortData, setSortData] = useState<SortData>({
    activeColumn: '',
    direction: 'asc',
  });

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowData, setSelectedRowData] = useState<Row | null>(null);

  const handleSort = (columnId: string) => {
    setSortData((prevSortData) => ({
      activeColumn: columnId,
      direction: prevSortData.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      const allRows = data.map((_, index) => index);
      setSelectedRows(allRows);
    }
  };

  const handleSelectRow = (index: number) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(index)) {
        return prevSelectedRows.filter((rowIndex) => rowIndex !== index);
      } else {
        return [...prevSelectedRows, index];
      }
    });
  };

  const handleDeleteSelected = () => {
    // Implementa tu lógica para eliminar las filas seleccionadas aquí
    console.log('Eliminando filas seleccionadas:', selectedRows);
    // Después de la eliminación, limpia las filas seleccionadas
    setSelectedRows([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleMoreVertClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    rowData: Row
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowData(rowData);
  };

  const handleMoreVertClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action: Action) => {
    action.onClick(selectedRowData!); // Aquí asumimos que siempre habrá datos seleccionados
    setAnchorEl(null);
  };

  const filteredData = data.filter((row) =>
    Object.values(row)
      .map((value) => String(value).toLowerCase())
      .join(' ')
      .includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const column = columns.find((col) => col.id === sortData.activeColumn);
    if (column) {
      const aValue = a[column.id];
      const bValue = b[column.id];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortData.direction === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        const stringA = String(aValue).toLowerCase();
        const stringB = String(bValue).toLowerCase();
        return sortData.direction === 'asc'
          ? stringA.localeCompare(stringB)
          : stringB.localeCompare(stringA);
      }
    }
    return 0;
  });

  return (
    <Container maxWidth="xl">
      {tableHead && (
        <Grid
          container
          sx={{
            mb: 8,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Grid xs={12} sm={8} md={8} item>
            <Typography variant="h4" sx={{ letterSpacing: '1px' }}>
              {title}
            </Typography>
          </Grid>
          {customButton && (
            <Grid
              xs={12}
              sm={4}
              md={4}
              item
              sx={{ display: 'flex', justifyContent: 'end' }}
            >
              {renderCustomButton}
            </Grid>
          )}
        </Grid>
      )}
      <Card>
        <Tabletoolbar
          showCheckboxes={showCheckboxes}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          selectedRows={selectedRows}
          handleDeleteSelected={handleDeleteSelected}
        />
        <TableContainer>
          <MuiTable>
            <TableHead>
              <TableRow>
                {showCheckboxes && (
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.length === data.length}
                      indeterminate={
                        selectedRows.length > 0 &&
                        selectedRows.length < data.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ fontWeight: 700 }}
                  >
                    {column.label === 'Acciones' ? (
                      <div>Acciones</div>
                    ) : (
                      <TableSortLabel
                        active={sortData.activeColumn === column.id}
                        direction={sortData.direction}
                        onClick={() => handleSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableNoData
                  searchTerm={searchTerm}
                  columns={columns}
                  showCheckboxes={showCheckboxes}
                />
              ) : (
                sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index} hover>
                      {showCheckboxes && (
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(
                              index + page * rowsPerPage
                            )}
                            onChange={() =>
                              handleSelectRow(index + page * rowsPerPage)
                            }
                          />
                        </TableCell>
                      )}
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {column.label === 'Acciones' ? (
                            <IconButton
                              aria-label="acciones"
                              onClick={(e) => handleMoreVertClick(e, row)}
                            >
                              <MoreVert />
                            </IconButton>
                          ) : (
                            row[column.id]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleMoreVertClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <List>
            {columns
              .find((column) => column.label === 'Acciones')
              ?.actions?.map((action, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => handleActionClick(action)}
                >
                  {action.icon} &nbsp;
                  <ListItemText
                    primary={action.label}
                    sx={{ color: action.label === 'Eliminar' ? 'red' : null }}
                  />
                </ListItem>
              ))}
          </List>
        </Popover>
      </Card>
    </Container>
  );
};

export { Table };
