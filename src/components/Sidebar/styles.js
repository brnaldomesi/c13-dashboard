export default theme => ({
  paper: {
    backgroundColor: theme.cadence.sidebarBg
  },
  list: {
    width: theme.cadence.sidebarWidth
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
