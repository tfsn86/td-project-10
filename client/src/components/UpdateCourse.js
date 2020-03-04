import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
	state = {
		id: this.props.match.params.id,
		instructor: '',
		userId: null,
		title: '',
		description: '',
		estimatedTime: '',
		materialsNeeded: '',
		errors: []
	};

	componentDidMount() {
		const { context } = this.props;

		context.data
			.getCourseDetail(this.state.id)
			.then(course => {
				this.setState({
					instructor: course.User.firstName + ' ' + course.User.lastName,
					userId: course.userId,
					title: course.title,
					description: course.description,
					estimatedTime: course.estimatedTime,
					materialsNeeded: course.materialsNeeded
				});
			})
			.catch(err => {
				this.props.history.push('/error');
			});
	}

	render() {
		const {
			instructor,
			title,
			description,
			estimatedTime,
			materialsNeeded,
			errors
		} = this.state;

		return (
			<div className="bounds course--detail">
				<h1>Update Course</h1>
				<div>
					<Form
						cancel={this.cancel}
						errors={errors}
						submit={this.submit}
						submitButtonText="Update Course"
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
													placeholder="Hours"
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
			id,
			userId,
			title,
			description,
			estimatedTime,
			materialsNeeded
		} = this.state;

		const authUser = context.authenticatedUser;

		const course = {
			id,
			userId,
			title,
			description,
			estimatedTime,
			materialsNeeded
		};

		context.data
			.updateCourse(course, authUser.emailAddress, authUser.password)
			.then(errors => {
				if (errors.length) {
					this.setState({ errors });
				} else {
					context.actions
						.signIn(authUser.emailAddress, authUser.password)
						.then(() => {
							this.props.history.push(`/courses/${id}`);
						});
				}
			})
			.catch(err => {
				console.log('in the promise rejected');
				console.log(err);
				this.props.history.push('/error');
			});
	};

	cancel = () => {
		const { id } = this.state;

		this.props.history.push(`/courses/${id}`);
	};
}
