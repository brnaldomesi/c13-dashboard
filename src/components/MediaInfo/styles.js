export default theme => ({
  root: {
    padding: ({ minimized }) => (minimized ? theme.spacing(1.5, 3) : theme.spacing(3)),
    margin: -theme.spacing(3),
    marginBottom: 0,
    backgroundColor: theme.cadence.panelBg,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    minHeight: ({ minimized }) => (minimized ? 'unset' : theme.spacing(3) * 2 + 150)
  },
  content: {
    paddingLeft: theme.spacing(3),
    flex: 1
  },
  actions: {
    marginTop: ({ minimized }) => (minimized ? 0 : theme.spacing(4)),
    position: ({ minimized }) => (minimized ? 'absolute' : 'relative'),
    right: ({ minimized }) => (minimized ? theme.spacing(4) : 'unset'),
    top: ({ minimized }) => (minimized ? theme.spacing(3) : 'unset'),
    [theme.breakpoints.down('md')]: {
      display: 'contents'
    }
  }
})
