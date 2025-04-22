import './App.css'
import Home from './pages/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import AddBook from './components/AddBook'
import AddAuthor from './components/AddAuthor'
import ViewAuthors from './components/ViewAuthors'
import ViewUsers from './components/ViewUsers'
import ViewBooks from './components/ViewBooks'
import UpdateBook from './components/UpdateBook'
import AuthorDetails from './components/AuthorDetails'

import Footer from './components/Footer'
import ViewBook from './pages/ViewBook'
import Admin from './pages/Admin'
import Cart from './pages/Cart'

import Can from './Can'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*  <Route path="/admin" element={<Can
            perform="dashboard"
            yes={() => <Admin />}
            no={() => <p>GO AWAY!</p>}
    /> } />  */}

        <Route path="/admin" element={<Admin />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/addauthor" element={<AddAuthor />} />
        <Route path="/viewauthors" element={<ViewAuthors />} />
        <Route path="/viewusers" element={<ViewUsers />} />
        <Route path="/viewbooks" element={<ViewBooks />} />
        <Route path="/updatebook" element={<UpdateBook />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/books/:id" element={<ViewBook />} />
        <Route path="/authordetails" element={<AuthorDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
