import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Profile from './components/User/Profile'

/****COMPONENTS****/
import Home from './components/Home'
import Login from '../src/components/User/Login'
import Signup from '../src/components/User/Signup'
import AddGuide from './components/Guide/AddGuide/AddGuide'
import SingleGuide from './components/Guide/SingleGuide/SingleGuide'
import SingleGuideBody from './components/Guide/SingleGuide/SingleGuideBody'
import EditUser from './components/User/EditUser'

function App() {
  return (
    <div id="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditUser />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/guide/add" element={<AddGuide />} />
          <Route exact path="/guide/:guideId" element={<SingleGuide />} />
          <Route path="/guide/:guideId/body" element={<SingleGuideBody />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
