import React, { Component } from 'react'
import { Message, Grid, Form, Segment, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { login } from './actions/actions'

@connect((store) => {
	return {
		user: store.stateManager,
	}
})
export default class LoginPage extends Component {

	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: "",
			loggingIn: false,
			error: false,
		}

	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

	handleSubmit = () => {
		const { username, password } = this.state
		this.setState({ loggingIn: true })
		this.setState({ name: username, password: password })
		this.props.dispatch(login(username, password))
	}

	registerSuccess(text){
		return <Message positive>"Successful Registration</Message>
	}

	handleError(type){
		return (
			<Message attached="bottom" color="red">
				{this.props.user.error[type]}
			</Message>
		)
	}

    handleErrors(type) {
        if (this.props.user.error[type] !== undefined) {
			this.setState({ loggingIn: false })
			this.setState({ error: true })			
        }
	}

	render() {

		return (
			<div className='login-form'>
				<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
					<Grid.Column style={{ maxWidth: 450 }}>

						<Form size='large' onSubmit={this.handleSubmit}>
							<Segment stacked>
								<Form.Input
									error={this.handleErrors("username") !== undefined}
									fluid
									icon='user'
									name="username"
									value={this.state.username}
									onChange={this.handleChange}
									iconPosition='left'
									placeholder="Username"
								/>	

								<Form.Input
									error={this.handleErrors("password") !== undefined}								
									fluid
									icon='lock'
									name="password"
									value={this.state.password}
									onChange={this.handleChange}							
									iconPosition='left'
									placeholder="Password"
									type='password'
								/>

								<Button 
									loading={this.props.user.error !== undefined && this.state.loggingIn}
									type='submit' 
									fluid 
									size='large'>Log in</Button>
							</Segment>
						</Form>
						
						{ this.state.loggingIn ? this.handleErrors("non_field_errors") : null }
						{ this.state.error ? this.handleError("non_field_errors") : null }
					</Grid.Column>
				</Grid>
			</div>
		)
	}
}