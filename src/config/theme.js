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
    miniSidebarWidth: 57,
    mapHover: '#a4edba',
    mapMin: '#3daafe',
    // mapStep1: '#01477E',
    // mapStep2: '#0168b8',
    // mapStep3: '#015da4',
    // mapStep4: '#015494',
    // mapStep5: '#3ca9fd',
    // mapStep6: '#3ca9fd',

    mapStep1: '#016cbf',
    mapStep2: '#015da4',
    mapStep3: '#004c87',
    mapStep4: '#003b69',
    mapStep5: '#012541',
    mapStep6: '#001321',
    mapMax: '#000204'
  }
})
