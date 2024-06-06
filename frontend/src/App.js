import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Search from './pages/Search';
import Navbar from './components/Navbar'

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
        
    //   </header>
    // </div>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/search" component={Search} />
      </Switch>
    </Router>
  );
}

export default App;
