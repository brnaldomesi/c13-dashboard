import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import PanelContent from '@material-ui/core/CardContent'

import PanelHeader from './PanelHeader'
import styles from './styles'

const Panel = withStyles(styles)(Card)
Panel.Header = PanelHeader
Panel.Content = PanelContent

export default Panel
