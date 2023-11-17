/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLoader } from '../../components/Loader';
import { LoaderContextType } from '../../models';
import { useApi } from '../../hooks/useApi';
import {
  DataUsers,
  FormCreateUserValues,
  PaylaodUsers,
  Payload,
} from './types';
import { Table } from '../../components/Table';
import {
  Add,
  ModeEditOutlineOutlined,
  DeleteOutlineOutlined,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { get } from 'lodash';
import { Column } from '../../models/table';
import { Drawer } from '../../components/Drawer';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { UserForm } from './UserForm';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { Response } from '../../models/responseApi';

const Users = () => {
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalSuccess, modalInformation, modalDelete } =
    useModalConfirmation();
  const [usersTable, setUsersTable] = useState<PaylaodUsers['data'][]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  useState<boolean>(false);

  const requiredValue: string = 'Este campo es obligatorio.';
  const noMatchPassword = 'No coinciden las contraseñas.';

  const _getUsers = useApi({
    endpoint: '/users',
    method: 'get',
  });

  const _createUsers = useApi({
    endpoint: '/users',
    method: 'post',
  });

  const _deleteUser = useApi({
    endpoint: '/users',
    method: 'delete',
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

  const handleOpenModalDelete = (data: DataUsers) => {
    console.log('Data', data);
    const message: string = '¿Seguro que desea eliminar:';
    const dataValue = `${data?.name} ${data?.lastname}`;
    modalDelete({
      message,
      dataValue,
      callbackConfirm: () => handleDelete(data._id),
    });
  };

  const handleDelete = async (id: string): Promise<boolean> => {
    try {
      const response = await _deleteUser({
        urlParam: id,
      });
      handleGetUsers();
      console.log('RESPONSE_DELETE', response);
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
          icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: DataUsers) => console.log('click', rowData),
        },
        {
          label: 'Eliminar',
          icon: (
            <DeleteOutlineOutlined
              sx={{ width: 20, height: 20, color: 'red' }}
            />
          ),
          onClick: (rowData: DataUsers) => handleOpenModalDelete(rowData),
        },
      ],
    },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(requiredValue),
    lastname: Yup.string().required(requiredValue),
    age: Yup.string().nullable(),
    email: Yup.string()
      .email('Ingrese un email válido.')
      .required(requiredValue),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(15, 'La contraseña no puede tener más de 15 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
        'La contraseña debe cumplir con los criterios'
      )
      .required(requiredValue),
    confirmPassword: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(15, 'La contraseña no puede tener más de 15 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
        'La contraseña debe cumplir con los criterios'
      )
      .required(requiredValue)
      .oneOf([Yup.ref('password')], noMatchPassword),
    position: Yup.string().required(requiredValue),
    signature: Yup.string().required(requiredValue),
  });

  const initialValues: FormCreateUserValues = {
    name: '',
    lastname: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    position: '',
    signature: '',
  };

  const handleSubmit = async (
    values: FormCreateUserValues
  ): Promise<boolean> => {
    try {
      const newValues: Omit<FormCreateUserValues, 'confirmPassword'> = {
        name: values.name,
        lastname: values.lastname,
        age: values.age,
        email: values.email,
        password: values.password,
        position: values.position,
        signature: values.signature,
      };

      const { response }: Payload = await _createUsers({
        body: newValues,
      });
      const message: Response['message'] = response.message;
      const code: Response['code'] = response.code;

      if (code === 200) {
        setOpenDrawer(false);
        handleGetUsers();
        modalSuccess({ message });
      } else {
        modalInformation({ message });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
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
            onClick={() => setOpenDrawer(true)}
            startIcon={<Add />}
          >
            Agregar Usuario
          </Button>
        }
      />

      <Drawer
        open={openDrawer}
        anchor="right"
        onClose={() => setOpenDrawer(!openDrawer)}
        title="Crear Usuario"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <UserForm setOpenDrawer={() => setOpenDrawer(!openDrawer)} />
          </Form>
        </Formik>
      </Drawer>
    </>
  );
};

export { Users };
