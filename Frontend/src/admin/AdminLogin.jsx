import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
   const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/admin/login", {
      email,
      password,
    });

 if (res.status === 200) {
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("isAdmin", "true");
  navigate("/adminProduct");
  window.location.reload(); // refresh to update navbar
}


  } catch (err) {
    console.log("Error:", err.response?.data);
    setMessage(err.response?.data?.msg || "Login failed");
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-xl rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#F28C1E]">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="p-2 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C1E]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C1E]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#F28C1E] text-white py-2 rounded-lg transition text-xl font-bold"
        >
          Login
        </button>

        {message && (
          <p className="text-center mt-4 text-red-500 font-medium">{message}</p>
        )}

        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/adminRegister"
            className="text-[#F28C1E] font-bold"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default AdminLogin;
