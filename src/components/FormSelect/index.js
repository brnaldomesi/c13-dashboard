import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import Select from '@material-ui/core/Select'

const FormSelect = ({ capitalize, className, field, form, fullWidth, id, label, helperText, placeholder, options }) => {
  const error = form.touched[field.name] && form.errors[field.name]
  return (
    <FormControl id={id} className={className} error={!!error} fullWidth={fullWidth}>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {label && <InputLabel>{label}</InputLabel>}
      <Select onChange={field.onChange} value={field.value} name={field.name} displayEmpty={!!placeholder}>
        {placeholder && <MenuItem value="">{placeholder}</MenuItem>}
        {options &&
          options.map((option, index) => {
            return option.value ? (
              <MenuItem key={option.value} value={option.value}>
                {capitalize ? option.label.toUpperCase() : option.label}
              </MenuItem>
            ) : (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            )
          })}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

FormSelect.propTypes = {
  capitalize: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string
}

export default FormSelect
