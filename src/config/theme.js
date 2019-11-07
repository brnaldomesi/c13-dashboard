import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  // Override your theme here
  palette: {
    type: 'dark',
    primary: {
      main: '#3ea8fe',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  },
  cadence: {
    appBarBg: '#000000',
    sidebarBg: '#121315',
    sidebarWidth: 250
  }
})
