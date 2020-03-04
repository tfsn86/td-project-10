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

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// Provide Components Context access to actions and data
const HeaderWithContext = withContext(Header);
const SignOutWithContext = withContext(UserSignOut);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<HeaderWithContext />

					<Switch>
						<Route exact path="/" component={CoursesWithContext} />
						<PrivateRoute
							path="/courses/create"
							component={CreateCourseWithContext}
						/>
						<PrivateRoute
							path="/courses/:id/update"
							component={UpdateCourseWithContext}
						/>
						<Route path="/courses/:id" component={CourseDetailWithContext} />
						<Route path="/signin" component={UserSignInWithContext} />
						<Route path="/signup" component={UserSignUpWithContext} />
						<Route path="/signout" component={SignOutWithContext} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
