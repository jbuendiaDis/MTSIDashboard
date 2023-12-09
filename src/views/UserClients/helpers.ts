/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, Response } from '../../models';
import { ResponseUserClient, dataUserClient } from './types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../components/Auth';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { DataCustomer, PaylaodCustomers, Payload } from '../Customers/types';
import { get } from 'lodash';

interface ValuesForm {
  direccion?: string;
  email: string;
  genero: string;
  idCliente?: string;
  nombre: string;
  nombreCliente?: DataCustomer | string | null;
  notas?: string;
  password?: string;
  confirmPassword?: string;
  puesto: string;
  telMovil?: string;
  telOficina?: string;
  whatsapp?: string;
  __v?: number;
  _id: string;
}

interface HelpersProps {
  setOpenDrawer: (value: boolean) => void;
}

export const useHelpers = ({ setOpenDrawer }: HelpersProps) => {
  const { user } = useAuth();
  const { modalInformation, modalSuccess } = useModalConfirmation();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const [userClientsData, setUserClientsData] = useState<
    dataUserClient['data']
  >([]);
  const [customersData, setCustomersTable] = useState<
    PaylaodCustomers['data'][]
  >([]);
  const [dataEdit, setDataEdit] = useState<ValuesForm | null>(null);
  const requiredValue: string = 'Este campo es obligatorio.';
  const noMatchPassword = 'No coinciden las contraseñas.';

  useEffect(() => {
    if (dataEdit !== null) {
      const filterCustomerName = customersData.filter(
        (item) => item._id === dataEdit.nombreCliente
      )[0];
      setOpenDrawer(true);
      formik.setValues({
        direccion: dataEdit ? dataEdit.direccion : '',
        email: dataEdit ? dataEdit.email : '',
        genero: dataEdit ? dataEdit.genero : '',
        idCliente: dataEdit ? dataEdit.idCliente : '',
        nombre: dataEdit ? dataEdit.nombre : '',
        nombreCliente:
          dataEdit && dataEdit.nombreCliente ? filterCustomerName : null,
        notas: dataEdit ? dataEdit.notas : '',
        password: dataEdit ? dataEdit.password : '',
        puesto: dataEdit ? dataEdit.puesto : '',
        telMovil: dataEdit ? dataEdit.telMovil : '',
        telOficina: dataEdit ? dataEdit.telOficina : '',
        whatsapp: dataEdit ? dataEdit.whatsapp : '',
        _id: dataEdit ? dataEdit._id : '',
        __v: dataEdit ? dataEdit.__v : 0,
      });
    }
  }, [dataEdit]);

  console.log('dataEdit', dataEdit);

  const _getCustomers = useApi({
    endpoint: '/clientes',
    method: 'get',
  });

  const _getUserClients = useApi({
    endpoint: '/userClient',
    method: 'get',
  });

  const _createClient = useApi({
    endpoint: '/userClient',
    method: 'post',
  });

  const _updateClient = useApi({
    endpoint: '/userClient',
    method: 'put',
  });

  useEffect(() => {
    handleShowLoader(true);
    hanldeGetUserClients();
    handleGetCustomers();
  }, []);

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

  const hanldeGetUserClients = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseUserClient = await _getUserClients();
      const code: Response['code'] = response.code;
      const dataResponse: dataUserClient['data'] = payload.data;

      if (code === 200) {
        console.log('RES', dataResponse);
        setUserClientsData(dataResponse);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const initialValues: ValuesForm = {
    direccion: '',
    email: '',
    genero: '',
    idCliente: '',
    nombre: '',
    nombreCliente: null,
    notas: '',
    password: '',
    confirmPassword: '',
    puesto: '',
    telMovil: '',
    telOficina: '',
    whatsapp: '',
    _id: '',
    __v: 0,
  };

  const validationSchema = Yup.object().shape({
    nombreCliente: Yup.object()
      .nullable()
      .required('Este campo es obligatorio.'),
    nombre: Yup.string().required('Este campo es obligatorio.'),
    genero: Yup.string().required('Este campo es obligatorio.'),
    puesto: Yup.string(),
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
    email: Yup.string()
      .email('Escriba un email válido')
      .required('Este campo es obligatorio'),
    telOficina: Yup.string().matches(/^[0-9]+$/, 'Ingrese un número válido'),
    telMovil: Yup.string().matches(/^[0-9]+$/, 'Ingrese un número válido'),
    whatsapp: Yup.string().matches(/^[0-9]+$/, 'Ingrese un número válido'),
    direccion: Yup.string(),
    notas: Yup.string(),
  });

  const validationSchemaDataEdit = Yup.object().shape({
    nombreCliente: Yup.object()
      .nullable()
      .required('Este campo es obligatorio.'),
    nombre: Yup.string().required('Este campo es obligatorio.'),
    genero: Yup.string().required('Este campo es obligatorio.'),
    puesto: Yup.string(),
    email: Yup.string()
      .email('Escriba un email válido')
      .required('Este campo es obligatorio'),
    telOficina: Yup.string().matches(/^[0-9]+$/, 'Ingrese un número válido'),
    telMovil: Yup.string().matches(/^[0-9]+$/, 'Ingrese un número válido'),
    whatsapp: Yup.string().matches(/^[0-9]+$/, 'Ingrese un número válido'),
    direccion: Yup.string(),
    notas: Yup.string(),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:
      dataEdit !== null ? validationSchemaDataEdit : validationSchema,
    onSubmit: async (values: ValuesForm) => {
      console.log('VALUES', values);
      if (dataEdit !== null) {
        console.log('???', values.nombreCliente);
        const newDataEdit = {
          idCliente: user?.id,
          nombreCliente:
            typeof values?.nombreCliente === 'string'
              ? ''
              : values?.nombreCliente?._id,
          nombre: values.nombre,
          genero: values.genero,
          puesto: values.puesto,
          email: values.email,
          telOficina: values.telOficina,
          telMovil: values.telMovil,
          whatsapp: values.whatsapp,
          direccion: values.direccion,
          notas: values.notas,
        };
        const response: ResponseUserClient = await _updateClient({
          urlParam: values._id,
          body: newDataEdit,
        });
        const code: Response['code'] = response.response.code;
        const message: Response['message'] = response.response.message;
        if (code === 200) {
          setOpenDrawer(false);
          modalSuccess({ message });
          hanldeGetUserClients();
        } else {
          modalInformation({ message });
        }
      } else {
        const newData = {
          idCliente: user?.id,
          nombreCliente: get(values, 'nombreCliente._id', ''),
          nombre: values.nombre,
          genero: values.genero,
          puesto: values.puesto,
          password: values.password,
          email: values.email,
          telOficina: values.telOficina,
          telMovil: values.telMovil,
          whatsapp: values.whatsapp,
          direccion: values.direccion,
          notas: values.notas,
        };
        const response: ResponseUserClient = await _createClient({
          body: newData,
        });
        const code: Response['code'] = response.response.code;
        const message: Response['message'] = response.response.message;

        if (code === 200) {
          modalSuccess({ message });
          hanldeGetUserClients();
          setOpenDrawer(false);
          formik.resetForm();
        } else {
          modalInformation({ message });
        }
      }
    },
  });

  return {
    formik,
    dataEdit,
    userClientsData,
    customersData,
    hanldeGetUserClients,
    setDataEdit,
  };
};
