export default theme => ({
  root: {
    width: '100%'
  },
  export: {
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
