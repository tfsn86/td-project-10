import React, { Component } from 'react';
import './styles/global.css';

class App extends Component {
	state = { courses: [] };

	componentDidMount() {
		fetch('http://localhost:5000/api/courses')
			.then(res => res.json())
			.then(data => this.setState({ courses: data }))
			.catch(console.log);
	}

	render() {
		return <li>TBA</li>;
	}
}

export default App;
