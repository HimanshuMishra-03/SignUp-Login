import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Dashboard() {
	const [user, setUser] = useState(null);
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem("token");
			if (!token) return alert("Unauthorized!");

			try {
				const res = await axios.get("http://localhost:3334/api/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setUser(res.data);
			} catch (err) {
				console.error(err);
				alert("Session expired or invalid token");
			}
		};

		fetchData();
	}, []);

	if (!user) return <p>Loading...</p>;

	return (
		<div>
			<h1>Welcome to your Dashboard, {user.username}!</h1>
			<p>Email: {user.email}</p>
            <button onClick={logOut}>LOG OUT</button>
		</div>
	);
}

export default Dashboard;
