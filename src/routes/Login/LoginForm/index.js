import Button from '@material-ui/core/Button'
import { Field } from 'formik'
import FormCheckbox from 'components/FormCheckbox'
import FormInput from 'components/FormInput'
import Link from '@material-ui/core/Link'
import LoadingIndicator from 'components/LoadingIndicator'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import styles from './styles'
import { withStyles } from '@material-ui/core/styles'

const LoginForm = ({ classes, errors, handleSubmit, isSubmitting }) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="username"
      type="text"
      placeholder="Username"
      component={FormInput}
      fullWidth
      className={classes.field}
    />
    <Field
      name="password"
      type="password"
      placeholder="Password"
      component={FormInput}
      fullWidth
      className={classes.field}
    />
    <Field
      name="remeberme"
      label="Remeber Me"
      toggleValues={[false, true]}
      component={FormCheckbox}
      className={classes.field}
    />
    {errors.globalError && (
      <Typography color="error" align="center" className={classes.error}>
        Invalid username or password
      </Typography>
    )}
    <section className={classes.sectionSubmit}>
      <Link href="/forgotPassword" className={classes.link}>
        <Typography align="center">Forgot password?</Typography>
      </Link>
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </section>
    {isSubmitting && <LoadingIndicator />}
  </form>
)

LoginForm.propTypes = {
  classes: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool
}

export default withStyles(styles)(LoginForm)
