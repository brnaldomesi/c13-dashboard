export default theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  list: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.paper
  },
  sticky: {
    position: 'sticky',
    top: theme.spacing(11),
    zIndex: 1,
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(20) - 2,
      position: 'inherit'
    }
  }
})
