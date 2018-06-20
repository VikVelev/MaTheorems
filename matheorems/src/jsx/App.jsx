import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './Navbar'
import '../styles/App.css';
import { connect } from 'react-redux';
import MainPage from './MainPage';
import Login from './Login';
import Register from './Register'
import Theorem from './Theorem';
import Add from './Add'


@connect((store) => {
	return {
		state: store.stateManager,
	}
})
class App extends Component {

  	render() {
		console.log(this.props)
    	return (
			<Router className="App">
				<div className="content">
					<Navbar loggedIn={this.props.state.loggedIn}/>
					<Switch>
						<Route exact path="/" component={this.routes.Main} />
						<Route exact path="/add" component={this.routes.Add} />
						<Route exact path="/login" component={this.routes.Login} />
						<Route exact path="/register" component={this.routes.Register} />											
						<Route exact path="/theorem/:id" component={this.routes.Theorem} />
					</Switch>
				</div>		
			</Router>
    	);
	}

	routes = {
		Main: () => ( <MainPage/> ),
		Login: () => ( this.props.state.loggedIn ? <Redirect to="/"/> : <Login/> ),
		Register: () => ( this.props.state.loggedIn ? <Redirect to="/"/> : <Register/> ),
		Add: () => ( this.props.state.loggedIn ? <Add/> : <Redirect to='/login'/> ),
		Theorem: (id) => ( <Theorem id={id.match.params.id}/> ), 
	}
	  

}

export default App;
