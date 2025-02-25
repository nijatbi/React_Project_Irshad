import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AppSideBar() {
  return (
    <aside>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="index.html">
              <i className="mdi mdi-home menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <NavLink to={'/admin/brand'} className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="mdi mdi-circle-outline menu-icon"></i>
              <span className="menu-title">Brend</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/admin/category'} className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="mdi mdi-circle-outline menu-icon"></i>
              <span className="menu-title">Categories</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/admin/product'} className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="mdi mdi-circle-outline menu-icon"></i>
              <span className="menu-title">Products</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/admin/blog'} className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="mdi mdi-circle-outline menu-icon"></i>
              <span className="menu-title">Blogs</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/admin/contact'} className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="mdi mdi-circle-outline menu-icon"></i>
              <span className="menu-title">Contacts</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/admin/kampaniya'} className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="mdi mdi-circle-outline menu-icon"></i>
              <span className="menu-title">Kampaniyas</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/admin/policy'} className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="mdi mdi-circle-outline menu-icon"></i>
              <span className="menu-title">Policy</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/admin/magaza'} className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="mdi mdi-circle-outline menu-icon"></i>
              <span className="menu-title">Stores</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/admin/vakansiya'} className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="mdi mdi-circle-outline menu-icon"></i>
              <span className="menu-title">Vakansiyas</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/admin/answer'} className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="mdi mdi-circle-outline menu-icon"></i>
              <span className="menu-title">Question-Answer</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/admin/sikayetler'} className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="mdi mdi-circle-outline menu-icon"></i>
              <span className="menu-title">Offer(Sikayetler)</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
