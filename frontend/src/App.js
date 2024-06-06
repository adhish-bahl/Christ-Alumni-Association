import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Search from './pages/Search';
import Register from './pages/Register';
import AddDetails from './pages/AddDetails';
import Navbar from './components/Navbar'
import Footer from './components/Footer';

function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				
				<Route path="/" exact component={Home} />

				<Route path="/about" exact component={About} />

				<Route path="/login" exact component={Login} />

				<Route path="/search" exact component={Search} />

				<Route path="/addDetails" exact component={AddDetails} />

				<Route path="/register" exact component={Register} />

				<Route >
					{/* <PageNotFound /> */}
				</Route>

			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
