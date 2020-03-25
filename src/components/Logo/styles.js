export default theme => ({
  logo: {
    width: 'auto',
    height: 32,
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(2)
    }
  }
})
