import { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
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
	const history = useHistory();

	const checkLoggedIn = async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/verify-token', {
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

		console.log(isLoggedIn)
	}, []);

	return (
		<>
			<Router>
				<Navbar isLoggedIn={isLoggedIn} />
				<Switch>

					<Route path="/" exact component={Home} />

					<Route path="/about" exact component={About} />

					<Route path="/login" exact >
						<Login onLogin={checkLoggedIn} />
					</Route>

					<Route path="/search" exact component={Search} />

					<Route path="/addDetails" exact component={AddDetails} />

					<Route path="/register" exact component={Register} />

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
