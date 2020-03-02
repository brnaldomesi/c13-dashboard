import { Field, Formik } from 'formik'
import React, { useCallback, useState } from 'react'
import { updateUserPreference, userPreferenceSelector } from 'redux/modules/profiles'

import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Fade from '@material-ui/core/Fade'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormSelect from 'components/FormSelect'
import { FormattedDate } from 'react-intl'
import Grid from '@material-ui/core/Grid'
import IconArrowDropDown from '@material-ui/icons/ArrowDropDown'
import { KeyboardDatePicker } from '@material-ui/pickers'
import LoadingIndicator from 'components/LoadingIndicator'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { formSubmit } from 'utils/form'
import fp from 'lodash/fp'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const periodOptions = [
  { value: 'MONTH', label: 'Monthly' },
  { value: 'WEEK', label: 'Weekly' },
  { value: 'DAY', label: 'Daily' }
]

const getPeriodLabel = value =>
  fp.compose(
    fp.get('value'),
    fp.find({ value })
  )(periodOptions)

const initialValues = {
  intervalPeriod: '',
  lifeTimeIntervalFlag: false,
  fromDate: new Date(),
  toDate: new Date()
}

const DatePreferences = ({ updateUserPreference, userPreference }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const handleClick = useCallback(event => {
    setAnchorEl(event.currentTarget)
    setOpen(prev => !prev)
  }, [])

  const handleSubmit = (values, formActions) => {
    return formSubmit(
      updateUserPreference,
      {
        data: values
      },
      formActions
    ).then(() => {
      setOpen(false)
    })
  }

  return (
    <div>
      <Button size="large" onClick={handleClick} className={classes.btnToggler}>
        {userPreference ? (
          <>
            <FormattedDate value={userPreference.fromDate} format="dayMonthAndYear" />
            {' - '}
            <FormattedDate value={userPreference.toDate} format="dayMonthAndYear" />
            {' - '}
            {getPeriodLabel(userPreference.intervalPeriod)}
          </>
        ) : (
          'Loading ...'
        )}
        <IconArrowDropDown />
      </Button>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition disablePortal>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.paper}>
              <Formik onSubmit={handleSubmit} initialValues={userPreference || initialValues} enableReinitialize>
                {({ values, handleChange, setFieldValue, handleSubmit, isSubmitting }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={4} className={classes.row}>
                      <Grid item xs={4} className={classes.col}>
                        <Field
                          name="intervalPeriod"
                          label="View Data"
                          component={FormSelect}
                          options={periodOptions}
                          fullWidth
                          className={classes.field}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.lifeTimeIntervalFlag}
                              onChange={handleChange}
                              name="lifeTimeIntervalFlag"
                              value={true}
                              color="primary"
                            />
                          }
                          label="All"
                        />
                      </Grid>
                      <Grid item className={classes.col}>
                        <div className={classes.divider} />
                      </Grid>
                      <Grid item xs className={classes.col}>
                        <Grid container spacing={4}>
                          <Grid item xs={6}>
                            <KeyboardDatePicker
                              disableToolbar
                              autoOk
                              variant="inline"
                              format="MM/dd/yyyy"
                              label="Start Date"
                              value={values.fromDate}
                              onChange={date => setFieldValue('fromDate', date)}
                              margin="none"
                              KeyboardButtonProps={{
                                'aria-label': 'start date'
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <KeyboardDatePicker
                              disableToolbar
                              autoOk
                              variant="inline"
                              format="MM/dd/yyyy"
                              label="End Date"
                              value={values.toDate}
                              onChange={date => setFieldValue('toDate', date)}
                              margin="none"
                              KeyboardButtonProps={{
                                'aria-label': 'end date'
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} className={classes.right}>
                            <Button variant="outlined" className={classes.btnCancel} onClick={handleClick}>
                              Cancel
                            </Button>
                            <Button variant="contained" color="primary" type="submit">
                              Submit
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {isSubmitting && <LoadingIndicator />}
                  </form>
                )}
              </Formik>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  )
}

const selector = createStructuredSelector({
  userPreference: userPreferenceSelector
})

const actions = {
  updateUserPreference
}

export default connect(
  selector,
  actions
)(DatePreferences)
