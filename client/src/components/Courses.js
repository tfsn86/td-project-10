import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
			<div className="bounds">
				{courses.map(course => {
					return (
						<div className="grid-33" key={`${course.id}`}>
							<NavLink
								to={`/courses/${course.id}`}
								className="course--module course--link"
							>
								<h4 className="course--label">Course</h4>
								<h3 className="course--title">{`${course.title}`}</h3>
							</NavLink>
						</div>
					);
				})}

				<div className="grid-33">
					<NavLink
						to="/courses/create"
						className="course--module course--add--module"
					>
						<h3 className="course--add--title">
							<svg
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								viewBox="0 0 13 13"
								className="add"
							>
								<polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
							</svg>
							Create Course
						</h3>
					</NavLink>
				</div>
			</div>
		);
	}
}

export default Courses;
