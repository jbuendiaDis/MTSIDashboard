/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLoader } from '../../components/Loader';
import { useApi } from '../../hooks/useApi';
import { LoaderContextType } from '../../models';
import { PaylaodCustomers, Payload } from './types';
import { get } from 'lodash';
import { Table } from '../../components/Table';
import { Delete, Edit, Add } from '@mui/icons-material';
import { Button } from '@mui/material';

export const Customers = () => {
  const { handleShowLoader }: LoaderContextType = useLoader();
  const [customersData, setCustomersTable] = useState<
    PaylaodCustomers['data'][]
  >([]);

  useEffect(() => {
    handleShowLoader(true);

    handleGetCustomers();
  }, []);

  const _getCustomers = useApi({
    endpoint: '/clientes',
    method: 'get',
  });

  const handleGetCustomers = async (): Promise<boolean> => {
    try {
      const response: Payload = await _getCustomers();
      const payload = get(response, 'payload', {});
      const dataResponse: PaylaodCustomers['data'][] = get(payload, 'data', []);
      const headerResponse: Payload['response'] = get(response, 'response');

      if (headerResponse.code === 200) {
        handleShowLoader(false);
        setCustomersTable(dataResponse);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const columns: any[] = [
    { id: 'calle', label: 'Calle', align: 'left' },
    { id: 'codigoCliente', label: 'código cliente', align: 'left' },
    { id: 'colonia', label: 'Colonia', align: 'left' },
    { id: 'formaPago', label: 'Forma de Pago', align: 'left' },
    { id: 'metodoPago', label: 'Método de Pago', align: 'left' },
    { id: 'numeroExterior', label: 'No. Exterior', align: 'left' },
    { id: 'numeroInterior', label: 'No. Interior', align: 'left' },
    { id: 'razonSocial', label: 'Razón Social', align: 'left' },
    { id: 'regimenFiscal', label: 'REgime Fiscal', align: 'left' },
    { id: 'rfc', label: 'RFC', align: 'left' },
    { id: 'telefono', label: 'Teléfono', align: 'left' },
    { id: 'usoCFDI', label: 'CFDI', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <Edit />,
          onClick: (rowData: any) => console.log('click', rowData),
        },
        {
          label: 'Eliminar',
          icon: <Delete />,
          onClick: (rowData: any) => console.log('DELETE', rowData),
        },
      ],
    },
  ];

  return (
    <div>
      <Table
        showCheckboxes={false}
        tableHead
        title="Clientes"
        columns={columns}
        data={customersData}
        customButton
        renderCustomButton={
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={() => alert('Open Modal')}
            startIcon={<Add />}
          >
            Agregar Cliente
          </Button>
        }
      />
    </div>
  );
};
