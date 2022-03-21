import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

/****COMPONENTS****/
import Home from "./components/Home";
import AddPost from "./components/Post/UpdatePost/AddPost";
import AllPosts from "./components/Post/AllPosts";
import Login from "../src/components/User/Login";
import Signup from "../src/components/User/Signup";

function App() {
  return (
    <div id="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/posts" element={<AllPosts />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
