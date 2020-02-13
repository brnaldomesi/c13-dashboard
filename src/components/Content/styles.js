export default theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: theme.cadence.contentBg
  },
  toolbar: theme.mixins.toolbar
})
