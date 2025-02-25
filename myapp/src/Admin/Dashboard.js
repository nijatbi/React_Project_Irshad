import React from 'react'
import { BrowserRouter,Route,Routes,Link,NavLink, Router,HashRouter } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import { CSpinner } from '@coreui/react'
import Login from './view/Login';
import { Suspense } from 'react';
export default function Dashboard() {
  return (
    <Suspense
    fallback={
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    }
  >
    <Routes>
          <Route path='/login' name='Login Page' element={<Login></Login>}></Route>
          <Route path="*" name="Home" element={<DefaultLayout />} />
    </Routes>
</Suspense>
  )
}
