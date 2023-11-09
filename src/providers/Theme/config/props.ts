export const getProps = (theme: any) => ({
  MuiBreadcrumbs: {
    expandText: 'Mostrar ruta',
  },
  MuiTablePagination: {
    backIconButtonText: 'Página anterior',
    labelRowsPerPage: 'Filas por página:',
    nextIconButtonText: 'Siguiente página',
  },
  MuiRating: {
    emptyLabelText: 'Vacío',
  },
  MuiAutocomplete: {
    clearText: 'Limpiar',
    closeText: 'Cerrar',
    loadingText: 'Cargando…',
    noOptionsText: 'Sin opciones',
    openText: 'Abierto',
  },
  MuiAlert: {
    closeText: 'Cerrar',
  },
  MuiPagination: {
    'aria-label': 'Paginador',
  },
  MuiPopover: {
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    transformOrigin: { vertical: 'top', horizontal: 'right' },
  },
  MuiMenu: {
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    transformOrigin: { vertical: 'top', horizontal: 'right' },
  },
  MuiButton: {
    variant: 'contained',
  },
  MuiTextField: {
    variant: 'outlined',
  },
  MuiAppBar: {
    color: 'default',
  },
  MuiSwitch: {
    color: 'primary',
  },
  MuiContainer: {
    maxWidth: theme.stretch ? false : 'lg',
  },
  MuiDrawer: {
    ModalProps: {
      keepMounted: true,
    },
  },
  MuiListItemText: {
    primaryTypographyProps: {
      variant: 'body2',
      color: 'textSecondary',
    },
  },
});
