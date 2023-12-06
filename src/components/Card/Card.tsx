import {
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
  MoreVert,
} from '@mui/icons-material';
import {
  Avatar,
  Grid,
  IconButton,
  Card as MuiCard,
  Theme,
  Typography,
  Popover,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Tooltip,
  Divider,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { useApi } from '../../hooks/useApi';
import {
  ResponseUserClient,
  dataUserClient,
} from '../../views/UserClients/types';
import { Response } from '../../models';

interface CardProps {
  data: any;
  hanldeGetUserClients: () => void;
  setOpenDrawer: (value: boolean) => void;
  setDataEdit: (data: any) => void;
}

const Card = ({
  data,
  hanldeGetUserClients,
  setOpenDrawer,
  setDataEdit,
}: CardProps) => {
  const [open, setOpen] = useState<null>(null);
  const { modalDelete, modalSuccess, modalInformation } =
    useModalConfirmation();

  const _deleteClient = useApi({
    endpoint: '/userClient',
    method: 'delete',
  });

  const _getClientById = useApi({
    endpoint: '/userClient',
    method: 'put',
  });

  const handleOpenDeleteModal = (data: any) => {
    console.log('data', data);
    const message: string = '¿Seguro que desea eliminar este cliente:';
    const dataValue = `${data.nombreCliente}`;
    modalDelete({
      message,
      dataValue,
      callbackConfirm: () => handleDeleteClient(data._id),
    });
  };

  const handleDeleteClient = async (id: string): Promise<boolean> => {
    try {
      const response: ResponseUserClient = await _deleteClient({
        urlParam: id,
      });
      const code: Response['code'] = response.response.code;
      const message: Response['message'] = response.response.message;

      if (code === 200) {
        modalSuccess({ message });
        hanldeGetUserClients();
        setOpenDrawer(false);
      } else {
        modalInformation({ message });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetClient = async (id: string): Promise<boolean> => {
    try {
      setOpen(null);
      const { payload, response }: ResponseUserClient = await _getClientById({
        urlParam: id,
      });
      const code: Response['code'] = response.code;
      const dataResponseEdit: dataUserClient['data'] = payload.data;

      if (code === 200) {
        setDataEdit(dataResponseEdit);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <MuiCard sx={{ p: 2, borderRadius: '10px' }}>
        <Grid container>
          <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar>{data.nombre?.charAt(0).toUpperCase()}</Avatar>
          </Grid>
          <Grid item xs={2} sx={{}}>
            <Tooltip title="Acciones">
              <IconButton
                onClick={(event: any) => setOpen(event.currentTarget)}
              >
                <MoreVert />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Typography
          sx={{
            mt: 2,
            mb: 1,
            fontSize: '15px',
            color: (theme: Theme) => theme.palette.grey[500],
          }}
        >
          Información General:
        </Typography>
        <Grid container>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
              Nombre:
            </Typography>
            &nbsp;
            <Typography sx={{ fontSize: '14px' }}>{data.nombre}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
              Género:
            </Typography>
            &nbsp;
            <Typography sx={{ fontSize: '14px' }}>{data.genero}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
              Puesto:
            </Typography>
            &nbsp;
            <Typography sx={{ fontSize: '14px' }}>{data.puesto}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
              Dirección:
            </Typography>
            &nbsp;
            <Typography sx={{ fontSize: '14px' }}>{data.direccion}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 2 }} />

        <Grid container>
          <Grid item xs={12}>
            <Typography
              sx={{
                mt: 2,
                mb: 1,
                fontSize: '15px',
                color: (theme: Theme) => theme.palette.grey[500],
              }}
            >
              Medios de contacto:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row">
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                Tel Movil:
              </Typography>
              <Typography sx={{ fontSize: '14px' }}>
                {data.telMovil ? data.telMovil : '-'}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row">
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                Tel Oficina:
              </Typography>
              <Typography sx={{ fontSize: '14px' }}>
                {data.telOficina ? data.telOficina : '-'}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row">
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                WhatsApp:
              </Typography>
              <Typography sx={{ fontSize: '14px' }}>
                {data.whatsapp ? data.whatsapp : '-'}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row">
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                Email:
              </Typography>
              <Typography sx={{ fontSize: '14px' }}>
                {data.email ? data.email : '-'}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </MuiCard>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={() => setOpen(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
          },
        }}
      >
        <List>
          <ListItemButton onClick={() => handleGetClient(data._id)}>
            <ListItemIcon>
              <ModeEditOutlineOutlined />
            </ListItemIcon>
            <ListItemText primary="Editar" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              handleOpenDeleteModal(data);
              setOpen(null);
            }}
          >
            <ListItemIcon>
              <DeleteOutlineOutlined sx={{ color: 'red' }} />
            </ListItemIcon>
            <ListItemText primary="Eliminar" sx={{ color: 'red' }} />
          </ListItemButton>
        </List>
      </Popover>
    </>
  );
};

export { Card };
