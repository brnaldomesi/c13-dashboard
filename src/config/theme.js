import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  // Override your theme here
  palette: {
    type: 'dark',
    primary: {
      main: '#3BA8FC',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  },
  cadence: {
    appBarBg: '#000000',
    sidebarBg: '#121315',
    contentBg: '#090909',
    panelBg: '#333333',
    cardHeaderBg: '#444444',
    cardActionBg: '#222222',
    sidebarWidth: 250,
    downloadsDensityLowColor: '#e6e9ef',
    downloadsDensityMediumColor: '#0036a2',
    downloadsDensityHighColor: '#001d56',
    mapHover: '#a4edba'
  }
})
