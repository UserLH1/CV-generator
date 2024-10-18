import axios from "axios"; // Axios is the default export
import React, { ChangeEvent, FormEvent, useState } from "react";

// Define the structure for form data
interface FormData {
  email: string;
  password: string;
}

// Define the structure for the expected response from login
interface LoginResponse {
  token: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string>("");

  // Handle input changes with proper typing for the event
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission with proper typing for the event
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Correctly typed Axios response using the inferred type from Axios
      const response = await axios.post<LoginResponse>(
        "http://localhost:5000/api/auth/login",
        formData
      );

      setToken(response.data.token); // Save the token
      setError(""); // Clear error if successful
      console.log("Token:", response.data.token);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred.");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {token && (
        <p style={{ color: "green" }}>Login successful! Token: {token}</p>
      )}
    </div>
  );
};

export default LoginForm;
