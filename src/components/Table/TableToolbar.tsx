import {
  OutlinedInput,
  Toolbar,
  InputAdornment,
  Typography,
  IconButton,
} from '@mui/material';
import { Search, Delete } from '@mui/icons-material';
import { TableToolbarProps } from '../../models/table';

const Tabletoolbar = ({
  showCheckboxes,
  searchTerm,
  handleSearch,
  selectedRows,
  handleDeleteSelected,
}: TableToolbarProps) => {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(selectedRows.length > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {showCheckboxes && selectedRows.length > 0 ? (
        <>
          <Typography variant="h6" sx={{ flex: '1 1 100%' }}>
            {selectedRows.length} seleccionados
          </Typography>
          <IconButton onClick={handleDeleteSelected}>
            <Delete />
          </IconButton>
        </>
      ) : (
        <OutlinedInput
          sx={{ width: { xs: '100%', sm: '300px' } }}
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar..."
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />
      )}
    </Toolbar>
  );
};

export { Tabletoolbar };
