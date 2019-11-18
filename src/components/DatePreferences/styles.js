export default theme => ({
  btnToggler: {
    fontSize: theme.typography.h6.fontSize,
    fontFamily: 'Oswald'
  },
  paper: {
    width: 600,
    position: 'relative',
    padding: theme.spacing(4)
  },
  divider: {
    backgroundColor: theme.palette.divider,
    width: 1,
    height: '100%'
  },
  row: {
    marginTop: 0,
    marginBottom: 0
  },
  col: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important'
  },
  field: {
    marginBottom: theme.spacing(2)
  },
  right: {
    textAlign: 'right'
  },
  btnCancel: {
    marginRight: theme.spacing(2)
  }
})
