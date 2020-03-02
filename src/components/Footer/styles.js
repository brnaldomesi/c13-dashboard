export default theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.cadence.appBarBg,
    minHeight: theme.spacing(15)
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2)
  },
  linksGroup: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'cneter'
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    rel: 'noopener noreferrer'
  },
  mainColor: {
    color: theme.palette.primary.main
  }
})
