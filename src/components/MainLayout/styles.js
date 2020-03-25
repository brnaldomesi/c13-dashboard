export default theme => ({
  root: {
    height: '100%'
  },

  content: {
    marginLeft: ({ sidebarOpen, matchsXs }) =>
      sidebarOpen && !matchsXs
        ? theme.cadence.sidebarWidth
        : !sidebarOpen && !matchsXs
        ? theme.cadence.miniSidebarWidth
        : 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  }
})
