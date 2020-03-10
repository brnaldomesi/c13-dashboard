import CardMedia from '@material-ui/core/CardMedia'
import { ImageUrlType } from 'utils/propTypes'
import PropTypes from 'prop-types'
import React from 'react'
import avatarPlaceholder from './avatar-placeholder.png'
import get from 'lodash/get'
import podcastPlaceholder from './podcast-placeholder.png'

const ThumbnailImage = ({ className, imageUrls, title, type }) => {
  const url =
    typeof imageUrls === 'string'
      ? imageUrls
      : get(imageUrls, 'original') || (type === 'avatar' ? avatarPlaceholder : podcastPlaceholder)

  return <CardMedia className={className} image={url} title={title} />
}

ThumbnailImage.propTypes = {
  className: PropTypes.string,
  imageUrls: ImageUrlType,
  title: PropTypes.string,
  type: PropTypes.oneOf(['avatar', 'podcast'])
}

ThumbnailImage.defaultProps = {
  type: 'avatar'
}

export default ThumbnailImage
