import React, { useState } from "react";
import axios from "axios";

function SignUp() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [conPass, setConPass] = useState("");

	const changeUsername = (e) => setUsername(e.target.value);
	const changeEmail = (e) => setEmail(e.target.value);
	const changePassword = (e) => setPassword(e.target.value);
	const changeConPass = (e) => setConPass(e.target.value);

	const FormSubmit = (e) => {
		e.preventDefault();
		console.log("Form Data:", {
			username,
			email,
			password,
			confirmPassword: conPass,
		});

    setUsername("");
    setEmail("");
    setPassword("");
    setConPass("");

    axios.post("http://localhost:3334/api/signup", {
      username,
      email,
      password,
    })
    .then(res => console.log("User created!", res))
    .catch(err => {
		if(err.response && err.response.data && err.response.data.message) alert(err.response.data.message)
		else alert("Something Went Wrong")
	});
	};

	return (
		<>
			<form onSubmit={FormSubmit}>
				<label>Username</label>
				<input
					type="text"
					value={username}
					onChange={changeUsername}
					placeholder="Username..."
				/>

				<label>Email</label>
				<input
					type="email"
					value={email}
					onChange={changeEmail}
					placeholder="E-mail..."
				/>

				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={changePassword}
					placeholder="Password..."
				/>

				<label>Confirm Password</label>
				<input
					type="password"
					value={conPass}
					onChange={changeConPass}
					placeholder="Confirm Password..."
				/>

				<button type="submit">Submit</button>
			</form>
		</>
	);
}

export default SignUp;
