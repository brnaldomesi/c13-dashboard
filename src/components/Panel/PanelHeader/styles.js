export default theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    backgroundColor: theme.cadence.cardHeaderBg
  },
  title: {
    textTransform: 'uppercase',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    flex: 1
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    backgroundColor: theme.cadence.cardActionBg
  },
  bold: {
    fontWeight: 600
  }
})
