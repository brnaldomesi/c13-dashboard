import { Container, Paper } from '@material-ui/core'
import React, { useEffect } from 'react'
import UserForm, { validationSchema } from '../../components/UserForm'
import { editPrivileges, updateUser } from 'redux/modules/users'
import { getPodcastsByNetwork, podcastsByNetworkLoadingSelector, podcastsByNetworkSelector } from 'redux/modules/media'

import { Formik } from 'formik'
import LoadingIndicator from 'components/LoadingIndicator'
import PropTypes from 'prop-types'
import { SNACKBAR_TYPE } from 'config/constants'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { formSubmit } from 'utils/form'
import isEqual from 'lodash/isEqual'
import { makeStyles } from '@material-ui/core/styles'
import pick from 'lodash/pick'
import styles from './styles'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(styles)

export const UserEdit = ({ history, updateUser, getPodcastsByNetwork, podcastsByNetwork, loading, editPrivileges }) => {
  const {
    location: { state: user }
  } = history
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()

  useEffect(() => {
    if (user.role === 'Network User') {
      getPodcastsByNetwork({
        networkId: user.networkId.networkID,
        profileId: user.profileId,
        fail: () => {
          enqueueSnackbar('Faield to load podcasts by network!', { variant: SNACKBAR_TYPE.ERROR })
        }
      })
    }
  }, [getPodcastsByNetwork, enqueueSnackbar, user])

  const handleSubmit = (values, actions) => {
    const strongUpdateData = pick(
      {
        ...values,
        profileId: user.profileId
      },
      ['firstName', 'lastName', 'email', 'profileId']
    )

    if (user.role === 'Network User') {
      const editPrivilegesData = pick(
        {
          ...values,
          networkId: user.networkId.networkID,
          profileId: user.profileId
        },
        ['networkId', 'seriesIds', 'profileId']
      )
      const previousSeries = podcastsByNetwork.entitledSeries.map(podcast => podcast.seriesId).sort()

      if (!isEqual(values.seriesIds.sort(), previousSeries)) {
        editPrivileges({
          data: editPrivilegesData
        })
      }
    }

    return formSubmit(
      updateUser,
      {
        data: strongUpdateData,
        success: () => {
          enqueueSnackbar('User updated!', { variant: SNACKBAR_TYPE.SUCCESS })
          history.push({
            pathname: '/users/' + user.profileId,
            state: {
              ...strongUpdateData,
              role: user.role,
              networkId: user.networkId,
              seriesIds: []
            }
          })
        },
        fail: err => {
          enqueueSnackbar(err.data.message, { variant: SNACKBAR_TYPE.ERROR })
        }
      },
      actions
    )
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h6" gutterBottom>
        Edit a User
      </Typography>
      <Paper>
        {loading ? (
          <div className={classes.center}>
            <LoadingIndicator isStatic size={32} />
          </div>
        ) : (
          <Formik
            initialValues={user}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur
            validationSchema={validationSchema}>
            {formikProps => (
              <UserForm
                {...formikProps}
                networkDropdownState={{
                  visibility: user.role === 'Network User' ? true : false,
                  disabled: true
                }}
                podcastsByNetwork={user.role === 'Network User' ? podcastsByNetwork : undefined}
              />
            )}
          </Formik>
        )}
      </Paper>
    </Container>
  )
}

UserEdit.propTypes = {
  updateUser: PropTypes.func.isRequired,
  getPodcastsByNetwork: PropTypes.func.isRequired,
  editPrivileges: PropTypes.func.isRequired
}

const actions = {
  updateUser,
  getPodcastsByNetwork,
  editPrivileges
}

const selector = createStructuredSelector({
  podcastsByNetwork: podcastsByNetworkSelector,
  loading: podcastsByNetworkLoadingSelector
})

export default compose(
  withRouter,
  connect(
    selector,
    actions
  )
)(UserEdit)
