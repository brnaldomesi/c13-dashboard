export const formSubmit = (actionCreator, payload, formActions) => {
  formActions.setSubmitting(true)
  actionCreator({
    ...payload,
    resolve: () => {
      formActions.setSubmitting(false)
    },
    reject: ex => {
      const res = ex.response ? ex.response : ex
      const errors = res.data || res.error || res // TODO: assumes backend response are wrapped within data or error field

      if (typeof errors === 'object') {
        const { detail, fieldErrors, ...otherFieldErrors } = errors

        formActions.setErrors({
          globalError: detail,
          ...fieldErrors,
          ...otherFieldErrors
        })
      } else {
        formActions.setErrors({
          globalError: typeof errors === 'string' ? errors : 'Internal Server Error'
        })
      }

      formActions.setSubmitting(false)
    }
  })
}

export const asyncValidate = (actionCreator, payload) =>
  new Promise((resolve, reject) => {
    actionCreator({
      ...payload,
      resolve: () => resolve(),
      reject
    })
  })

export const asyncValidateField = (actionCreator, field, value) =>
  value
    ? asyncValidate(actionCreator, {
        data: { [field]: value }
      })
        .then(() => {})
        .catch(ex => {
          if (ex.status === 400) {
            throw ex.data
          }
        })
    : Promise.resolve()
