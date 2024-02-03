import { Fragment } from 'react';
import { Theme, Tooltip, Typography, Box } from '@mui/material';
import { Upload, AddCircleOutline, Replay } from '@mui/icons-material';
import ImagePreview from './ImagePreview';
import { hexToRgba } from '../../../utils/colors';
import { UploadFileProps } from './types';

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const UploadFile: React.FC<UploadFileProps> = ({
  onChange,
  values = [],
  multiple = true,
  max = 10,
  label,
  name,
  error,
  helperText,
  helperTextProps,
}) => {
  const styles = {
    container: {
      display: 'flex',
      overflowX: 'auto',
      paddingTop: 0.5,
      paddingBottom: 1,
    },

    uploadImageButton: {
      backgroundColor: (theme: Theme) =>
        hexToRgba(theme.palette.text.primary, 0.07),
      borderRadius: '10px',
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
      color: (theme: Theme) => theme.palette.primary.main,
    },

    uploadText: {
      fontSize: '0.7rem',
      position: 'absolute',
      bottom: '15px',
      opacity: 0,
      transition: (theme: Theme) =>
        theme.transitions.create(['margin-bottom', 'opacity']),
      color: (theme: Theme) => theme.palette.primary.main,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '95%',
      '&:hover': {
        opacity: 1,
      },
    },

    uploadMoreIcon: {
      fontSize: 35,
      transition: (theme: Theme) => theme.transitions.create('color'),
      cursor: 'pointer',
    },
  };

  const handleUploadImage = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length) {
      if (multiple) {
        onChange([
          ...values,
          ...[...files]
            .filter((file) => allowedTypes.includes(file.type))
            .map((file) => ({ url: URL.createObjectURL(file), file })),
        ]);
      } else {
        if (files.length === 1) {
          onChange([{ url: URL.createObjectURL(files[0]), file: files[0] }]);
        } else {
          console.error('Solo se permite cargar un archivo.');
        }
      }
    }
  };

  return (
    <>
      <Box sx={styles.container}>
        {!values.length ? (
          <Typography
            component="label"
            htmlFor="fileInput"
            sx={styles.uploadImageButton}
            className="ImagePicker-uploadImageButton"
          >
            <Upload sx={styles.uploadIcon} classes="ImagePicker-uploadIcon" />
            <Typography
              variant="caption"
              sx={styles.uploadText}
              className="ImagePicker-uploadText"
            >
              {label}
            </Typography>
          </Typography>
        ) : (
          <Fragment key="image-previews">
            {values.map((value: any, index: number) => (
              <ImagePreview
                key={`imagepicker-image-${index}-${value.url}`}
                index={index}
                src={value.url}
                onRemove={() =>
                  onChange(
                    values.filter(
                      (_: any, index_: number) => !(index === index_)
                    )
                  )
                }
              />
            ))}
            <Typography
              component="label"
              key={`imagepicker-upload-button`}
              htmlFor="fileInput"
              sx={{
                ...styles.uploadImageButton,
                ...(values.length >= max && {
                  opacity: 0.5,
                  pointerEvents: 'none',
                }),
              }}
            >
              <Tooltip title={multiple ? 'Subir Imagen' : 'Remplazar Imagen'}>
                {multiple ? (
                  <AddCircleOutline
                    sx={styles.uploadMoreIcon}
                    classes="ImagePicker-uploadMoreIcon"
                  />
                ) : (
                  <Replay
                    sx={styles.uploadMoreIcon}
                    className="ImagePicker-uploadMoreIcon"
                  />
                )}
              </Tooltip>
            </Typography>
          </Fragment>
        )}

        <Box
          component="input"
          name={name}
          accept={allowedTypes.join(', ')}
          onChange={handleUploadImage}
          type="file"
          multiple
          id="fileInput"
          sx={{ display: 'none' }}
          disabled={values.length >= max}
        />
      </Box>
      {helperText && (
        <Typography
          variant="caption"
          color={error ? 'error' : 'textSecondary'}
          {...helperTextProps}
        >
          {helperText}
        </Typography>
      )}
    </>
  );
};

export default UploadFile;
