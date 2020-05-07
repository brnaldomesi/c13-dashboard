export default theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1)
  },
  notificationBody: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  notificationDate: {
    //fontSize: theme.typography.body1.fontSize
    fontSize: 11,
    fontWeight: 'normal',
    marginBottom: theme.spacing(2)
    //float: 'right'
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: theme.spacing(2)
  }
})
