import React, { useState } from 'react'

import Autosuggest from 'react-autosuggest'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { activePodcastsSelector } from 'redux/modules/media'
import axios from 'axios'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeStyles } from '@material-ui/core/styles'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import styles from './styles'

const { CancelToken } = axios

const useStyles = makeStyles(styles)

const renderInputComponent = inputProps => {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node)
          inputRef(node)
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  )
}

const renderSuggestion = getSuggestionValue => (suggestion, { query, isHighlighted }) => {
  const value = getSuggestionValue(suggestion)
  const matches = match(value, query)
  const parts = parse(value, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 700 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  )
}

const AutoSuggest = ({
  label,
  name,
  inputComponent,
  suggestionComponent,
  getSuggestionValue,
  onChange,
  value,
  onSuggestionSelected,
  activePodcasts
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [stateSuggestions, setSuggestions] = useState([])
  const [cancelTokenSource, setCancelTokenSource] = useState(null)
  const handleSuggestionsFetchRequested = ({ value }) => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel()
    }
    setSuggestions(activePodcasts.filter(item => item.seriesName.indexOf(value) > -1))
    const source = CancelToken.source()
    setCancelTokenSource(source)
  }

  const handleSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const handleChange = (event, { newValue }) => {
    onChange(newValue)
  }

  const handleSuggestionSelected = (event, { suggestion }) => {
    onSuggestionSelected(suggestion)
    onChange('')
    event.preventDefault()
  }

  const autosuggestProps = {
    renderInputComponent: inputComponent || renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    onSuggestionSelected: handleSuggestionSelected,
    getSuggestionValue,
    renderSuggestion: suggestionComponent || renderSuggestion
  }

  return (
    <Autosuggest
      {...autosuggestProps}
      inputProps={{
        classes,
        label,
        name,
        placeholder: 'With Popper',
        value,
        onChange: handleChange,
        inputRef: node => {
          setAnchorEl(node)
        },
        InputLabelProps: {
          shrink: true
        }
      }}
      theme={{
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      renderSuggestionsContainer={options => (
        <Popper anchorEl={anchorEl} open={Boolean(options.children)} className={classes.popper}>
          <Paper
            {...options.containerProps}
            className={classes.paper}
            style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}>
            {options.children}
          </Paper>
        </Popper>
      )}
    />
  )
}

AutoSuggest.propTypes = {
  activePodcasts: PropTypes.array
}

const selector = createStructuredSelector({
  activePodcasts: activePodcastsSelector
})

export default connect(selector)(AutoSuggest)
