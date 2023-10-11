import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useEffect, useState } from "react";
import { setCredentials } from "../slices/authSlice";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [consfirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleRegSubmit = async (e) => {
      e.preventDefault();
      if (password !== consfirmPassword) {
        toast.warn("Password do not match");
      } else {
        try {
          const res = await register({ name, email, password })
            dispatch(setCredentials(res));
            navigate(redirect);
            toast.success(`registration successful`);
            resetForm();
          }catch (err) {
          toast.error(err.message || "An error occurred. Please try again.");
        }
      }
    };

  return (
    <FormContainer>
      <form
        className="bg-blue-200 rounded px-3 py-3 my-5 space-y-3"
        autoComplete="on"
        onSubmit={handleRegSubmit}
      >
        <h1 className="mb-3 text-xl font-semibold text-center text-blue-900 ">
          Sign up
        </h1>

        <div className="row space-y-3">
          <div className="col">
            <input
              type="text"
              className="form-control w-full border-gray-300 rounded-sm shadow-md focus:border-green-500 focus:ring-green-600"
              placeholder="name"
              aria-label="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="row space-y-3 ">
          <div className="col">
            <input
              type="email"
              className="form-control w-full border-gray-300 rounded-sm shadow-md focus:border-green-500 focus:ring-green-600"
              placeholder="email"
              aria-label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="row space-y-3 gx-3 md:space-y-0">
          <div className="col-md">
            <input
              type="password"
              className="form-control w-full border-gray-300 rounded-sm shadow-md focus:border-green-500 focus:ring-green-600"
              placeholder="password"
              aria-label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-md">
            <input
              type="password"
              className="form-control w-full border-gray-300 rounded-sm shadow-md focus:border-green-500 focus:ring-green-600"
              placeholder="confirm password"
              aria-label="confirm password"
              value={consfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="text-center flex justify-between mt-3">
          <button
            type="submit"
            className=" px-2 p-2 rounded bg-green-400 text-white font-medium transform transition-all hover:bg-green-600 duration-150 ease-out hover:scale-95 "
          >
            Register
          </button>
          {isLoading && (
            <div
              className="font-extralight m-auto text-gray-500 spinner-border block"
              style={{ width: 20, height: 20 }}
            ></div>
          )}
          <h3 className="text-center flex items-center underline underline-offset-1 text-blue-800 hover:text-blue-500 ">
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Already have an account?
            </Link>
          </h3>
        </div>
      </form>
    </FormContainer>
  );
}
