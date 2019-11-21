export default theme => ({
  root: {
    width: 150,
    height: 150,
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  fallback: {
    border: `5px solid ${theme.palette.common.white}`,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.grey[200]
  }
})
