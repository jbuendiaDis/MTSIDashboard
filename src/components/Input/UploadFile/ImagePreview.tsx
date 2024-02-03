import { Close } from '@mui/icons-material';
import { Avatar, Grid, IconButton, Theme, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { hexToRgba } from '../../../utils/colors';
import { ImagePreviewProps } from './types';

const ImagePreview = ({ src, onRemove, index }: ImagePreviewProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
  }, []);

  const handleRemove = () => {
    setVisible(false);
    setTimeout(() => onRemove());
  };

  const styles = {
    container: {
      position: 'relative',
      transition: (theme: Theme) =>
        theme.transitions.create(['opacity', 'marginRight']),
      opacity: 0,
      marginRight: 0,
      '&.visible': {
        opacity: 1,
        marginRight: 0.5,
      },
    },
    avatar: {
      transition: (theme: Theme) => theme.transitions.create('width'),
      height: 90,
      width: 0,
      '&.visible': {
        width: 90,
      },
    },
    removeButton: {
      position: 'absolute',
      zIndex: 1,
      right: 9,
      top: 9 - 0.5,
      width: 15,
      height: 15,
      backgroundColor: (theme: Theme) => theme.palette.grey.A200,
    },

    uploadImageButton: {
      backgroundColor: (theme: Theme) =>
        hexToRgba(theme.palette.text.primary, 0.07),
      borderRadius: (theme: Theme) => theme.shape.borderRadius,
      boxShadow: (theme: Theme) => theme.shadows[3],
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 90,
      minWidth: 90,
      height: 90,
      minHeight: 90,
      cursor: 'pointer',
      position: 'relative',
      transition: (theme: Theme) =>
        theme.transitions.create('background-color'),
      '&:hover': {
        '& $uploadIcon': {
          transform: 'translateY(-8px)',
        },
        '& $uploadText': {
          opacity: 1,
          marginBottom: -12,
        },
      },
      '&.disabled': {
        cursor: 'auto',
        backgroundColor: (theme: Theme) =>
          hexToRgba(theme.palette.text.primary, 0.05),
        '& $uploadMoreIcon': {
          color: (theme: Theme) => hexToRgba(theme.palette.text.primary, 0.5),
        },
      },
    },

    uploadIcon: {
      fontSize: 45,
      transition: (theme: Theme) => theme.transitions.create('transform'),
    },
  };

  return (
    <Grid
      component="div"
      key={`imagepicker-imagepreview-${index}-${src}`}
      sx={styles.container}
      className={visible ? 'visible' : undefined}
    >
      <Avatar
        src={src}
        alt={`file-preview-${index}`}
        sx={styles.avatar}
        className={`${visible && 'visible'}`}
        variant="rounded"
      />
      <Tooltip title="Quitar">
        <IconButton onClick={handleRemove} sx={styles.removeButton}>
          <Close sx={{ fontSize: 13 }} />
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export default ImagePreview;
