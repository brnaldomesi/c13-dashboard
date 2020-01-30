import React, { Component } from 'react'

import PropTypes from 'prop-types'
import styles from './styles'
import { withStyles } from '@material-ui/core/styles'

class Content extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    domRef: PropTypes.func
  }

  render() {
    const { classes, className, children, domRef } = this.props

    return (
      <div className={className}>
        <div className={classes.toolbar} />
        <div className={classes.root} ref={domRef}>
          {children}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Content)
