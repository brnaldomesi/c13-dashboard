import React, { useState } from 'react'

import get from 'lodash/get'

const desc = (a, b, orderBy) => {
  if (get(b, orderBy) < get(a, orderBy)) {
    return -1
  }
  if (get(b, orderBy) > get(a, orderBy)) {
    return 1
  }
  return 0
}

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const getSorting = (order, orderBy) => {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

const withSortHandler = ({ listPropName, orderParam, orderByParam }) => WrappedComponent => {
  const SortHandlerWrapper = props => {
    const [order, setOrder] = useState(orderParam ? orderParam : 'asc')
    const [orderBy, setOrderBy] = useState(orderByParam ? orderByParam : 'name')

    const handleRequestSort = property => {
      const isDesc = orderBy === property && order === 'desc'
      setOrder(isDesc ? 'asc' : 'desc')
      setOrderBy(property)
    }

    const list = get(props, listPropName) || []
    const finalProps = {
      ...props,
      sortProps: {
        order,
        orderBy,
        onRequestSort: handleRequestSort,
        sortedList: stableSort(list, getSorting(order, orderBy))
      }
    }

    return <WrappedComponent {...finalProps} />
  }
  return SortHandlerWrapper
}

export default withSortHandler
