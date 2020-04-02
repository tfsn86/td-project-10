import config from './config';

export default class Data {
	api(
		path,
		method = 'GET',
		body = null,
		requiresAuth = false,
		credentials = null
	) {
		const url = config.apiBaseUrl + path;

		const options = {
			method,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		};

		if (body !== null) {
			options.body = JSON.stringify(body);
		}

		if (requiresAuth) {
			const encodedCredentials = btoa(
				`${credentials.emailAddress}:${credentials.password}`
			);

			options.headers['Authorization'] = `Basic ${encodedCredentials}`;
		}

		return fetch(url, options);
	}

	// For getting a user
	async getUser(emailAddress, password) {
		const response = await this.api(`/users`, 'GET', null, true, {
			emailAddress,
			password
		});
		if (response.status === 200) {
			return response.json().then(data => data);
		} else if (response.status === 401) {
			return null;
		} else {
			throw new Error();
		}
	}

	// For creating a user
	async createUser(user) {
		const response = await this.api('/users', 'POST', user);
		if (response.status === 201) {
			return [];
		} else if (response.status === 400) {
			return response.json().then(data => {
				return data.error.err.errors;
			});
		} else {
			throw new Error();
		}
	}

	// For getting courses
	async getCourses() {
		const response = await this.api(`/courses`);
		if (response.status === 200) {
			return response.json().then(data => data);
		} else if (response.status === 401) {
			return null;
		} else {
			throw new Error();
		}
	}

	// For getting details for a specific course
	async getCourseDetail(id) {
		const response = await this.api(`/courses/${id}`);
		if (response.status === 200) {
			return response.json().then(data => data);
		} else if (response.status === 401) {
			return null;
		} else {
			throw new Error();
		}
	}

	// For creating a course
	async createCourse(course, emailAddress, password) {
		const response = await this.api('/courses', 'POST', course, true, {
			emailAddress,
			password
		});
		if (response.status === 201) {
			return [];
		} else if (response.status === 400) {
			return response.json().then(data => {
				return data.error.err.errors;
			});
		} else {
			throw new Error();
		}
	}

	// For updating a course
	async updateCourse(course, emailAddress, password) {
		const response = await this.api(
			`/courses/${course.id}`,
			'PUT',
			course,
			true,
			{ emailAddress, password }
		);
		if (response.status === 204) {
			return [];
		} else if (response.status === 401) {
			return null;
		} else if (response.status === 400) {
			return response.json().then(data => {
				return data.error.err.errors;
			});
		} else {
			throw new Error();
		}
	}

	// For deleting a course
	async deleteCourse(emailAddress, password, id) {
		const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {
			emailAddress,
			password
		});
		if (response.status === 204) {
			return [];
		} else if (response.status === 401) {
			return null;
		} else {
			throw new Error();
		}
	}
}
