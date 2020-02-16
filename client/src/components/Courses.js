import React, { Component } from 'react';

class Courses extends Component {
	state = { courses: [] };

	componentDidMount() {
		fetch('http://localhost:5000/api/courses')
			.then(res => res.json())
			.then(data => this.setState({ courses: data }))
			.catch(console.log);
	}

	render() {
		const { courses } = this.state;

		return (
			<div>
				{courses.map(course => {
					return <li>{course.title}</li>;
				})}
			</div>
		);
	}
}

export default Courses;
