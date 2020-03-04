import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
	state = {
		firstName: '',
		lastName: '',
		emailAddress: '',
		password: '',
		confirmPassword: '',
		errors: []
	};

	render() {
		const {
			firstName,
			lastName,
			emailAddress,
			password,
			confirmPassword,
			errors
		} = this.state;

		return (
			<div className="bounds">
				<div className="grid-33 centered signin">
					<h1>Sign Up</h1>
					<Form
						cancel={this.cancel}
						errors={errors}
						submit={this.submit}
						submitButtonText="Sign Up"
						elements={() => (
							<React.Fragment>
								<input
									autoFocus
									id="firstName"
									name="firstName"
									type="text"
									className=""
									onChange={this.change}
									placeholder="First Name"
									value={firstName}
								/>
								<input
									id="lastName"
									name="lastName"
									type="text"
									className=""
									onChange={this.change}
									placeholder="Last Name"
									value={lastName}
								/>
								<input
									id="emailAddress"
									name="emailAddress"
									type="text"
									className=""
									onChange={this.change}
									placeholder="Email Address"
									value={emailAddress}
								/>
								<input
									id="password"
									name="password"
									type="password"
									className=""
									onChange={this.change}
									placeholder="Password"
									value={password}
								/>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									className=""
									onChange={this.change}
									placeholder="Confirm Password"
									value={confirmPassword}
								/>
							</React.Fragment>
						)}
					/>
					<p>
						Already have an account? <NavLink to="/signin">Click here</NavLink>{' '}
						to sign in!
					</p>
				</div>
			</div>
		);
	}

	change = event => {
		const name = event.target.name;
		const value = event.target.value;

		this.setState(() => {
			return {
				[name]: value
			};
		});
	};

	submit = () => {
		const { context } = this.props;

		const {
			firstName,
			lastName,
			emailAddress,
			password,
			confirmPassword
		} = this.state;

		const user = {
			firstName,
			lastName,
			emailAddress,
			password,
			confirmPassword
		};

		const passwordError = { message: 'Passwords must match' };

		if (password === confirmPassword) {
			context.data
				.createUser(user)
				.then(errors => {
					if (errors.length) {
						this.setState({ errors });
					} else {
						context.actions.signIn(emailAddress, password).then(() => {
							this.props.history.push('/');
						});
					}
				})
				.catch(err => {
					this.props.history.push('/error');
				});
		} else {
			this.setState({ errors: [passwordError] });
		}
	};

	cancel = () => {
		this.props.history.push('/');
	};
}
