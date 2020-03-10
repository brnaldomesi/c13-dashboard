import { ImageUrlType } from 'utils/propTypes'
import { Link } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import ThumbnailImage from 'components/ThumbnailImage'
import fallbackImage from './cadence13-logo.png'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const MediaImage = ({ imageUrls, minimized, to }) => {
  const classes = useStyles({ minimized })
  const renderLink = imageUrls =>
    to ? (
      <Link to={to} component={RouterLink}>
        <ThumbnailImage imageUrls={imageUrls} className={classes.image} />
      </Link>
    ) : (
      <ThumbnailImage imageUrls={imageUrls} className={classes.image} />
    )

  return (
    <div className={classes.root}>
      {imageUrls ? renderLink(imageUrls) : <div className={classes.fallback}>{renderLink(fallbackImage)}</div>}
    </div>
  )
}

MediaImage.propTypes = {
  imageUrls: ImageUrlType,
  minimized: PropTypes.bool,
  to: PropTypes.string
}

export default MediaImage
