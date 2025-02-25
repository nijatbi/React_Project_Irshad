import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './components/account/Login';
import Register from './components/account/Register';
import Kampaniya from './components/kampaniya/kampaniya';
import Otp from './components/account/Otp';
import Contact from './components/Contact/Contact';
import Sikayet from './components/Contact/Sikayet';
import KampaniyaItem from './components/kampaniya/KampaniyaItem';
import Policy from './components/Policy/Policy';
import Magaza from './components/Magaza/Magaza';
import Blog from './components/Blog/Blog';
import BlogItem from './components/Blog/BlogItem'
import VakansiyaList from './components/Vakansiya/VakansiyaList'
import  VakansiyaItem from './components/Vakansiya/VakansiyaItem'
import Muraciet from './components/Vakansiya/Muraciet';
import SualCavab from './components/Answer/SualCavab';
function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login></Login>}></Route>
      <Route path='/Register' element={<Register></Register>}></Route>
      <Route path='/verifywithOTP' element={<Otp></Otp>}></Route>
      <Route path='/magazalar' element={<Magaza></Magaza>}></Route>
      <Route path='/kampaniya' element={<Kampaniya></Kampaniya>}></Route>
      <Route path='/kampaniya/:id' element={<KampaniyaItem></KampaniyaItem>}></Route>
      <Route path='/korporativ' element={<Contact></Contact>}></Route>
    <Route path='/sikayet-ve-teklifler' element={<Sikayet></Sikayet>}></Route>
    <Route path='/mexfilik-siyaseti' element={<Policy></Policy>}></Route>
    <Route path='/Verify/:email/:token' element={<Otp></Otp>}></Route>
    <Route path='/blog' element={<Blog></Blog>}></Route>
    <Route path='/blog/:id' element={<BlogItem></BlogItem>}></Route>
    <Route path='/vakansiyalar' element={<VakansiyaList></VakansiyaList>}></Route>
    <Route path='/vakansiyalar/:id' element={<VakansiyaItem></VakansiyaItem>}></Route>
    <Route path='/vakansiyalar/muraciet-et/:id' element={<Muraciet></Muraciet>}></Route>
    <Route path='/sual-cavab' element={<SualCavab></SualCavab>}></Route>


    </Routes>
  );
}

export default App;
