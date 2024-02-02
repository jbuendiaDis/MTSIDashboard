import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  DataUsers,
  FormCreateUserValues,
  PaylaodUsers,
  Payload,
} from './types';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { Response } from '../../models/responseApi';
import { useApi } from '../../hooks/useApi';
import { get } from 'lodash';
import { useState } from 'react';
import { useLoader } from '../../components/Loader';
import { LoaderContextType } from '../../models';
import { convertFileToBase64 } from '../../utils/fileUtils';

interface SignatureItem {
  url: string;
  file: File;
  base64?: string;
}

interface FormDataWithBase64 {
  _id: string;
  name: string;
  lastname: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  position: string;
  signature: string;
}

interface HelpersProps {
  setOpenDrawer: (value: boolean) => void;
}

export const useHelpers = ({ setOpenDrawer }: HelpersProps) => {
  const [usersTable, setUsersTable] = useState<PaylaodUsers['data'][]>([]);
  const [idUserEdit, setIdUserEdit] = useState<any>('');
  const { modalSuccess, modalInformation } = useModalConfirmation();
  const { handleShowLoader }: LoaderContextType = useLoader();
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

  const _getUserById = useApi({
    endpoint: '/users',
    method: 'get',
  });

  const _updateUser = useApi({
    endpoint: '/users',
    method: 'put',
  });

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

  const handleUpdateUser = async (data: DataUsers): Promise<boolean> => {
    try {
      const { response, payload }: Payload = await _getUserById({
        urlParam: data._id,
      });
      const code: Response['code'] = response.code;
      const dataResponse: Omit<
        FormCreateUserValues,
        'password' | 'confirmPassword'
      > = payload.data;

      if (code === 200) {
        console.log('Response', dataResponse);
        formik.setValues({
          _id: dataResponse ? dataResponse._id : '',
          name: dataResponse ? dataResponse?.name : '',
          lastname: dataResponse ? dataResponse?.lastname : '',
          age: dataResponse ? dataResponse?.age : '',
          password: '',
          confirmPassword: '',
          email: dataResponse ? dataResponse?.email : '',
          position: dataResponse ? dataResponse?.position : '',
          signature: dataResponse ? dataResponse?.signature : [],
        });
        setOpenDrawer(true);
        setIdUserEdit(dataResponse._id);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const initialValues: FormCreateUserValues = {
    _id: '',
    name: '',
    lastname: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    position: '',
    signature: [],
  };

  const validationSchema = Yup.object().shape({
    _id: Yup.string(),
    name: Yup.string().required(requiredValue),
    lastname: Yup.string().required(requiredValue),
    age: Yup.string(),
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
    signature: Yup.array()
      .of(Yup.object({ url: Yup.string() }))
      .nullable()
      .min(1, requiredValue)
      .required(requiredValue),
  });

  const validationWithIdUser = Yup.object().shape({
    _id: Yup.string(),
    name: Yup.string().required(requiredValue),
    lastname: Yup.string().required(requiredValue),
    age: Yup.string(),
    email: Yup.string()
      .email('Ingrese un email válido.')
      .required(requiredValue),
    position: Yup.string().required(requiredValue),
    signature: Yup.array()
      .of(Yup.object({ url: Yup.string() }))
      .nullable()
      .min(1, requiredValue)
      .required(requiredValue),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:
      idUserEdit !== '' ? validationWithIdUser : validationSchema,
    onSubmit: async (values: FormCreateUserValues): Promise<boolean> => {
      try {
        console.log('VALUES', values);
        const convertedSignature = await Promise.all(
          values.signature.map(async (signatureItem: SignatureItem) => {
            const base64 = await convertFileToBase64(signatureItem.file);
            return { ...signatureItem, base64 };
          })
        );

        const formDataWithBase64: FormDataWithBase64 = {
          ...values,
          _id: values._id!,
          signature: convertedSignature[0].base64,
        };

        console.log('Formulario con imágenes en base64:', formDataWithBase64);

        if (idUserEdit !== '') {
          const editValues = {
            name: values.name,
            lastname: values.lastname,
            age: values.age,
            email: values.email,
            signature: values.signature,
          };

          const response: DataUsers = await _updateUser({
            urlParam: `${values._id}`,
            body: editValues,
          });

          const message = `El usuario ${response.name} ${response.lastname} se ha editado correctamente`;

          if (response) {
            handleGetUsers();
            setOpenDrawer(false);
            modalSuccess({ message });
          }
        } else {
          const createValues: Omit<
            FormDataWithBase64,
            'confirmPassword' | '_id'
          > = {
            name: formDataWithBase64.name,
            lastname: formDataWithBase64.lastname,
            age: formDataWithBase64.age,
            email: formDataWithBase64.email,
            password: formDataWithBase64.password,
            position: formDataWithBase64.position,
            signature: formDataWithBase64.signature,
          };

          const { response }: Payload = await _createUsers({
            body: createValues,
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
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  });

  return {
    formik,
    usersTable,
    idUserEdit,
    handleGetUsers,
    handleUpdateUser,
    setIdUserEdit,
  };
};
