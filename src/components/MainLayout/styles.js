export default theme => ({
  root: {
    height: '100%'
  },

  content: {
    marginLeft: ({ sidebarOpen }) => (sidebarOpen ? theme.cadence.sidebarWidth : theme.cadence.miniSidebarWidth),
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  }
})
