import React, { Suspense } from 'react'
import Loading from '@components/loading'

function lazyLoad(Component) {
    return (
        <Suspense fallback={<Loading />}>
            <Component />
        </Suspense>
    )
}

export default lazyLoad
