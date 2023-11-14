import { TableCell, TableRow, Paper, Typography } from '@mui/material';
import { Column } from '../../models/table';

interface Props {
  searchTerm: string;
  columns: Column[];
  showCheckboxes: boolean;
}

const TableNoData = ({ searchTerm, columns, showCheckboxes }: Props) => {
  return (
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
          <Typography variant="h6" paragraph>
            No se encontraron resultados
          </Typography>
          <Typography variant="body2">
            No se encontraron resultados para &nbsp;
            <strong>&quot;{searchTerm}&quot;</strong>. <br /> Intenta verificar
            errores tipográficos o usar palabras completas.
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
};

export { TableNoData };
