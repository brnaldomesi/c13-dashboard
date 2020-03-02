import Autocomplete from '@material-ui/lab/Autocomplete'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import PropTypes from 'prop-types'
import React from 'react'
import { TextField } from '@material-ui/core'

const FormAutoComplete = ({
  className,
  field,
  form,
  fullWidth,
  label,
  helperText,
  options,
  optionLabel,
  variant,
  margin,
  onChange
}) => {
  const error = form.touched[field.name] && form.errors[field.name]
  return (
    <FormControl className={className} error={!!error} fullWidth={fullWidth} variant={variant} margin={margin}>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <Autocomplete
        options={options}
        getOptionLabel={option => option[optionLabel]}
        onChange={onChange}
        onBlur={field.onBlur}
        id={field.name}
        renderInput={params => <TextField {...params} label={label} variant={variant} error={Boolean(error)} />}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

FormAutoComplete.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  options: PropTypes.array.isRequired,
  variant: PropTypes.string,
  margin: PropTypes.string,
  onChange: PropTypes.func,
  optionLabel: PropTypes.string
}

export default FormAutoComplete
