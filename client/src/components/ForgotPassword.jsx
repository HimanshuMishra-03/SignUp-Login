import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);
    const [token, setToken] =useState('')
	const [resetLink, setResetLink] = useState(null); // dev only
    const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage(null);
		setError(null);
		setResetLink(null);

		if (!email || !email.includes("@")) {
			setLoading(false);
			return setError("Please enter a valid email address");
		}

		try {
			const res = await axios.post("http://localhost:3334/api/forgotpassword", { email });
			setMessage(res.data.message || "Reset link generated");
			setResetLink(res.data.resetLink);
            setToken(res.data.token)
		} catch (err) {
			console.error("Forgot Password Error:", err);
			setError(err.response?.data?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2>Forgot Password</h2>

			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Enter your registered email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button type="submit" disabled={loading}>
					{loading ? "Sending..." : "Send Reset Link"}
				</button>
			</form>

			{error && <p>{error}</p>}
			{message && <p>{message}</p>}

			{resetLink && (
				<div>
                    <h4>{resetLink}</h4>
					<button onClick={() => navigate(`/resetpassword/${token}`)}>Reset Password</button>
				</div>
			)}
		</div>
	);
}

export default ForgotPassword;
