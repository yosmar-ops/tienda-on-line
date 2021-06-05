import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Modal from "./components/Modal";
function App() {
  return (
    <div className="App">
     	<React.Fragment>
			<NavBar />
			<Switch>	
				<Route exact path="/" component={ProductList}/>
				<Route path="/details" component={Details}/>
				<Route path="/cart" component={Cart}/>
				<Route component={Default}/>
			</Switch>
			<Modal />
		</React.Fragment>		 
    </div>
  );
}


export default App;

/*class App extends Component{
	render(){
		<div className="container">
			<div className="row">
				<div className="col-6">coolumn number one</div>
				<div className="col-6">coolumn number two</div>
			</div>
		</div>		
	}
}*/



