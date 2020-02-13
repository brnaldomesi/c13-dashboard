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
    zIndex: 1
  }
})
