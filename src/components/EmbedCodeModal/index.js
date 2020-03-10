import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import CopyIcon from '@material-ui/icons/FileCopy'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { SHOWS_DOMAIN } from 'config/constants'
import { SketchPicker } from 'react-color'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const EmbedCodeModal = ({ handleHide, show, title, podcast, episode }) => {
  const classes = useStyles()

  let initialCustomColor = ''

  if (localStorage) {
    let storedSettings = localStorage.getItem(podcast.slug)
    try {
      initialCustomColor = (storedSettings && JSON.parse(storedSettings).customColor) || ''
    } catch (e) {}
  }

  const [theme, setTheme] = useState('dark')
  const [layout, setLayout] = useState('horizontal')
  const [playlistType, setPlaylistType] = useState('latest')
  const [playlistTag, setPlaylistTag] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [useCustomColor, setUseCustomColor] = useState('false')
  const [customColor, setCustomColor] = useState(initialCustomColor)
  const [showColorPicker, setShowColorPicker] = useState('false')
  const [copied, setCopied] = useState(false)
  const [sneakPreview, setSneakPreview] = useState('false')
  const handleChange = event => {
    setTheme(event.target.value)
  }
  const handlePlaylistTypeChange = event => {
    setPlaylistType(event.target.value)
  }
  const handlePlaylistTagChange = event => {
    setPlaylistTag(event.target.value)
  }
  const handleLayoutChange = event => {
    setLayout(event.target.value)
  }
  const handleCoverImageChange = event => {
    setCoverImage(event.target.value)
  }
  const handleUseCustomColorChange = event => {
    setUseCustomColor(event.target.value)
  }
  const handleSneakPreviewChange = event => {
    setSneakPreview(event.target.value)
  }
  const handleColorChangeComplete = (color, event) => {
    if (localStorage) {
      localStorage.setItem(podcast.slug, JSON.stringify({ customColor: color.hex }))
    }
    setCustomColor(color.hex)
  }
  const handleColorPickerClick = (color, event) => {
    if (showColorPicker === 'true') {
      setShowColorPicker('false')
    } else {
      setShowColorPicker('true')
    }
  }
  const handleClose = () => {
    show = false
    handleHide()
  }

  const colorParam = useCustomColor === 'true' ? `&customColor=${encodeURIComponent(customColor)}` : ''
  let playlistParam = ''
  let playlistTagParam = ''

  const iframeClass = playlistType === 'full' ? 'binge-mode' : 'single-episode'
  let iframeHeight = '200px'
  let iframeWidth = '100%'
  let disableNonHorizontalFields = true
  const isEpisodeLevel = episode && episode.episodeId

  if (layout === 'horizontal') {
    if (playlistType === 'full') {
      playlistParam = '&playlist_type=full'
      iframeHeight = '520px'
      if (playlistTag && playlistTag.length > 0) {
        playlistTagParam = `&playlistTag=${playlistTag}`
      }
    }
    disableNonHorizontalFields = false
  }

  if (layout === 'mini') {
    iframeHeight = '100px'
  }

  if (layout === 'album-art' || layout === 'vertical') {
    iframeHeight = '450px'
    iframeWidth = '450px'
  }

  const iframeStyle = {
    height: iframeHeight,
    width: iframeWidth
  }

  let disablePlaylistFields = disableNonHorizontalFields
  let episodePath = ''
  if (isEpisodeLevel) {
    episodePath = `/episodes/${episode.episodeId}`
    disablePlaylistFields = true
  }

  const sneakPreviewParam = sneakPreview === 'true' ? '&enableSneakPreview=true' : ''
  const coverImageParam = coverImage === 'true' ? '&hideCoverImage=true' : ''

  const url = `https://${SHOWS_DOMAIN}/player/${podcast.slug}${episodePath}?theme=${theme}&layout=${layout}${playlistParam}${playlistTagParam}${coverImageParam}${colorParam}${sneakPreviewParam}`
  const embedCode = `<iframe style='width:${iframeWidth};height:${iframeHeight}' src='${url}'></iframe>`

  const colorBoxStyle = {
    background: customColor,
    width: '36px',
    height: '14px',
    borderRadius: '2px'
  }

  const colorPicker = (
    <div className={classes.pickerContainer}>
      <div className={classes.swatch} onClick={handleColorPickerClick}>
        <div className="colorBox" style={colorBoxStyle} />
      </div>
      {showColorPicker === 'true' ? (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={handleColorPickerClick} />
          <SketchPicker
            color={customColor}
            onChangeComplete={handleColorChangeComplete}
            disableAlpha={true}
            presetColors={[]}
          />
        </div>
      ) : null}
    </div>
  )

  const sneakPreviewSection = isEpisodeLevel ? (
    <FormControl component="fieldset" className={classes.formControl} margin="dense">
      <FormLabel component="legend">Sneak Preview</FormLabel>
      <RadioGroup
        aria-label="playlistType"
        name="playlistType1"
        value={sneakPreview}
        onChange={handleSneakPreviewChange}>
        <FormControlLabel value="true" control={<Radio />} label="Enable" />
        <FormControlLabel value="false" control={<Radio />} label="Disable" />
      </RadioGroup>
    </FormControl>
  ) : (
    ''
  )

  const playlistTagSection =
    !disablePlaylistFields && playlistType === 'full' ? (
      <FormControl margin="dense" disabled={layout !== 'horizontal' || playlistType !== 'full'}>
        <InputLabel htmlFor="playlistTagInput">Playlist Tag</InputLabel>
        <Input id="playlistTagInput" value={playlistTag} onChange={handlePlaylistTagChange} />
      </FormControl>
    ) : (
      ''
    )

  return (
    <Dialog
      className={classes.root}
      open={show}
      onClose={handleClose}
      maxWidth="lg"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description">
      <DialogTitle id="confirm-modal-title">{title}</DialogTitle>
      <DialogContent>
        <FormGroup row={true} className={classes.mainForm}>
          <FormControl component="fieldset" className={classes.formControl} margin="dense">
            <FormLabel component="legend">Layout</FormLabel>
            <RadioGroup aria-label="layout" name="layout1" value={layout} onChange={handleLayoutChange}>
              <FormControlLabel value="horizontal" control={<Radio />} label="Horizontal" />
              <FormControlLabel value="vertical" control={<Radio />} label="Vertical" />
              <FormControlLabel value="album-art" control={<Radio />} label="Album Art" />
              <FormControlLabel value="mini" control={<Radio />} label="Mini" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl} margin="dense">
            <FormLabel component="legend">Theme</FormLabel>
            <RadioGroup aria-label="theme" name="theme1" value={theme} onChange={handleChange}>
              <FormControlLabel value="light" control={<Radio />} label="Light" />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            </RadioGroup>
          </FormControl>
          <FormControl
            component="fieldset"
            className={classes.formControl}
            margin="dense"
            disabled={disablePlaylistFields}>
            <FormLabel component="legend">Playlist Type</FormLabel>
            <RadioGroup
              aria-label="playlistType"
              name="playlistType1"
              value={playlistType}
              onChange={handlePlaylistTypeChange}>
              <FormControlLabel value="latest" control={<Radio />} label="Single Episode" />
              <FormControlLabel value="full" control={<Radio />} label="Binge Mode" />
            </RadioGroup>
            {playlistTagSection}
          </FormControl>
          <FormControl
            component="fieldset"
            className={classes.formControl}
            margin="dense"
            disabled={disableNonHorizontalFields}>
            <FormLabel component="legend">Cover Image</FormLabel>
            <RadioGroup aria-label="coverImage" name="coverImage1" value={coverImage} onChange={handleCoverImageChange}>
              <FormControlLabel className={classes.formControlLabel} value="" control={<Radio />} label="Show" />
              <FormControlLabel className={classes.formControlLabel} value="true" control={<Radio />} label="Hide" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl} margin="dense">
            <FormLabel component="legend">Primary Color</FormLabel>
            <RadioGroup
              aria-label="useCustomColor"
              name="useCustomColor1"
              value={useCustomColor}
              onChange={handleUseCustomColorChange}>
              <FormControlLabel value="false" control={<Radio />} label="Default" />
              <FormLabel
                className={classes.formCustomColorLabel}
                style={{ marginLeft: '-11px', display: 'inline-flex', verticalAlign: 'middle', alignItems: 'center' }}>
                <Radio value="true" /> Custom {colorPicker}{' '}
              </FormLabel>
            </RadioGroup>
          </FormControl>
          {sneakPreviewSection}
        </FormGroup>
        <div className="embed-code-row">
          <textarea className="embed-code-display" rows="3" value={embedCode} readOnly={true}></textarea>
          <CopyToClipboard text={embedCode} onCopy={() => setCopied(true)}>
            <Tooltip title={copied ? 'Embed code copied to clipboard' : 'Click to copy embed code to clipboard'}>
              <Button size="large" variant="contained" color="default" startIcon={<CopyIcon />}>
                Copy
              </Button>
            </Tooltip>
          </CopyToClipboard>
        </div>
        <iframe title="C13 Embedded Player" src={url} style={iframeStyle} className={iframeClass}></iframe>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EmbedCodeModal.propTypes = {
  handleHide: PropTypes.func.isRequired,
  show: PropTypes.bool,
  title: PropTypes.node,
  podcast: PropTypes.object,
  episode: PropTypes.object
}

export default EmbedCodeModal //connectModal({ name: 'embedCodeModal' })(EmbedCodeModal)
