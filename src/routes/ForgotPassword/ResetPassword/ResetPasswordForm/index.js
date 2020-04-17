import Button from '@material-ui/core/Button'
import { Field } from 'formik'
import FormInput from 'components/FormInput'
import LoadingIndicator from 'components/LoadingIndicator'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import styles from '../../../Login/LoginForm/styles'
import { withStyles } from '@material-ui/core/styles'

const ResetPasswordForm = ({ classes, errors, handleSubmit, isSubmitting }) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="password"
      type="password"
      placeholder="New Password"
      component={FormInput}
      fullWidth
      className={classes.field}
    />
    <Field
      name="confirmPassword"
      type="password"
      placeholder="Confirm Password"
      component={FormInput}
      fullWidth
      className={classes.field}
    />
    {errors.globalError && (
      <Typography color="error" align="center" className={classes.error}>
        Invalid password
      </Typography>
    )}
    <section className={classes.sectionSubmit}>
      <div></div>
      <Button variant="contained" color="primary" type="submit">
        Continue
      </Button>
    </section>
    {isSubmitting && <LoadingIndicator />}
  </form>
)

ResetPasswordForm.propTypes = {
  classes: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool
}

export default withStyles(styles)(ResetPasswordForm)
