import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router'

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate()

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log("Logging in with:", { email, password });

		axios.post('http://localhost:3334/api/login', {
			email,
			password
		})
		.then(res => {
			console.log("User Logged IN", res.data)
			localStorage.setItem('token', res.data.token)
			navigate('/dashboard')
		})
		.catch(err => console.log(err))

		setEmail("");
		setPassword("");
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>Email</label>
				<input
					type="email"
					value={email}
					onChange={handleEmailChange}
					placeholder="E-mail..."
				/>

				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={handlePasswordChange}
					placeholder="Password..."
				/>

				<button type="submit">Login</button>
			</form>
			<h4><Link to='/forgotpass'>Forgot Password</Link></h4>
		</>
	);
}

export default Login;
