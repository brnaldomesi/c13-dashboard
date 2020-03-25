import React, { Component } from 'react'

import Footer from 'components/Footer'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isAuthenticatedSelector } from 'redux/modules/auth'
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
    const { classes, className, children, domRef, isAuthenticated } = this.props

    return (
      <div className={className}>
        {isAuthenticated ? (
          <div className={cn(classes.toolbar, classes.authedToolbar)} />
        ) : (
          <div className={classes.toolbar} />
        )}
        <div className={classes.root} ref={domRef}>
          {children}
        </div>
        {isAuthenticated && <Footer />}
      </div>
    )
  }
}

Content.propTypes = {
  isAuthenticated: PropTypes.bool
}

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})

export default compose(
  connect(selector),
  withStyles(styles)
)(Content)
