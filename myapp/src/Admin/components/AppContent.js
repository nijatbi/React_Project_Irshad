import React from 'react'
import routes from '../../Admin/routes'
import { Routes,Route } from 'react-router-dom'
import { Suspense } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { Navigate } from 'react-router-dom'

export default function AppContent() {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}
