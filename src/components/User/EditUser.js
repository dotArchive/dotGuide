import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { updateEmail, updateProfile, updatePassword } from "firebase/auth";

export default function EditUser() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const user = auth.currentUser;

	updateProfile()


  return (
    <div>
      <div>Edit User</div>
      <div>
        <input placeholder="Username"></input>
      </div>
      <div>
        <input placeholder="email"></input>
      </div>
			<div>
				<input placeholder="password"></input>
			</div>
			<div>
				<input placeholder="confirm password"></input>
			</div>
			<div>
				<button>Save</button>
				<button onClick={() => navigate("/profile")}>Cancel</button>
			</div>
    </div>
  );
}
