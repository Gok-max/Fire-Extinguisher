import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AdminRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/register", {
        name,
        email,
        password,
      });

      setMessage(res.data.msg);
      setTimeout(() => {
        navigate("/adminLogin"); // redirect to login page
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 shadow-xl rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#F28C1E]">
          Admin Registration
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="p-2 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C1E]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          className="w-full bg-[#F28C1E] text-white py-2 rounded-lg transition font-bold text-xl"
        >
          Register
        </button>

        {message && (
          <p className="text-center mt-4 text-green-600 font-medium">
            {message}
          </p>
        )}

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/adminLogin"
            className="text-[#F28C1E] font-bold"
          >
            Go to Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default AdminRegister;
