import React, { useState } from 'react';
import {
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
  Paper,
  Button,
  Autocomplete,
  TextField,
} from '@mui/material';
import {
  MoreVert,
  InsertChartOutlinedOutlined,
  ExitToAppOutlined,
} from '@mui/icons-material';
import { Tabletoolbar } from './TableToolbar';
import { TableNoData } from './TableNoData';
import { Action, Row, SortData, TableProps } from '../../models/table';
import { useLocation } from 'react-router-dom';

const Table = ({
  title,
  columns,
  data,
  showCheckboxes,
  tableHead,
  customButton,
  renderCustomButton,
  handleQuotez,
  handleExportDataQuoteHistorial,
  valueState,
  setValueState,
  optionsData,
}: TableProps) => {
  const location = useLocation();
  const { pathname } = location;

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
    //lógica para eliminar las filas seleccionadas aquí
    console.log('Eliminando filas seleccionadas:', selectedRows);
    //Después de la eliminación, limpia las filas seleccionadas
    setSelectedRows([]);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
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
    <Grid sx={{ pl: 2, pr: 2 }}>
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
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
            pr: 3,
            pb: { xs: 2, sm: 0 },
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={pathname === '/quotes' || pathname === '/quote-history' ? 4 : 6}
          >
            <Tabletoolbar
              showCheckboxes={showCheckboxes}
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              selectedRows={selectedRows}
              handleDeleteSelected={handleDeleteSelected}
            />
          </Grid>
          {(pathname === '/quotes' || pathname === '/quote-history') && (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ pl: { xs: 3, sm: 0 }, pr: { xs: 1, sm: 0 } }}
            >
              <Autocomplete
                value={valueState}
                onChange={(_event: any, newValue: any | null) => {
                  if (setValueState) {
                    setValueState(newValue);
                  }
                }}
                options={optionsData || []}
                getOptionLabel={(option) => option.razonSocial}
                renderInput={(params) => (
                  <TextField {...params} label="Seleccione cliente" />
                )}
              />
            </Grid>
          )}

          {(pathname === '/quotes' || pathname === '/quote-history') && (
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              sx={{
                display: 'flex',
                justifyContent: 'end',
                mt: { xs: 2, sm: 0 },
                mb: { xs: 0, sm: 2, md: 0 },
              }}
            >
              <Button
                variant="contained"
                color="inherit"
                sx={{ p: 1.5, letterSpacing: '1.2px' }}
                onClick={() =>
                  pathname === '/quotes' && handleQuotez
                    ? handleQuotez()
                    : handleExportDataQuoteHistorial &&
                      handleExportDataQuoteHistorial()
                }
                endIcon={pathname === '/quote-history' && <ExitToAppOutlined />}
                disabled={pathname === '/quote-history' && data?.length === 0}
              >
                {pathname === '/quotes'
                  ? 'Configurar Variables'
                  : 'Exportar Excel'}
              </Button>
            </Grid>
          )}
        </Grid>
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
                    sx={{
                      width: 'auto',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
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
              {data.length > 0 ? (
                sortedData.length === 0 ? (
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
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                            }}
                          >
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
                )
              ) : (
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={columns.length + (showCheckboxes ? 1 : 0)}
                    sx={{ py: 3 }}
                  >
                    <Paper
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <InsertChartOutlinedOutlined
                        color="primary"
                        sx={{ width: 40, height: 40 }}
                      />
                      <Typography variant="h6" paragraph>
                        No hay información por mostrar
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
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
    </Grid>
  );
};

export { Table };
