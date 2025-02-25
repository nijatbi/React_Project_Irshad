import React from 'react'
import Dashboard from './Dashboard'
import Brand from './components/Brand/Brand'
import BrandDetail from './components/Brand/BrandDetail'
import Contact from './components/Contact/Contact'
import ContactDetail from './components/Contact/ContactDetail'
import KampaniyaList from './components/Kampaniya/KampaniyaList'
import KampaniyaDetail from './components/Kampaniya/KampaniyaDetail'
import BrandCreate from './components/Brand/BrandCreate'
import BrandUpdate from './components/Brand/BrandUpdate'
import PolicyList from './components/Policy/PolicyList'
import PolicyDetail from './components/Policy/PolicyDetail'
import KampaniyaCreate from './components/Kampaniya/KampaniyaCreate'
import TiendaList from './components/Tienda/TiendaList'
import TiendaCreate from './components/Tienda/TiendaCreate'
import TiendaDetail from './components/Tienda/TiendaDetail'
import TiendaUpdate from './components/Tienda/TiendaUpdate'
import Category from './components/Category/Category'
import CategoryDetail from './components/Category/CategoryDetail'
import CreatCategory from './components/Category/CreatCategory'
import BlogList from './components/Blog/BlogList'
import BlogDetail from './components/Blog/BlogDetail'
import BlogCreate from './components/Blog/BlogCreate'
import BlogUpdate from './components/Blog/BlogUpdate'
import VakansiyaList from './components/Vakansiya/VakansiyaList'
import CvList from './components/Vakansiya/CvList'
import VakansiyaDetail from './components/Vakansiya/VakansiyaDetail'
import VakansiyaCreate from './components/Vakansiya/VakansiyaCreate'
import AnswerList from './components/Answer/AnswerList'
import AnswerCreate from './components/Answer/AnswerCreate'
import AnswerDetail from './components/Answer/AnswerDetail'
import AnswerUpdate from './components/Answer/AnswerUpdate'
import Offer from './components/Offer/Offer'
import OfferDetail from './components/Offer/OfferDetail'
import ProductList from './components/Product/ProductList'
import ProductCreate from './components/Product/ProductCreate'
import ProductDetail from './components/Product/ProductDetail'
const routes=[
    { path: '/', exact: true, name: 'Home' },
    // { path: '/dashboard', name: 'Dashboard', element: Dashboard,exact: true  },
    { path: '/Brand', name: 'Brand', element: Brand,exact: true  },
    { path: '/Brand/Create', name: 'Brand-Create', element: BrandCreate,exact: true  },
    { path: '/Brand/Update/:id', name: 'Brand-Update', element: BrandUpdate,exact: true  },
    { path: '/Brand/:id', name: 'Brand-Detail', element: BrandDetail,exact: true  },

    // { path: '/Category/Create', name: 'Category-Create', element: CategoryList,exact: true  },
    { path: '/Policy', name: 'Policy', element: PolicyList,exact: true  },
    { path: '/Policy/:id', name: 'Policy-Detail', element: PolicyDetail,exact: true  },
    { path: '/Contact', name: 'Contact', element: Contact,exact: true  },
    { path: '/Contact/:id', name: 'Contact-Detail', element: ContactDetail,exact: true  },
    { path: '/Kampaniya', name: 'Kampaniya', element: KampaniyaList,exact: true  },
    { path: '/Kampaniya/:id', name: 'Kampaniya-Detail', element: KampaniyaDetail,exact: true  },
    { path: '/Kampaniya/Create', name: 'Kampaniya-Create', element: KampaniyaCreate,exact: true  },
    { path: '/magaza', name: 'Magaza', element:TiendaList,exact: true  },
    { path: '/magaza/create', name: 'Magaza-Creata', element:TiendaCreate,exact: true  },
    {path:'/magaza/:id',name:'Magaza-Detail',element:TiendaDetail,exact:true},
    {path:'/magaza/update/:id',name:'Magaza-Update',element:TiendaUpdate,exact:true},
    {path:'/category',name:'Category',element:Category,exact:true},
    {path:'/category/:id',name:'Category-Detail',element:CategoryDetail,exact:true },
    {path:'/category/create',name:'Category-Create',element:CreatCategory,exact:true },
    {path:'/blog',name:'Blog',element:BlogList,exact:true},
    {path:'/blog/:id',name:'Blog-Detail',element:BlogDetail,exact:true},
    {path:'/blog/create',name:'Blog-Create',element:BlogCreate,exact:true},
    {path:'/blog/update/:id',name:'Blog-Update',element:BlogUpdate,exact:true},
    {path:'/vakansiya',name:'Vakansiya',element:VakansiyaList,exact:true},
    { path: '/vakansiya/cv/:name', name: 'Vakansiya-CV', element: CvList, exact: true },
    {path:'/vakansiya/create' ,name:'Vakansiya-Create' ,element:VakansiyaCreate, exact:true},
    {path:'/answer',name:'Answer',element:AnswerList,exact:true},
    {path:'/answer/:id',name:'Answer-Detail',element:AnswerDetail,exact:true},
    {path:'/answer/create',name:'Answer-Create',element:AnswerCreate,exact:true},
    {path:'/answer/update/:id',name:'Answer-Update',element:AnswerUpdate,exact:true},
    {path:'/sikayetler',name:'Offer',element:Offer,exact:true},
    {path:'/sikayetler/:id',name:'Offer-Detail',element:OfferDetail,exact:true},
    { path: '/product', name: 'Product', element: ProductList,exact: true  },
    { path: '/product/:id', name: 'Product-Detail', element: ProductDetail,exact: true  },

    { path: '/product/create', name: 'Product-Create', element: ProductCreate,exact: true  },


    // { path: '/Kampaniya', name: 'Kampaniya', element: ,exact: true  },
    // { path: '/Kampaniya', name: 'Kampaniya', element: KampaniyaList,exact: true  },

]
export default routes