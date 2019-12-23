import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import cn from 'classnames'
import PropTypes from 'prop-types'

import styles from './styles'

const useStyles = makeStyles(styles)

const Tabs = ({ tabs, activeKey, onChange }) => {
  const classes = useStyles()
  const handleChange = useCallback(
    key => () => {
      onChange(key)
    },
    [onChange]
  )

  return (
    <div className={classes.root}>
      {tabs.map(tab => (
        <Button
          key={tab.key}
          className={cn(classes.tab, { [classes.tabActive]: activeKey === tab.key })}
          onClick={handleChange(tab.key)}>
          {tab.label}
        </Button>
      ))}
    </div>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string
    })
  ).isRequired,
  activeKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Tabs
