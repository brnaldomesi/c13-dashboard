import * as Yup from 'yup'

import { Box, Button } from '@material-ui/core'
import React, { useMemo, useState } from 'react'
import { getUserSeries, updateUserPreference, userPreferenceSelector } from 'redux/modules/profiles'

import { Field } from 'formik'
import FormAutoComplete from 'components/FormAutoComplete'
import FormInput from 'components/FormInput'
import FormSelect from 'components/FormSelect'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import LoadingIndicator from 'components/LoadingIndicator'
import PropTypes from 'prop-types'
import { SNACKBAR_TYPE } from 'config/constants'
import { asyncValidateField } from 'utils/form'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getPodcasts } from 'redux/modules/media'
import { networksSelector } from 'redux/modules/media'
import { useSnackbar } from 'notistack'

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  role: Yup.string().required('User role is required')
})

const emailValidationCreator = (validateEmailAction, initialEmail) => value =>
  initialEmail !== value ? asyncValidateField(validateEmailAction, 'email', value) : undefined

const getNetworksOptions = networks =>
  networks.map(network => ({
    id: network.networkId,
    name: network.name
  }))

const UserForm = ({
  handleSubmit,
  setFieldValue,
  isSubmitting,
  isValid,
  initialValues,
  rolesOptions,
  networks,
  networkDropdownState,
  updateUserPreference,
  userPreference,
  getUserSeries,
  getPodcasts
}) => {
  const { email: initialEmail } = initialValues
  const emailValidator = useMemo(() => emailValidationCreator(initialEmail), [initialEmail])
  const networksValidator = value => {
    if (value === '') {
      return 'Network is required'
    } else {
      return undefined
    }
  }
  const { enqueueSnackbar } = useSnackbar()
  const networksOptions = useMemo(() => getNetworksOptions(networks), [networks])
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(networkDropdownState)
  const [podcastDropdownOpen, setPodcastDropdownOpen] = useState(false)
  const [podCasts, setPodCasts] = useState([])

  const handleRoleChange = event => {
    const value = event.target.value
    setFieldValue('role', value)
    if (value === rolesOptions[2].value) {
      setNetworkDropdownOpen(true)
    } else {
      setNetworkDropdownOpen(false)
    }
  }

  const handleNetworkChange = (event, network) => {
    if (network !== null) {
      const networkId = network.id
      setFieldValue('networks', networkId)
      getPodcasts({
        networkId,
        success: res => {
          setPodCasts(res.allSeries)
          if (podcastDropdownOpen === false) {
            setPodcastDropdownOpen(true)
          }
        },
        fail: () => enqueueSnackbar('Faield to load podcasts!', { variant: SNACKBAR_TYPE.ERROR })
      })
    } else {
      setFieldValue('networks', '')
    }
  }

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <Field name="firstName" label="First Name" component={FormInput} placeholder="E.g. John" />
          </Grid>
          <Grid item sm={6}>
            <Field name="lastName" label="Last Name" component={FormInput} placeholder="E.g. Doe" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <Field
              name="email"
              label="Email"
              component={FormInput}
              type="email"
              placeholder="e.g. john.doe@email.com"
              validate={emailValidator}
            />
          </Grid>
          <Grid item sm={6}>
            <Field
              name="role"
              label="User Role"
              component={FormSelect}
              options={rolesOptions}
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={handleRoleChange}
            />
          </Grid>
        </Grid>
        {networkDropdownOpen && (
          <Grid container spacing={3}>
            <Grid item sm={6}>
              <Field
                id="networkId"
                name="networkId"
                label="Networks"
                component={FormAutoComplete}
                options={networksOptions}
                optionLabel="name"
                validate={networksValidator}
                onChange={handleNetworkChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            {podcastDropdownOpen && (
              <Grid item sm={6}>
                <Field
                  multiple
                  name="seriesIds"
                  label="Podcasts"
                  component={FormSelect}
                  options={podCasts}
                  //validate={podcastsValidator}
                  //onChange={handlePodcastsChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            )}
          </Grid>
        )}
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <Button color="primary" type="submit" component={Link} to="/users">
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit" disabled={!isValid}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
        {isSubmitting && <LoadingIndicator />}
      </form>
    </Box>
  )
}

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  rolesOptions: PropTypes.array,
  networks: PropTypes.array,
  networkDropdownState: PropTypes.bool,
  updateUserPreference: PropTypes.func,
  userPreference: PropTypes.object,
  getUserSeries: PropTypes.func.isRequired,
  getPodcasts: PropTypes.func
}

const selector = createStructuredSelector({
  networks: networksSelector,
  userPreference: userPreferenceSelector
})

const actions = {
  updateUserPreference,
  getUserSeries,
  getPodcasts
}

export default connect(
  selector,
  actions
)(UserForm)
