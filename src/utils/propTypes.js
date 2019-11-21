import PropTypes from 'prop-types'

export const APIListType = PropTypes.shape({
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  prevCursor: PropTypes.string,
  nextCursor: PropTypes.string
})

export const ImageUrlType = PropTypes.oneOfType([
  PropTypes.shape({
    original: PropTypes.string
  }),
  PropTypes.string
])
