import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
	state = {
		userId: this.props.context.authenticatedUser.id,
		title: '',
		description: '',
		estimatedTime: '',
		materialsNeeded: '',
		errors: []
	};

	render() {
		const { context } = this.props;

		const instructor = `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`;

		const {
			title,
			description,
			estimatedTime,
			materialsNeeded,
			errors
		} = this.state;

		return (
			<div className="bounds course--detail">
				<h1>Create Course</h1>
				<div>
					<Form
						cancel={this.cancel}
						errors={errors}
						submit={this.submit}
						submitButtonText="Create Course"
						elements={() => (
							<React.Fragment>
								<div className="grid-66">
									<div className="course--header">
										<h4 className="course--label">Course</h4>
										<input
											id="title"
											name="title"
											type="text"
											className="input-title course--title--input"
											onChange={this.change}
											placeholder="Course title..."
											value={`${title}`}
										/>

										<p>By {`${instructor}`}</p>
									</div>

									<div className="course--description">
										<textarea
											id="description"
											name="description"
											className=""
											onChange={this.change}
											placeholder="Course description..."
											value={`${description}`}
										></textarea>
									</div>
								</div>

								<div className="grid-25 grid-right">
									<div className="course--stats">
										<ul className="course--stats--list">
											<li className="course--stats--list--item">
												<h4>Estimated Time</h4>
												<input
													id="estimatedTime"
													name="estimatedTime"
													type="text"
													className="course--time--input"
													onChange={this.change}
													placeholder="# Hours"
													value={`${estimatedTime}`}
												/>
											</li>
											<li className="course--stats--list--item">
												<h4>Materials Needed</h4>
												<div>
													<textarea
														id="materialsNeeded"
														name="materialsNeeded"
														className=""
														onChange={this.change}
														placeholder="List materials..."
														value={`${materialsNeeded}`}
													></textarea>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</React.Fragment>
						)}
					/>
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
			userId,
			title,
			description,
			estimatedTime,
			materialsNeeded
		} = this.state;

		const authUser = context.authenticatedUser;

		const course = {
			userId,
			title,
			description,
			estimatedTime,
			materialsNeeded
		};

		context.data
			.createCourse(course, authUser.emailAddress, authUser.password)
			.then(errors => {
				if (errors.length) {
					this.setState({ errors });
				} else {
					context.actions
						.signIn(authUser.emailAddress, authUser.password)
						.then(() => {
							this.props.history.push('/');
						});
				}
			})
			.catch(err => {
				this.props.history.push('/error');
			});
	};

	cancel = () => {
		this.props.history.push('/');
	};
}
