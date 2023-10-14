import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { useEffect, useState } from "react";
import { setCredentials } from "../slices/authSlice";
import { Form } from "react-bootstrap";
import Loader from "../components/Loader";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo,redirect, navigate]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login({ email, password }).unwrap()
      .then((res) => {
        if (res?.error) {
          toast.error(`Login failed. incorrect email or password`);
        }
        dispatch(setCredentials({...res})); // Only dispatch the necessary data
        navigate(redirect);
        toast.success(`logged in successfully`); // Use the response from the login function
        resetForm(); // Reset the form once after the try-catch block
      })
      .catch((err) => {
        if (err?.data?.message) {
          toast.error(err?.error);
        } else{
          toast.error(`invalid email or password`);
        }
      });
  };

  return (
    <FormContainer>
      <Form
        onSubmit={submitHandler}
        className="bg-slate-100 rounded px-3 py-3 my-5"
        autoComplete="on"
      >
        <h1 className="mb-3 text-xl font-semibold text-center text-blue-900">
          Sign In
        </h1>
        <Form.Group controlId="email" className="my-3">
          <Form.Label className="block text-sm font-medium text-gray-700 ml-1 mb-1">
            Email Address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-md focus:border-blue-500 focus:ring-blue-600"
            autoComplete="on"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label className="block text-sm font-medium text-gray-700 ml-1 mb-1">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-md focus:border-blue-500 focus:ring-blue-600"
            autoComplete="on"
          ></Form.Control>
        </Form.Group>
        <div className="text-center flex justify-between">
          <button
            type="submit"
            className=" px-2 p-2 rounded bg-blue-500 text-white font-medium transform transition-all hover:bg-blue-600 duration-150 ease-out hover:scale-95 "
          >
            Sign In
          </button>
          {isLoading && (
            <Loader/>
          )}
          <h3 className="text-center flex items-center underline underline-offset-1 text-fuchsia-800 hover:text-fuchsia-500">
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </h3>
        </div>
      </Form>
    </FormContainer>
  );
}

