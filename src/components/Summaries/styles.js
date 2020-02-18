export default theme => ({
  root: {
    display: 'flex',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    position: 'relative',
    backgroundColor: theme.cadence.appBarBg
  },
  subtitle1: {
    fontWeight: 600,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  }
})
