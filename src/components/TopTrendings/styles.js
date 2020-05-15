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
    width: '100%'
  },
  row: {
    cursor: 'pointer',
    backgroundColor: theme.cadence.cardHeaderBg,
    '&:nth-child(odd)': {
      backgroundColor: theme.cadence.panelBg
    }
  },
  cell: {
    padding: theme.spacing(1),
    border: 'none'
  },
  figure: {
    padding: theme.spacing(1),
    border: 'none',
    whiteSpace: 'nowrap'
  },
  chart: {
    width: 300
  },
  colorSwatch: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(0.25)
  }
})
