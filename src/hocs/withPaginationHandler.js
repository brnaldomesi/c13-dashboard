import React, { useCallback, useMemo, useState } from 'react'
import get from 'lodash/get'

const rowsPerPageOptions = [5, 10, 25]

const withPaginationHandler = ({ listPropName }) => WrappedComponent => {
  const SortHandlerWrapper = props => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const list = get(props, listPropName) || []

    const handleChangePage = useCallback(
      (event, newPage) => {
        setPage(newPage)
      },
      [setPage]
    )

    const handleChangeRowsPerPage = useCallback(
      event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
      },
      [setRowsPerPage, setPage]
    )

    const paginatedList = useMemo(() => list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [
      list,
      page,
      rowsPerPage
    ])

    const finalProps = {
      ...props,
      paginationProps: {
        paginatedList,
        rowsPerPage,
        page,
        rowsPerPageOptions,
        onChangePage: handleChangePage,
        onChangeRowsPerPage: handleChangeRowsPerPage
      }
    }

    return <WrappedComponent {...finalProps} />
  }
  return SortHandlerWrapper
}

export default withPaginationHandler
