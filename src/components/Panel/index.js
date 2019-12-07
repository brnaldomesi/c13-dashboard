import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import PanelContent from '@material-ui/core/CardContent'

import PanelFooter from './PanelFooter'
import PanelHeader from './PanelHeader'
import styles from './styles'

const Panel = withStyles(styles)(Card)
Panel.Header = PanelHeader
Panel.Content = PanelContent
Panel.Footer = PanelFooter

export default Panel
