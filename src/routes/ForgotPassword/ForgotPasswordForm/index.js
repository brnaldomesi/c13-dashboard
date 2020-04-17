import Button from '@material-ui/core/Button'
import { Field } from 'formik'
import FormInput from 'components/FormInput'
import { Link } from 'react-router-dom'
import LoadingIndicator from 'components/LoadingIndicator'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import styles from '../../Login/LoginForm/styles'
import { withStyles } from '@material-ui/core/styles'

const ForgotPasswordForm = ({ classes, errors, handleSubmit, isSubmitting }) => (
  <form onSubmit={handleSubmit}>
    <Field name="email" type="text" placeholder="Email" component={FormInput} fullWidth className={classes.field} />

    {errors.globalError && (
      <Typography color="error" align="center" className={classes.error}>
        Invalid email
      </Typography>
    )}
    <section className={classes.sectionSubmit}>
      <Button component={Link} to="/login">
        Back
      </Button>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </section>
    {isSubmitting && <LoadingIndicator />}
  </form>
)

ForgotPasswordForm.propTypes = {
  classes: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool
}

export default withStyles(styles)(ForgotPasswordForm)
