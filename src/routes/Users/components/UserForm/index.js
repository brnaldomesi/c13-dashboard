import * as Yup from 'yup'

import { Box, Button } from '@material-ui/core'
import React, { useEffect, useMemo, useState } from 'react'

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
import { userRolesSelector } from 'redux/modules/users'

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
    networkID: network.networkId,
    networkName: network.name
  }))

const networksValidator = value => {
  if (value === '') {
    return 'Network is required'
  } else {
    return undefined
  }
}

const getRolesOptions = roles =>
  roles.map(value => ({
    value: value,
    label: value
  }))

const UserForm = ({
  handleSubmit,
  setFieldValue,
  isSubmitting,
  isValid,
  initialValues,
  networks,
  networkDropdownState,
  getPodcasts,
  roles,
  podcastsByNetwork
}) => {
  const { email: initialEmail, networkId: initialNetwork } = initialValues
  const emailValidator = useMemo(() => emailValidationCreator(initialEmail), [initialEmail])
  const { enqueueSnackbar } = useSnackbar()
  const networksOptions = useMemo(() => getNetworksOptions(networks), [networks])
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(networkDropdownState.visibility)
  const [podcasts, setPodcasts] = useState(podcastsByNetwork ? podcastsByNetwork.allSeries : [])
  const rolesOptions = useMemo(() => getRolesOptions(roles), [roles])

  useEffect(() => {
    if (podcastsByNetwork && podcastsByNetwork.allSeries.length > 0) {
      setPodcasts(podcastsByNetwork.allSeries)
      const entitledSeries = podcastsByNetwork.entitledSeries
      if (entitledSeries.length > 0) {
        setFieldValue('seriesIds', entitledSeries.map(podcast => podcast.seriesId))
      }
    }
  }, [setFieldValue, podcastsByNetwork])

  const handleRoleChange = event => {
    const value = event.target.value
    setFieldValue('role', value)
    if (value === rolesOptions[2].value) {
      setNetworkDropdownOpen(true)
    } else {
      setNetworkDropdownOpen(false)
      emptyPodcasts()
    }
  }

  const handleNetworkChange = (event, network) => {
    if (network !== null) {
      const networkId = network.networkID
      setFieldValue('networkId', network)
      getPodcasts({
        networkId,
        success: res => {
          setPodcasts(res.allSeries)
        },
        fail: () => {
          emptyPodcasts()
          enqueueSnackbar('Faield to load podcasts!', { variant: SNACKBAR_TYPE.ERROR })
        }
      })
    } else {
      setFieldValue('networkId', '')
      emptyPodcasts()
    }
  }

  const handlePodcastsChange = event => {
    const values = event.target.value
    if (values.includes('selectAll')) {
      if (values.length - 1 === podcasts.length) {
        setFieldValue('seriesIds', [])
      } else {
        setFieldValue('seriesIds', podcasts.map(podcast => podcast.seriesId))
      }
    } else {
      setFieldValue('seriesIds', event.target.value)
    }
  }

  const emptyPodcasts = () => {
    setFieldValue('seriesIds', [])
    setPodcasts([])
  }

  return (
    <Box p={4} style={{ position: 'relative' }}>
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
          {rolesOptions.length > 0 && (
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
                disabled={networkDropdownState.disabled}
              />
            </Grid>
          )}
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
                optionLabel="networkName"
                validate={networksValidator}
                onChange={handleNetworkChange}
                fullWidth
                variant="outlined"
                margin="normal"
                disabled={networkDropdownState.disabled}
                inputValue={initialNetwork.networkName}
              />
            </Grid>
            <Grid item sm={6}>
              <Field
                multiple
                id="seriesIds"
                name="seriesIds"
                label="Podcasts"
                component={FormSelect}
                options={podcasts}
                onChange={handlePodcastsChange}
                optionLabel="seriesName"
                optionValue="seriesId"
                fullWidth
                variant="outlined"
                margin="normal"
                selectAllOption
              />
            </Grid>
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
  networks: PropTypes.array,
  networkDropdownState: PropTypes.object,
  getPodcasts: PropTypes.func,
  podcastsByNetwork: PropTypes.object
}

const selector = createStructuredSelector({
  networks: networksSelector,
  roles: userRolesSelector
})

const actions = {
  getPodcasts
}

export default connect(
  selector,
  actions
)(UserForm)
