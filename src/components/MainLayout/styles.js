export default theme => ({
  root: {
    height: '100%'
  },

  content: {
    marginLeft: ({ sidebarOpen }) => (sidebarOpen ? theme.cadence.sidebarWidth : theme.cadence.miniSidebarWidth)
  }
})
