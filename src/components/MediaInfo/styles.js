export default theme => ({
  root: {
    padding: theme.spacing(3),
    margin: -theme.spacing(3),
    backgroundColor: theme.cadence.panelBg,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    minHeight: theme.spacing(3) * 2 + 150
  },
  content: {
    paddingLeft: theme.spacing(3),
    flex: 1
  },
  actions: {
    marginTop: theme.spacing(4)
  }
})
