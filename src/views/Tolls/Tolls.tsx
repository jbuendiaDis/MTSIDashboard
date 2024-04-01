import { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import {
  Autocomplete,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  // DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from '@mui/icons-material';
import { useHelpers } from './helpers';
import {
  Column,
  CountriesData,
  DataCatalogs,
  FormatDataState,
  LoaderContextType,
} from '../../models';
import { useModal } from '../../components/Modal';
import { Formik } from 'formik';
// import { DataToll } from './types';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { useLoader } from '../../components/Loader';
import { HeaderTitleModal } from '../../components/Modal/HeaderTitleModal';
import { FormTolls } from './FormTolls';
// import { formatToCurrency } from '../../utils/amountFormater';
// import { format, parseISO } from 'date-fns';

const Tolls = () => {
  const [valueState, setValueState] = useState<FormatDataState | null>(null);
  const [valueUnitType, setValueUnitType] = useState<DataCatalogs | null>(null);
  const [countriesByStateData, setCountriesByStateData] = useState<
    CountriesData[]
  >([]);
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { handleOpenModal, handleCloseModal } = useModal();
  const { actionsState, actionsCountries, actionsCatalogs }: any =
    useRootProvider();
  const { states, handleGetStates } = actionsState;
  const {
    // countriesByStateUnitTypeOrigin,
    countriesByStateUnitType,
    // handleGetCountriesByStateUnitTypeOrigin,

    handleGetCountriesByStateUnitType,
    handleResetCountriesByStateUnitTypeOrigin,
  } = actionsCountries;
  const { catalogs, handleGetCatalogs, handleGetUnitType, unitTypes } =
    actionsCatalogs;
  const {
    dataEdit,
    initialValues,
    validationSchema,
    handleSubmit,
    handleGetToll,
    setDataEdit,
    setDataTemp,
  } = useHelpers({
    unitTypes,
    setValueState,
    setValueUnitType,
    valueUnitType,
    valueState,
  });

  useEffect(() => {
    handleShowLoader(true);
    handleGetStates();
    handleGetCatalogs();
    setDataEdit(null);
    setDataTemp(null);
    setValueState(null);
    setValueUnitType(null);
    setCountriesByStateData([]);
    handleResetCountriesByStateUnitTypeOrigin();
  }, []);

  useEffect(() => {
    if (catalogs.length > 0) handleGetUnitType(catalogs[2]?._id);
  }, [catalogs]);

  useEffect(() => {
    if (dataEdit) handleModal();
  }, [dataEdit]);

  useEffect(() => {
    if (valueState && valueUnitType) {
      handleResetCountriesByStateUnitTypeOrigin();
      // handleGetCountriesByStateUnitTypeOrigin(
      //   valueState.codigo,
      //   valueUnitType.descripcion
      // );
      handleGetCountriesByStateUnitType(
        valueState.codigo,
        valueUnitType.descripcion
      );
    }
  }, [valueState, valueUnitType]);

  useEffect(() => {
    if (countriesByStateUnitType?.length > 0)
      setCountriesByStateData(countriesByStateUnitType);
    else setCountriesByStateData([]);
  }, [countriesByStateUnitType]);

  const columns: Column[] = [
    { id: 'nombre', label: 'Nombre Caseta/Peaje', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData) => handleGetToll(rowData),
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
      <Grid sx={{ pr: 4, pl: 4 }}>
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
          {/* <Grid>
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={() => {
              handleModal();
              setDataEdit(null);
            }}
            startIcon={<Add />}
          >
            Agregar Peaje
            </Button>
        </Grid> */}
        </Grid>
        <Grid sx={{ mt: 3 }}>
          <Typography
            sx={{
              mb: 2,
              fontWeight: 500,
              fontSize: '15px',
            }}
          >
            Elija un tipo de unidad y estado para visualizar la información de
            las casetas en la tabla.
          </Typography>
        </Grid>
        <Stack spacing={2} direction="row">
          <Autocomplete
            value={valueUnitType}
            onChange={(_event: any, newValue: DataCatalogs | null) => {
              setValueUnitType(newValue);
            }}
            getOptionLabel={(option: any) => option.descripcion}
            options={unitTypes}
            sx={{ width: '320px' }}
            renderInput={(params) => (
              <TextField {...params} label="Seleccione un tipo de unidad" />
            )}
          />
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
        </Stack>
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
