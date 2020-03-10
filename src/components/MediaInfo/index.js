import React, { useState } from 'react'
import {
  episodesLoadingSelector,
  episodesSelector,
  networksLoadingSelector,
  networksSelector
} from 'redux/modules/media'
import { userPreferenceSelector, userSeriesLoadingSelector, userSeriesSelector } from 'redux/modules/profiles'

import Button from '@material-ui/core/Button'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import EmbedCodeModal from 'components/EmbedCodeModal'
import Grid from '@material-ui/core/Grid'
import { Link } from '@material-ui/core'
import LoadingIndicator from 'components/LoadingIndicator'
import MediaImage from 'components/MediaImage'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { SHOWS_DOMAIN } from 'config/constants'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import fp from 'lodash/fp'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const renderNetwork = (network, classes, minimized) => (
  <div className={classes.root}>
    <MediaImage imageUrls={network.coverImgUrl} minimized={minimized} to={`/${network.networkId}`} />
    <div className={classes.content}>
      <Typography variant="h5" gutterBottom={minimized ? false : true}>
        {network.name}
      </Typography>
      <Typography variant="body1">{network.description}</Typography>
    </div>
  </div>
)

const renderPodcast = (podcast, network, classes, copied, setCopied, showEmbedModal, setShowEmbedModal, minimized) => (
  <div className={classes.root}>
    <MediaImage imageUrls={podcast.coverImgUrl} minimized={minimized} />
    <div className={classes.content}>
      <Typography variant="h5" gutterBottom={minimized ? false : true}>
        {podcast.name}
      </Typography>
      {network && (
        <Link to={`/${network.networkId}`} component={RouterLink}>
          <Typography variant="h6" gutterBottom={minimized ? false : true}>
            {network.name}
          </Typography>
        </Link>
      )}

      <div className={classes.actions}>
        <Grid container spacing={3}>
          <Grid item>
            <Button size="large" variant="contained" color="primary" onClick={() => setShowEmbedModal(true)}>
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
              View on Show Hub
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>

    <EmbedCodeModal
      title={`Embed Player for ${podcast.name}`}
      show={showEmbedModal}
      podcast={podcast}
      handleHide={() => setShowEmbedModal(false)}
    />
  </div>
)

const renderEpisode = (episode, podcast, network, classes, showEmbedModal, setShowEmbedModal, minimized) => (
  <div className={classes.root}>
    <MediaImage
      imageUrls={podcast.coverImgUrl}
      minimized={minimized}
      to={`/${network.networkId}/${podcast.seriesId}`}
    />
    <div className={classes.content}>
      <Link to={`/${network.networkId}/${podcast.seriesId}`} component={RouterLink}>
        <Typography variant="h6" gutterBottom={minimized ? false : true}>
          {podcast.name}
        </Typography>
      </Link>
      <Typography variant="h5" gutterBottom={minimized ? false : true}>
        {episode.name}
      </Typography>
      <div className={classes.actions}>
        <Grid container spacing={3}>
          <Grid item>
            <Button size="large" variant="contained" color="primary" onClick={() => setShowEmbedModal(true)}>
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
              View on Show Hub
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
    <EmbedCodeModal
      title={`Embed Player for ${episode.name}`}
      show={showEmbedModal}
      podcast={podcast}
      episode={episode}
      handleHide={() => setShowEmbedModal(false)}
    />
  </div>
)

const renderFallback = (classes, minimized) => (
  <div className={classes.root}>
    <MediaImage minimized={minimized} />
  </div>
)

const renderLoading = classes => (
  <div className={classes.root}>
    <LoadingIndicator />
  </div>
)

const MediaInfo = ({ episode, network, podcast, episodesLoading, networksLoading, userSeriesLoading, minimized }) => {
  const classes = useStyles({ minimized })
  const [copied, setCopied] = useState(false)
  const [showEmbedModal, setShowEmbedModal] = useState(false)

  const isLoading = episodesLoading || networksLoading || userSeriesLoading
  if (isLoading) {
    return renderLoading(classes)
  } else if (episode) {
    return renderEpisode(episode, podcast, network, classes, showEmbedModal, setShowEmbedModal, minimized)
  } else if (podcast) {
    return renderPodcast(podcast, network, classes, copied, setCopied, showEmbedModal, setShowEmbedModal, minimized)
  } else if (network) {
    return renderNetwork(network, classes, minimized)
  } else {
    return renderFallback(classes, minimized)
  }
}

MediaInfo.propTypes = {
  episode: PropTypes.object,
  episodesLoading: PropTypes.bool,
  network: PropTypes.object,
  networksLoading: PropTypes.bool,
  podcast: PropTypes.object,
  userPreference: PropTypes.object,
  userSeriesLoading: PropTypes.bool,
  minimized: PropTypes.bool
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
