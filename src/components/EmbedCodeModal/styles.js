export default theme => ({
  formControl: {
    fontSize: 12
  },
  formControlLabel: {
    fontSize: 12
  },
  MuiFormLabelRoot: {
    fontSize: 13
  },
  mainForm: {
    marginTop: 8
  },
  root: {
    '& .embed-code-display': {
      backgroundColor: '#666',
      padding: '6px',
      fontSize: '12px',
      minWidth: 700
    },
    '& .embed-code-row': {
      margin: '16px 0',
      display: 'flex'
    },
    '& fieldset': {
      fontSize: '12px',
      marginRight: '24px'
    },
    '& legend': {
      margin: '8px 0 4px 0'
    },
    fontSize: '.75rem',
    '& .sketch-picker': {
      position: 'absolute'
    },
    '& label, & .MuiFormControlLabel-label': {
      fontSize: '12px'
    },
    '& .MuiTypography-h6': {
      marginBottom: 0
    },
    '& .MuiDialogTitle-root': {
      paddingBottom: 0
    },
    '& .MuiFormLabel-root': {
      fontSize: 13,
      paddingRight: 12,
      fontWeight: 'bold',
      '&.Mui-focused': {
        color: '#fff'
      }
    },
    '& .MuiIconButton-root': {
      padding: '4px'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1rem'
    },
    '& iframe': {
      border: 0
    },
    '& #playlistTagInput': {
      fontSize: 12
    }
  },
  swatch: {
    marginLeft: '12px',
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer'
  },
  popover: {
    position: 'absolute',
    zIndex: '2',
    marginTop: '25px',
    marginLeft: '12px'
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  },
  pickerContainer: {
    display: 'inline-flex'
  },
  formCustomColorLabel: {
    fontWeight: 'normal !important',
    color: '#fff'
  }
})
