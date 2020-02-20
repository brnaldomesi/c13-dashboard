import React, { useEffect } from 'react'
import { getActivePodcasts, getMediaRankingTables, getNetworks } from 'redux/modules/media'
import { getUsersList, userPreferenceSelector, usersListSelector } from 'redux/modules/profiles'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isAuthenticatedOrRedir } from 'hocs/withAuth'
import styles from './styles'
import withLocationToPreference from 'hocs/withLocationToPreference'
import { withStyles } from '@material-ui/core/styles'

export const Users = ({
  getUsersList,
  users,
  getActivePodcasts,
  userPreference,
  getMediaRankingTables,
  getNetworks
}) => {
  const columns = [
    { title: 'Name', field: 'fullName' },
    { title: 'Network', field: 'networkName' },
    { title: 'Email', field: 'email' }
  ]

  useEffect(() => {
    getUsersList()
  }, [getUsersList])

  useEffect(() => {
    getActivePodcasts()
  }, [getActivePodcasts])

  useEffect(() => {
    getNetworks()
  }, [getNetworks, getMediaRankingTables])

  if (users !== null) {
    users = users.map(item => ({
      ...item,
      fullName: item.firstName + ' ' + item.lastName,
      networkName: item.network.networkName
    }))

    users = users.sort((a, b) => (a.fullName > b.fullName ? 1 : b.fullName > a.fullName ? -1 : 0))
  }

  return (
    <Container maxWidth="xl">
      <Box width="100%">
        <MaterialTable
          title="Users"
          columns={columns}
          data={users !== null ? users : []}
          actions={[
            {
              icon: 'add_box',
              tooltip: 'Add User',
              isFreeAction: true,
              onClick: event => alert('You want to add a new row')
            },
            {
              icon: 'save',
              tooltip: 'Edit User',
              onClick: (event, rowData) => alert('You saved ' + rowData.name)
            },
            {
              icon: 'delete',
              tooltip: 'Delete User',
              onClick: (event, rowData) => alert('You want to delete ' + rowData.name)
            }
          ]}
          options={{
            actionsColumnIndex: -1,
            pageSize: 10,
            pageSizeOptions: [10, 30, 50, 100]
          }}
        />
      </Box>
    </Container>
  )
}

Users.propTypes = {
  getUsersList: PropTypes.func.isRequired,
  getActivePodcasts: PropTypes.func.isRequired,
  getMediaRankingTables: PropTypes.func.isRequired,
  getNetworks: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  users: usersListSelector,
  userPreference: userPreferenceSelector
})

const actions = {
  getUsersList,
  getActivePodcasts,
  getMediaRankingTables,
  getNetworks
}

export default compose(
  isAuthenticatedOrRedir,
  connect(
    selector,
    actions
  ),
  withLocationToPreference,
  withStyles(styles)
)(Users)
