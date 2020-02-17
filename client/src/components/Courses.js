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
				<div className="bounds">
					<div className="grid-33">
						<a
							className="course--module course--link"
							href="course-detail.html"
						>
							<h4 className="course--label">Course</h4>
							<h3 className="course--title">Build a Basic Bookcase</h3>
						</a>
					</div>
					<div className="grid-33">
						<a
							className="course--module course--add--module"
							href="create-course.html"
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
									<polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
								</svg>
								New Course
							</h3>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Courses;

// return (
//   <div>
//     {courses.map(course => {
//       return <li>{course.title}</li>;
//     })}
//   </div>
// );
