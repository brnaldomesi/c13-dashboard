export default theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
  moreToggle: {
    borderRadius: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  table: {
    minWidth: 700,
    maxWidth: '100%'
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
  figure: {
    border: 'none',
    whiteSpace: 'nowrap'
  }
})
