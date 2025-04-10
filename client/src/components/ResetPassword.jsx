import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

function ResetPassword() {
	const { token } = useParams()
	const navigate = useNavigate();

	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage(null);
		setError(null);

		if (newPassword.length < 6) {
			setLoading(false);
			return setError("Password must be at least 6 characters");
		}
		if (newPassword !== confirmPassword) {
			setLoading(false);
			return setError("Passwords do not match");
		}

		try {
			const res = await axios.post(`http://localhost:3334/api/resetpassword/${token}`, {
				newPassword,
			});
			setMessage(res.data.message);
			setTimeout(() => navigate("/login"), 3000);
		} catch (err) {
			console.error("Reset Error:", err);
			setError(err.response?.data?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2>Reset Your Password</h2>

			<form onSubmit={handleSubmit}>
				<input
					type="password"
					placeholder="New Password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<button type="submit" disabled={loading}>
					{loading ? "Resetting..." : "Reset Password"}
				</button>
			</form>

			{error && <p>{error}</p>}
			{message && <p>{message}</p>}
		</div>
	);
}

export default ResetPassword;
