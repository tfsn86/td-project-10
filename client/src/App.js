import React, { Component } from 'react';
import './styles/global.css';

import Header from './components/Header';
import Courses from './components/Courses';
// import CourseDetail from './components/CourseDetail';

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<Courses />
			</div>
		);
	}
}

export default App;
