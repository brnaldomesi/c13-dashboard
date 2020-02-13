import AutoSuggest from 'components/AutoSuggest'
import { Formik } from 'formik'
import InputBase from '@material-ui/core/InputBase'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import ThumbnailImage from 'components/ThumbnailImage'
import { compose } from 'redux'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import styles from './styles'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams'
import { withStyles } from '@material-ui/core'

const renderInputComponent = classes => inputProps => {
  const { inputRef = () => {}, ref, InputLabelProps, ...other } = inputProps

  return (
    <div className={classes.inputWrapper}>
      <div className={classes.searchIcon}>
        <SearchIcon className={classes.flipY} />
      </div>
      <InputBase
        {...other}
        name="search"
        placeholder="Find a podcast..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ 'aria-label': 'search' }}
        inputRef={node => {
          ref(node)
          inputRef(node)
        }}
      />
    </div>
  )
}

const renderSuggestion = classes => (suggestion, { query, isHighlighted }) => {
  const value = getSuggestionValue(suggestion)
  const matches = match(value, `${query}`)
  const parts = parse(value, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <ThumbnailImage imageUrls={suggestion.imageUrl} className={classes.suggestionImage} />
      <div className={classes.suggestionText}>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 700 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  )
}

const getSuggestionValue = suggestion => suggestion.seriesName

export const HeaderSearchForm = ({ classes, pushWithQuery, queryParams }) => {
  const handleSelectSuggestion = suggestion => {
    pushWithQuery({
      location: { pathname: `/${suggestion.networkId}/${suggestion.seriesId}` }
    })
  }
  const initialValues = {
    search: queryParams.search || ''
  }

  return (
    <Formik initialValues={initialValues}>
      {({ setFieldValue, values }) => (
        <form className={classes.root}>
          <AutoSuggest
            name="search"
            getSuggestionValue={getSuggestionValue}
            inputComponent={renderInputComponent(classes)}
            suggestionComponent={renderSuggestion(classes)}
            onChange={value => setFieldValue('search', value)}
            onSuggestionSelected={handleSelectSuggestion}
            value={values.search || ''}
          />
        </form>
      )}
    </Formik>
  )
}

HeaderSearchForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withRouterAndQueryParams,
  withStyles(styles)
)(HeaderSearchForm)
