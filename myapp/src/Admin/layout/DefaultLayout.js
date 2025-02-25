import React from 'react'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import AppSideBar from '../components/AppSideBar'
import AppContent from '../components/AppContent'

export default function DefaultLayout() {
  return (
    <div>
      <AppHeader></AppHeader>
      <div className='container-fluid page-body-wrapper'>
          <AppSideBar></AppSideBar>
          <div className='main-panel'>
          <AppContent></AppContent>
          <AppFooter></AppFooter> 

          </div>
      </div>
      
    </div>
  )
}
