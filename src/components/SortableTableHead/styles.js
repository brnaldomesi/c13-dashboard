export default theme => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  row: {
    backgroundColor: theme.cadence.cardActionBg,
    fontWeight: 700
  },
  cell: {
    border: 'none'
  }
})
