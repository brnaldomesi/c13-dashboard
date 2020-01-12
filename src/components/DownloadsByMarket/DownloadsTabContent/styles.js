export default theme => ({
  root: {
    position: 'relative'
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
  content: {
    paddingTop: theme.spacing(2)
  },
  row: {
    cursor: 'pointer',
    backgroundColor: theme.cadence.cardHeaderBg,
    '&:nth-child(odd)': {
      backgroundColor: theme.cadence.panelBg
    }
  },
  cell: {
    border: 'none'
  },
  moreToggle: {
    borderRadius: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
})
