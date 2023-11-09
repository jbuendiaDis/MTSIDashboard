export const LoginStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 8,
  },
  contentForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 350,
    p: { xs: 2, md: 0 },
    // flexDirection: 'column',
    // width: 380,
  },
  form: {
    '& .MuiFormControl-root': {
      marginBottom: 2.5,
      borderRadius: 0.5,
      '& div:first-of-type': {
        borderRadius: 0.5,
      },
      '& p.Mui-error': {
        margin: 0,
        marginTop: 0.5,
      },
    },
  },
};
