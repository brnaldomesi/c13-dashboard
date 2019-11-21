export default theme => ({
  root: {
    overflowY: 'auto',
    flexGrow: 1,
    padding: theme.spacing(3),
    display: 'flex',
    backgroundColor: theme.cadence.contentBg
  },
  toolbar: theme.mixins.toolbar
})
