import React, { useEffect, useRef, useState } from 'react'

import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import Select from '@material-ui/core/Select'

const FormSelect = ({
  capitalize,
  className,
  field,
  form,
  fullWidth,
  id,
  label,
  helperText,
  placeholder,
  options,
  variant,
  margin,
  onChange,
  value,
  optionLabel,
  optionValue,
  multiple,
  disabled,
  selectAllOption
}) => {
  const error = form.touched[field.name] && form.errors[field.name]
  const inputLabel = useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)

  useEffect(() => {
    if (inputLabel.current !== null) {
      setLabelWidth(inputLabel.current.offsetWidth)
    }
  }, [inputLabel])

  return (
    <FormControl id={id} className={className} error={!!error} fullWidth={fullWidth} variant={variant} margin={margin}>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {label && <InputLabel ref={inputLabel}>{label}</InputLabel>}
      <Select
        multiple={multiple}
        onChange={onChange ? onChange : field.onChange}
        onBlur={field.onBlur}
        value={value ? value : field.value}
        name={field.name}
        displayEmpty={!!placeholder}
        labelWidth={labelWidth}
        disabled={disabled}>
        {selectAllOption && options.length > 0 && (
          <MenuItem key="selectAll" value="selectAll">
            Select all
          </MenuItem>
        )}
        {placeholder && <MenuItem value="">{placeholder}</MenuItem>}
        {options &&
          options.map((option, index) => {
            return option[optionValue] ? (
              <MenuItem key={option[optionValue]} value={option[optionValue]}>
                {capitalize ? option[optionLabel].toUpperCase() : option[optionLabel]}
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
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  margin: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  optionLabel: PropTypes.string,
  optionValue: PropTypes.string,
  multiple: PropTypes.bool,
  selectAllOption: PropTypes.bool
}

FormSelect.defaultProps = {
  optionLabel: 'label',
  optionValue: 'value'
}

export default FormSelect
