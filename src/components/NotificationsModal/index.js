import React from 'react'

import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import moment from 'moment'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const NotificationsModal = ({ handleHide, show, notifications = [] }) => {
  const classes = useStyles()

  const handleClose = () => {
    show = false
    handleHide()
  }

  const DialogTitle = props => {
    const { children, onClose, ...other } = props
    return (
      <MuiDialogTitle disableTypography {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    )
  }

  const list = notifications.map((notification, i, arr) => {
    let d = moment(new Date(notification.timestamp)).format('M/D/YYYY')
    return (
      <div key={notification.id}>
        <h2 className={classes.notificationTitle}>{notification.title}</h2>
        <p className={classes.notificationBody}>{notification.text}</p>
        <div className={classes.notificationDate}>{d}</div>
        {arr.length - 1 !== i ? <Divider /> : ''}
      </div>
    )
  })

  return (
    <Dialog
      className={classes.root}
      open={show}
      onClose={handleHide}
      maxWidth="lg"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description">
      <DialogTitle id="confirm-modal-title" onClose={handleClose}>
        Notifications
      </DialogTitle>
      <DialogContent>{list}</DialogContent>
    </Dialog>
  )
}

NotificationsModal.propTypes = {
  handleHide: PropTypes.func.isRequired,
  show: PropTypes.bool,
  notifications: PropTypes.array
}

export default NotificationsModal
