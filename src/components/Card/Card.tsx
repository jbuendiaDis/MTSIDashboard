import {
  DeleteOutlineOutlined,
  ExpandMoreOutlined,
  ModeEditOutlineOutlined,
  MoreVert,
} from '@mui/icons-material';
import {
  Avatar,
  Grid,
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
  CardHeader,
  CardContent,
  CardActions,
  styled,
  Collapse,
} from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const Card = ({
  data,
  hanldeGetUserClients,
  setOpenDrawer,
  setDataEdit,
}: CardProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
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

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <>
      <MuiCard sx={{ borderRadius: '10px' }}>
        <CardHeader
          avatar={<Avatar>{data.nombre?.charAt(0).toUpperCase()}</Avatar>}
          action={
            <Tooltip title="Acciones">
              <IconButton
                onClick={(event: any) => setOpen(event.currentTarget)}
              >
                <MoreVert />
              </IconButton>
            </Tooltip>
          }
          title={data.nombre}
          subheader={data.puesto}
        />
        <CardContent>
          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex' }}>
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                Género:
              </Typography>
              &nbsp;
              <Typography sx={{ fontSize: '14px' }}>{data.genero}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex' }}>
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                Dirección:
              </Typography>
              &nbsp;
              <Typography sx={{ fontSize: '14px' }}>
                {data.direccion}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex' }}>
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                Cliente:
              </Typography>
              &nbsp;
              <Typography sx={{ fontSize: '14px' }}>
                {data.nombreCliente}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Grid container>
            <Grid item xs={12}>
              <Typography
                sx={{
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
        </CardContent>
        <CardActions>
          {data.notas !== '' && (
            <ExpandMore
              expand={expanded}
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreOutlined />
            </ExpandMore>
          )}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              sx={{
                mb: 1,
                fontSize: '15px',
                color: (theme: Theme) => theme.palette.grey[500],
              }}
            >
              Notas:
            </Typography>
            {data.notas}
          </CardContent>
        </Collapse>
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
