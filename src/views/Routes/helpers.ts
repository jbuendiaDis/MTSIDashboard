import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, Response } from '../../models';
import {
  DataTolls,
  FormValues,
  Options,
  ResponseTolls,
  ResponseUnidades,
  TableDots,
} from './types';
import {
  formatToCurrency,
  parseCurrencyStringToNumber,
} from '../../utils/amountFormater';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { get } from 'lodash';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';

interface HelpersProps {
  setOpen: (value: boolean) => void;
}

export const useHelpers = ({ setOpen }: HelpersProps) => {
  const [pagoCasetas, setPagoCasetas] = useState<any>(null);
  const [stateCaseta, setStateCaseta] = useState<any>(null);
  const [nombreCaseta, setNombreCaseta] = useState<any>(null);
  const [tollsData, setTollsData] = useState<DataTolls[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [dataTemp, setDataTemp] = useState<any | null>(null);
  const [dataDotsTable, setDataDotsTable] = useState<any[]>([]);
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalSuccess, modalInformation } = useModalConfirmation();
  const { actionsCountries, actionsState }: any = useRootProvider();
  const {
    countriesByStateUnitTypeOrigin,
    countriesByStateUnitTypeDestination,
    handleResetCountriesByStateUnitType,
    handleGetCountriesByStateUnitTypeOrigin,
    handleGetCountriesByStateUnitTypeDestination,
  } = actionsCountries;
  const { states } = actionsState;

  const requiredField: string = 'Este campo es obligatorio.';

  const _getTolls = useApi({
    endpoint: '/peajes',
    method: 'get',
  });

  const _getTollById = useApi({
    endpoint: '/peajes',
    method: 'get',
  });

  const _createToll = useApi({
    endpoint: '/peajes',
    method: 'post',
  });

  const _updateToll = useApi({
    endpoint: '/peajes',
    method: 'put',
  });

  // const _deleteToll = useApi({
  //   endpoint: '/peajes',
  //   method: 'delete',
  // });

  useEffect(() => {
    handleShowLoader(true);
    handleGetTolls();
  }, []);

  useEffect(() => {
    if (
      dataTemp !== null &&
      countriesByStateUnitTypeOrigin?.length > 0 &&
      countriesByStateUnitTypeDestination?.length > 0
    ) {
      const filterStateOrigin = states.find(
        (item: any) => item.codigo === dataTemp?.idEstadoOrigen
      );
      const filterStateDestination = states.find(
        (item: any) => item.codigo === dataTemp?.idEstadoDestino
      );
      const filterCountrieOrigin = countriesByStateUnitTypeOrigin.find(
        (item: any) => item._id === dataTemp.localidadOrigen
      );
      const filterCountrieDestination =
        countriesByStateUnitTypeDestination.find(
          (item: any) => item._id === dataTemp.localidadDestino
        );
      const formatDots = get(dataTemp, 'puntos', []).map((item: any) => {
        return {
          ...item,
          costo: formatToCurrency(item.costo),
        };
      });

      formik.setValues({
        stateOrigen: filterStateOrigin,
        stateDestino: filterStateDestination,
        localidadOrigen: filterCountrieOrigin,
        localidadDestino: filterCountrieDestination,
        kms: dataTemp.kms,
        tipoUnidad: dataTemp.tipoUnidad,
        _id: dataTemp._id,
      });
      setIsEditing(true);
      setDataDotsTable(formatDots);
      setOpen(true);
    }
  }, [
    dataTemp,
    countriesByStateUnitTypeOrigin,
    countriesByStateUnitTypeDestination,
  ]);

  const handleGetTolls = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTolls = await _getTolls();
      const code: Response['code'] = response.code;
      const dataResponse: DataTolls[] = payload.data;

      const formatData = dataResponse.map((item) => {
        const kilometers = `${item.kms} kms`;
        const totalCost = item.puntos.reduce((total, costTotal) => {
          return total + costTotal.costo;
        }, 0);

        return {
          ...item,
          totalKilometers: kilometers,
          costTotalPeajes: formatToCurrency(totalCost),
        };
      });

      if (code === 200) {
        handleShowLoader(false);
        setTollsData(formatData);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetToll = async (id: string): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTolls = await _getTollById({
        urlParam: id,
      });
      const code: Response['code'] = response.code;
      const dataResponse: DataTolls = Array.isArray(payload.data)
        ? payload.data[0]
        : payload.data;

      if (code === 200) {
        handleGetCountriesByStateUnitTypeOrigin(dataResponse.idEstadoOrigen);
        handleGetCountriesByStateUnitTypeDestination(
          dataResponse.idEstadoDestino
        );
        setDataTemp(dataResponse);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  // const handleOpenModalDelete = (data: DataTolls) => {
  //   const message: string = '¿Seguro que desea eliminar este dato';
  //   const dataValue = '';
  //   modalDelete({
  //     message,
  //     dataValue,
  //     callbackConfirm: () => handleDeleteToll(data._id),
  //   });
  // };

  // const handleDeleteToll = async (id: string): Promise<boolean> => {
  //   try {
  //     const response: ResponseTolls = await _deleteToll({
  //       urlParam: id,
  //     });
  //     const code: Response['code'] = response.response.code;
  //     const message: Response['message'] = response.response.message;

  //     if (code === 200) {
  //       modalSuccess({ message });
  //       handleGetTolls();
  //     } else {
  //       modalInformation({ message });
  //     }

  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  const handleAddDot = () => {
    const newDot: TableDots = {
      casetas: pagoCasetas,
      nombreCaseta: get(nombreCaseta, 'nombre', ''),
      costo: formatToCurrency(get(nombreCaseta, 'costo', 0)),
      _id: dataDotsTable.length + 1,
    };

    setDataDotsTable((prevDots) => [...prevDots, newDot]);
    setPagoCasetas(null);
    setStateCaseta(null);
    setNombreCaseta(null);
    handleResetCountriesByStateUnitType();
  };

  const handleRemoveDot = (id: number) => {
    setDataDotsTable((prevDots) => {
      const updatedDots = prevDots.filter((dot) => dot._id !== id);

      return updatedDots.map((dot, index) => ({
        ...dot,
        _id: (index + 1).toString(),
      }));
    });
  };

  const initialValues: FormValues = {
    tipoUnidad: '',
    localidadOrigen: null,
    localidadDestino: null,
    kms: '',
    stateOrigen: null,
    stateDestino: null,

    _id: '',
  };

  const validationSchema = Yup.object().shape({
    tipoUnidad: Yup.string().required(requiredField),
    localidadOrigen: Yup.object().nullable().required(requiredField),
    localidadDestino: Yup.object().nullable().required(requiredField),
    kms: Yup.number()
      .min(1, 'El kilometraje debe ser mayor a 0.')
      .required(requiredField),
    stateOrigen: Yup.object().nullable().required(requiredField),
    stateDestino: Yup.object().nullable().required(requiredField),

    pagoCasetas: Yup.string(),
    stateCaseta: Yup.object().nullable(),
    nombreCaseta: Yup.object().nullable(),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values: FormValues) => {
      try {
        const arrayDots: any[] = [];

        dataDotsTable.map((item: any) => {
          arrayDots.push({
            casetas: item.casetas,
            nombreCaseta: item.nombreCaseta,
            costo: parseCurrencyStringToNumber(item.costo),
          });
        });

        const newValues: any = {
          estadoOrigen: values.stateOrigen!.codigo,
          estadoDestino: values.stateDestino!.codigo,
          tipoUnidad: values.tipoUnidad,
          localidadOrigen: values.localidadOrigen?._id,
          localidadDestino: values.localidadDestino?._id,
          kms: values.kms,
          puntos: arrayDots,
          totalPeajes: arrayDots.reduce((total, costTotal) => {
            return total + costTotal.costo;
          }, 0),
        };

        if (isEditing) {
          const response: ResponseUnidades = await _updateToll({
            urlParam: formik.values._id,
            body: newValues,
          });
          const code: Response['code'] = get(response, 'response.code');
          const message: Response['message'] = get(
            response,
            'response.message',
            ''
          );

          if (code === 200) {
            setOpen(false);
            modalSuccess({ message });
            handleGetTolls();
            setDataTemp(null);
          } else {
            modalInformation({ message });
          }
        } else {
          const response: ResponseUnidades = await _createToll({
            body: newValues,
          });
          const code: Response['code'] = get(response, 'response.code');
          const message: Response['message'] = get(
            response,
            'response.message',
            ''
          );

          if (code === 200) {
            modalSuccess({ message });
            handleGetTolls();
            formik.resetForm();
            setOpen(false);
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

  const options: Options[] = [
    {
      label: 'VIAPASS',
      value: 'VIAPASS',
    },
    {
      label: 'EFEC',
      value: 'EFEC',
    },
  ];

  return {
    tollsData,
    formik,
    dataDotsTable,
    isEditing,
    options,
    pagoCasetas,
    stateCaseta,
    nombreCaseta,
    // handleOpenModalDelete,
    handleGetToll,
    handleAddDot,
    handleRemoveDot,
    setDataDotsTable,
    setIsEditing,
    setPagoCasetas,
    setStateCaseta,
    setNombreCaseta,
  };
};
