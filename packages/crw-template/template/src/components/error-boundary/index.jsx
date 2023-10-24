import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorBoundary() {
    const error = useRouteError()
    console.error(error)
    return (<>出错了~~</>)
}

export default ErrorBoundary
