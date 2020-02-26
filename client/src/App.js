import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './styles/global.css';

import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse.js';
import CourseDetail from './components/CourseDetail';
import Forbidden from './components/Forbidden';
import Error from './components/Error';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Header />

					<Switch>
						<Route exact path="/" component={Courses} />
						<Route path="/courses/create" component={CreateCourse} />
						<Route path="/courses/:id" component={CourseDetail} />
						<Route path="/courses/:id/update" component={UpdateCourse} />
						<Route path="/signin" component={UserSignIn} />
						<Route path="/signup" component={UserSignUp} />
						<Route path="/signout" component={UserSignOut} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
