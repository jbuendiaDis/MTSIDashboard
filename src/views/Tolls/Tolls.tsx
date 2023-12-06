/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from '../../components/Table';
import { Button } from '@mui/material';
import {
  Add,
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from '@mui/icons-material';
import { useHelpers } from './helpers';
import { Column } from '../../models';
import { DataTolls } from './types';

const Tolls = () => {
  const { tollsData, handleOpenModalDelete, handleGetToll } = useHelpers();

  const columns: Column[] = [
    { id: 'localidadOrigen', label: 'Localidad Origen', align: 'left' },
    { id: 'localidadDestino', label: 'Localidad Destino', align: 'left' },
    { id: 'totalKilometers', label: 'Kilometros', align: 'left' },
    { id: 'costTotalPeajes', label: 'Total Peajes', align: 'left' },
    { id: 'tipoUnidad', label: 'Tipo Unidad', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: DataTolls) => handleGetToll(rowData._id),
        },
        {
          label: 'Eliminar',
          icon: (
            <DeleteOutlineOutlined
              sx={{ width: 20, height: 20, color: 'red' }}
            />
          ),
          onClick: (rowData: DataTolls) => handleOpenModalDelete(rowData),
        },
      ],
    },
  ];

  return (
    <div>
      <Table
        tableHead
        customButton
        showCheckboxes={false}
        title="Peajes"
        renderCustomButton={
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={() => console.log('Click')}
            startIcon={<Add />}
          >
            Agregar Peaje
          </Button>
        }
        columns={columns}
        data={tollsData}
      />
    </div>
  );
};

export { Tolls };
