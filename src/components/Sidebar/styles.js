export default theme => ({
  paper: {
    backgroundColor: theme.cadence.sidebarBg,
    width: theme.cadence.sidebarWidth
  },
  flexOne: {
    flex: 1
  },
  list: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    minHeight: theme.spacing(8)
  },
  spacer: {
    flex: 1
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2)
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar
  },
  footer: {
    display: 'flex',
    alignItems: 'flex-end'
  }
})
