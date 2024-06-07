import { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Search from './pages/Search';
import Register from './pages/Register';
import AddDetails from './pages/AddDetails';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import axios from 'axios';

function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkLoggedIn = async () => {
		try {
			// const response = await axios.get('http://localhost:8000/api/verify-token', {
			await axios.get('http://localhost:8000/api/verify-token', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			});
			setIsLoggedIn(true);
		} catch (error) {
			setIsLoggedIn(false);
		}
	};

	useEffect(() => {
		checkLoggedIn()
	}, []);

	return (
		<>
			<Router>
				<Navbar isLoggedIn={isLoggedIn} onLogin={checkLoggedIn} />
				<Switch>

					<Route path="/" exact component={Home} />

					<Route path="/about" exact component={About} />

					<Route path="/login" exact >
						{isLoggedIn ? <Redirect to="/" /> : <Login onLogin={checkLoggedIn} />}
					</Route>

					<Route path="/search" exact>
						{isLoggedIn ? <Search /> : <Redirect to="/" />}
						{/* <Search isLoggedIn={isLoggedIn} /> */}
					</Route>

					<Route path="/addDetails" exact >
						{isLoggedIn ? <AddDetails /> : <Redirect to="/" />}
					</Route>

					<Route path="/register" exact >
						{isLoggedIn ? <Register /> : <Redirect to="/" />}
					</Route>

					<Route >
						<Home />
						{/* <PageNotFound /> */}
					</Route>

				</Switch>
				<Footer />
			</Router>
		</>
	);
}

export default App;
