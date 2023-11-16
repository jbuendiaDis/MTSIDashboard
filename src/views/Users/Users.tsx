/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, ModalContextType } from '../../models';
import { useApi } from '../../hooks/useApi';
import { PaylaodUsers, Payload } from './types';
import { Table } from '../../components/Table';
import { Add, ModeEditOutlineOutlined, DeleteOutlineOutlined} from '@mui/icons-material';
import { get } from 'lodash';
import { Button } from '@mui/material';
import { useModal } from '../../components/Modal';
import { Column } from '../../models/table';

const Users = () => {
  const { handleOpenModal }: ModalContextType = useModal();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const [usersTable, setUsersTable] = useState<PaylaodUsers['data'][]>([]);

  const _getUsers = useApi({
    endpoint: '/users',
    method: 'get',
  });

  useEffect(() => {
    handleShowLoader(true);

    handleGetUsers();
  }, []);

  const handleGetUsers = async (): Promise<boolean> => {
    try {
      const response: Payload = await _getUsers();
      const payload = get(response, 'payload', {});
      const dataResponse: PaylaodUsers['data'][] = get(payload, 'data', []);
      const headerResponse: Payload['response'] = get(response, 'response');

      if (headerResponse.code === 200) {
        handleShowLoader(false);
        setUsersTable(dataResponse);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const columns: Column[] = [
    { id: 'name', label: 'Nombre', align: 'left' },
    { id: 'lastname', label: 'Apellido', align: 'left' },
    { id: 'age', label: 'Edad', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'position', label: 'Puesto', align: 'left' },
    { id: 'signature', label: 'Firma', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <ModeEditOutlineOutlined sx={{width: 20, height: 20}}/>,
          onClick: (rowData: any) => console.log('click', rowData),
        },
        {
          label: 'Eliminar',
          icon: <DeleteOutlineOutlined sx={{width: 20, height: 20, color: 'red'}}/>,
          onClick: (rowData: any) => console.log('DELETE', rowData),
        },
      ],
    },
  ];

  const handleModal = (): void => {
    handleOpenModal({
      title: 'Titulo',
    });
  };

  return (
    <div>
      <Table
        showCheckboxes={false}
        tableHead={true}
        title="Usuarios"
        columns={columns}
        data={usersTable}
        customButton
        renderCustomButton={
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={handleModal}
            startIcon={<Add />}
          >
            Agregar Usuario
          </Button>
        }
      />
    </div>
  );
};

export { Users };
