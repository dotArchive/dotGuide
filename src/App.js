import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';

/****COMPONENTS****/
import Home from './components/Home';
import AddGuide from './components/Guide/AddGuide/AddGuide';
import Login from '../src/components/User/Login';
import Signup from '../src/components/User/Signup';

function App() {
	return (
		<div id="app">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/guide/add" element={<AddGuide />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
