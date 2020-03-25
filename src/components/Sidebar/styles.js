export default theme => ({
  paper: {
    backgroundColor: theme.cadence.sidebarBg,
    width: theme.cadence.sidebarWidth
  },
  root: {
    backgroundColor: theme.cadence.sidebarBg,
    width: ({ open }) => (open ? theme.cadence.sidebarWidth : theme.cadence.miniSidebarWidth),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'fixed',
    zIndex: 2
  },
  flexOne: {
    flex: 1
  },
  list: {
    overflow: ({ open }) => (open ? 'auto' : 'hidden'),
    display: 'flex',
    flexDirection: 'column',
    minHeight: theme.spacing(8),
    zIndex: 1
  },
  spacer: {
    flex: 1
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2)
  },
  info: {
    padding: theme.spacing(2)
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar
  },
  footer: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  sidebarToggle: {
    position: 'absolute',
    right: '0',
    marginTop: ({ sidebarItemheight }) => sidebarItemheight / 2,
    transform: 'translate(50%, -50%)',
    cursor: 'pointer',
    zIndex: 2
  }
})
