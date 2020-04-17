export default theme => ({
  field: {
    marginBottom: theme.spacing(2)
  },
  sectionSubmit: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between'
  },
  error: {
    marginTop: theme.spacing(1)
  },
  link: theme.mixins.link
})
