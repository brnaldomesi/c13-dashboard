export default theme => ({
  root: {
    backgroundColor: theme.cadence.cardActionBg
  },
  tab: {
    padding: theme.spacing(1.25),
    borderRadius: 0,
    fontWeight: 600,
    '&:not(:last-child)': {
      borderRight: `1px solid ${theme.cadence.panelBg}`
    }
  },
  tabActive: {
    backgroundColor: theme.cadence.panelBg,
    color: theme.palette.primary.main
  }
})
