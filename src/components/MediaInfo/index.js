import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { createStructuredSelector } from 'reselect'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import fp from 'lodash/fp'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import {
  episodesLoadingSelector,
  episodesSelector,
  networksLoadingSelector,
  networksSelector
} from 'redux/modules/media'
import { SHOWS_DOMAIN } from 'config/constants'
import { userPreferenceSelector, userSeriesLoadingSelector, userSeriesSelector } from 'redux/modules/profiles'
import LoadingIndicator from 'components/LoadingIndicator'
import MediaImage from 'components/MediaImage'
import styles from './styles'

const useStyles = makeStyles(styles)

const renderNetwork = (network, classes) => (
  <div className={classes.root}>
    <MediaImage imageUrls={network.coverImgUrl} />
    <div className={classes.content}>
      <Typography variant="h5" gutterBottom>
        {network.name}
      </Typography>
      <Typography variant="body1">{network.description}</Typography>
    </div>
  </div>
)

const renderPodcast = (podcast, network, classes, copied, setCopied) => (
  <div className={classes.root}>
    <MediaImage imageUrls={podcast.coverImgUrl} />
    <div className={classes.content}>
      <Typography variant="h5" gutterBottom>
        {podcast.name}
      </Typography>
      {network && (
        <Typography variant="h6" gutterBottom>
          {network.name}
        </Typography>
      )}
      <div className={classes.actions}>
        <Grid container spacing={3}>
          <Grid item>
            <Button size="large" variant="contained" color="primary">
              Add/Embed Player
            </Button>
          </Grid>
          <Grid item>
            <CopyToClipboard text={podcast.rssFeed} onCopy={() => setCopied(true)}>
              <Tooltip title={copied ? 'Link copied to clipboard' : 'Click to copy to clipboard'}>
                <Button size="large" variant="contained" color="primary">
                  RSS Feed
                </Button>
              </Tooltip>
            </CopyToClipboard>
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="contained"
              color="primary"
              component="a"
              target="_blank"
              href={`https://${SHOWS_DOMAIN}/podcast/${podcast.slug}`}>
              View on ShowHub
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  </div>
)

const renderEpisode = (episode, podcast, classes) => (
  <div className={classes.root}>
    <MediaImage imageUrls={podcast.coverImgUrl} />
    <div className={classes.content}>
      <Typography variant="h5" gutterBottom>
        {episode.name}
      </Typography>
      <div className={classes.actions}>
        <Grid container spacing={3}>
          <Grid item>
            <Button size="large" variant="contained" color="primary">
              Add/Embed Player
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="contained"
              color="primary"
              component="a"
              target="_blank"
              href={`https://${SHOWS_DOMAIN}/podcast/${podcast.slug}/episodes/${episode.episodeId}`}>
              View on ShowHub
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  </div>
)

const renderFallback = classes => (
  <div className={classes.root}>
    <MediaImage />
  </div>
)

const renderLoading = classes => (
  <div className={classes.root}>
    <LoadingIndicator />
  </div>
)

const MediaInfo = ({ episode, network, podcast, episodesLoading, networksLoading, userSeriesLoading }) => {
  const classes = useStyles()
  const [copied, setCopied] = useState(false)
  const isLoading = episodesLoading || networksLoading || userSeriesLoading
  if (isLoading) {
    return renderLoading(classes)
  } else if (episode) {
    return renderEpisode(episode, podcast, classes)
  } else if (podcast) {
    return renderPodcast(podcast, network, classes, copied, setCopied)
  } else if (network) {
    return renderNetwork(network, classes)
  } else {
    return renderFallback(classes)
  }
}

MediaInfo.propTypes = {
  episode: PropTypes.object,
  episodesLoading: PropTypes.bool,
  network: PropTypes.object,
  networksLoading: PropTypes.bool,
  podcast: PropTypes.object,
  userPreference: PropTypes.object,
  userSeriesLoading: PropTypes.bool
}

const networkSelector = (state, { userPreference }) =>
  compose(
    fp.find({ networkId: fp.get('networkId')(userPreference) }),
    fp.defaultTo([]),
    networksSelector
  )(state)

const podcastSelector = (state, { userPreference }) =>
  compose(
    fp.find({ seriesId: fp.get('seriesId')(userPreference) }),
    fp.defaultTo([]),
    fp.get(fp.get('networkId')(userPreference)),
    userSeriesSelector
  )(state)

const episodeSelector = (state, { userPreference }) =>
  compose(
    fp.find({ episodeId: fp.get('episodeId')(userPreference) }),
    fp.defaultTo([]),
    episodesSelector
  )(state)

const selector1 = createStructuredSelector({
  userPreference: userPreferenceSelector
})

const selector2 = createStructuredSelector({
  episode: episodeSelector,
  episodesLoading: episodesLoadingSelector,
  network: networkSelector,
  networksLoading: networksLoadingSelector,
  podcast: podcastSelector,
  userSeriesLoading: userSeriesLoadingSelector
})

export default compose(
  connect(selector1),
  connect(selector2)
)(MediaInfo)
