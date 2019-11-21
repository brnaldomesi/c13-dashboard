import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { ImageUrlType } from 'utils/propTypes'
import fallbackImage from './cadence13-logo.png'
import styles from './styles'
import ThumbnailImage from 'components/ThumbnailImage'

const useStyles = makeStyles(styles)

const MediaImage = ({ imageUrls }) => {
  const classes = useStyles()
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
  imageUrls: ImageUrlType
}

export default MediaImage
