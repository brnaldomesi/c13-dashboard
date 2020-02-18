import { ImageUrlType } from 'utils/propTypes'
import PropTypes from 'prop-types'
import React from 'react'
import ThumbnailImage from 'components/ThumbnailImage'
import fallbackImage from './cadence13-logo.png'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const MediaImage = ({ imageUrls, minimized }) => {
  const classes = useStyles({ minimized })
  return (
    <div className={classes.root}>
      {imageUrls ? (
        <ThumbnailImage imageUrls={imageUrls} className={classes.image} />
      ) : (
        <div className={classes.fallback}>
          <ThumbnailImage imageUrls={fallbackImage} className={classes.image} />
        </div>
      )}
    </div>
  )
}

MediaImage.propTypes = {
  imageUrls: ImageUrlType,
  minimized: PropTypes.bool
}

export default MediaImage
