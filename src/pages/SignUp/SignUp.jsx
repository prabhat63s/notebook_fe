import { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import axiosInatance from "../../utils/axiosInstacne";
import toast from "react-hot-toast";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter a name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter a valid password");
      return;
    }

    setError(""); // Clear the error state if no validation errors

    try {
      const response = await axiosInatance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
      // handle successful signup
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/");
        toast.success("Account created successfully");
      }
    } catch (err) {
      // handle failed signup

      if (err.response && err.response.data && err.response.data.message) {
        setError("an error occurred: " + err.response.data.message);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen px-6">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleLogin}>
            <h5 className="text-xl font-medium text-gray-900">
              Sign up to our platform
            </h5>
            <div>
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-100  border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Prabhat Singh"
                autoComplete="name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-100  border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="name@company.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your password
              </label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full text-white bg-[#050708] hover:bg-[#050708]/80 gap-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
            >
              Sign up to your account
            </button>
            <div className="text-sm font-medium text-gray-500">
              Already registered?{" "}
              <Link to="/login" className="text-blue-700 hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
