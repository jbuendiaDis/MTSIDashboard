/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add,
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from '@mui/icons-material';
import { useHelpers } from './helpers';
import {
  Column,
  CountriesData,
  FormatDataState,
  LoaderContextType,
} from '../../models';
import { useModal } from '../../components/Modal';
import { Formik } from 'formik';
import { DataToll } from './types';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { useLoader } from '../../components/Loader';
import { Helmet } from 'react-helmet-async';
import { HeaderTitleModal } from '../../components/Modal/HeaderTitleModal';
import { FormTolls } from './FormTolls';
import { formatToCurrency } from '../../utils/amountFormater';
import { format, parseISO } from 'date-fns';

const Tolls = () => {
  const [valueState, setValueState] = useState<FormatDataState | null>(null);
  const [countriesByStateData, setCountriesByStateData] = useState<
    CountriesData[]
  >([]);
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { handleOpenModal, handleCloseModal } = useModal();
  const { actionsState, actionsCountries, actionsCatalogs }: any =
    useRootProvider();
  const { states, handleGetStates } = actionsState;
  const {
    countriesByState,
    handleGetCountrie,
    handleResetCountriesByStateUnitType,
    handleResetCountriesByState,
  } = actionsCountries;
  const { catalogs, handleGetCatalogs, handleGetUnitType, unitTypes } =
    actionsCatalogs;
  const {
    dataEdit,
    initialValues,
    validationSchema,
    handleSubmit,
    handleOpenModalDelete,
    handleGetToll,
    setDataEdit,
    setDataTemp,
  } = useHelpers({ valueState, setValueState });

  useEffect(() => {
    handleResetCountriesByStateUnitType();
    handleShowLoader(true);
    handleGetStates();
    handleGetCatalogs();
    setDataEdit(null);
    setDataTemp(null);
  }, []);

  useEffect(() => {
    if (catalogs.length > 0) handleGetUnitType(catalogs[2]?._id);
  }, [catalogs]);

  useEffect(() => {
    if (dataEdit) handleModal();
  }, [dataEdit]);

  useEffect(() => {
    if (valueState) {
      handleResetCountriesByState();
      handleGetCountrie(valueState.codigo);
    }
  }, [valueState]);

  useEffect(() => {
    if (countriesByState?.length > 0) {
      console.log('YES');
      const formatData: CountriesData[] = countriesByState.map((item: any) => {
        const costoNumber =
          typeof item.costo === 'number'
            ? item.costo
            : parseFloat(item.costo || '0');

        return {
          ...item,
          costo: item.costo
            ? formatToCurrency(costoNumber)
            : formatToCurrency(0),
          fechaCreacion:
            typeof item.fechaCreacion === 'string'
              ? format(parseISO(item.fechaCreacion), 'dd/MM/yyyy')
              : format(item.fechaCreacion, 'dd/MM/yyyy'),
        };
      });

      setCountriesByStateData(formatData);
    }
  }, [countriesByState]);

  const columns: Column[] = [
    { id: 'estadoNombre', label: 'Estado', align: 'left' },
    { id: 'nombre', label: 'Nombre Caseta/Peaje', align: 'left' },
    { id: 'tipoUnidad', label: 'Tipo de Unidad', align: 'left' },
    { id: 'costo', label: 'Costo', align: 'left' },
    { id: 'fechaCreacion', label: 'Fecha de creación', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: DataToll) => handleGetToll(rowData),
        },
        {
          label: 'Eliminar',
          icon: (
            <DeleteOutlineOutlined
              sx={{ width: 20, height: 20, color: 'red' }}
            />
          ),
          onClick: (rowData: DataToll) => handleOpenModalDelete(rowData),
        },
      ],
    },
  ];

  const handleToggleModal = (): void => {
    handleCloseModal();
    setDataEdit(null);
  };

  const handleModal = () => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'xs',
      title: (
        <HeaderTitleModal
          handleToggleModal={handleToggleModal}
          title={dataEdit ? 'EDITAR PEAJE' : 'CREAR PEAJE'}
        />
      ),
      body: (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormTolls
            handleToggleModal={handleToggleModal}
            unitTypes={unitTypes}
            states={states}
            dataEdit={dataEdit}
          />
        </Formik>
      ),
    });
  };

  return (
    <>
      <Helmet>
        <title>MTSI | Peajes</title>
      </Helmet>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Grid>
          <Typography variant="h4" sx={{ letterSpacing: '1px' }}>
            Peajes
          </Typography>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={() => {
              handleModal();
              setDataEdit(null);
            }}
            startIcon={<Add />}
            // disabled={countriesByState?.length > 0 ? false : true}
          >
            Agregar Peaje
          </Button>
        </Grid>
      </Grid>
      <Grid sx={{ mt: 3 }}>
        <Typography
          sx={{
            mb: 2,
            fontWeight: 500,
            fontSize: '15px',
          }}
        >
          Elija un estado para visualizar la información de las casetas en la
          tabla.
        </Typography>
        <Autocomplete
          value={valueState}
          onChange={(_event: any, newValue: FormatDataState | null) => {
            setValueState(newValue);
          }}
          options={states}
          sx={{ width: '320px' }}
          renderInput={(params) => (
            <TextField {...params} label="Seleccione un estado" />
          )}
        />
      </Grid>
      <Table
        tableHead
        showCheckboxes={false}
        columns={columns}
        data={countriesByStateData}
      />
    </>
  );
};

export { Tolls };
