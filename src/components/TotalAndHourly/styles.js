export default theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  exportWrap: {
    position: 'absolute',
    bottom: '100%',
    right: 0
  },
  export: {
    borderRadius: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  exportRoot: {
    position: 'relative'
  },
  contentInner: {
    padding: theme.spacing(2)
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
