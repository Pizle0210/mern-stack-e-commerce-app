import { Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart, FaSignOutAlt, FaUser } from "react-icons/fa";
import logo from "../assets/kampalalogo2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutCmd] = useLogoutMutation()


  const handleLogout=async(e)=>{
    e.preventDefault();
    try {
      await logoutCmd();
      dispatch(clearCredentials())
      toast.success('Logout successful')
      navigate('/login')
    } catch (error) {
      toast.error(error?.error)
    }
  }

  return (
    <header>
      <Navbar
        className="bg-gradient-to-bl from-black to-white"
        variant="dark"
        expand="md"
        collapseOnSelect
        sticky="top"
      >
        <Container className="">
          <Navbar.Brand
            as={Link}
            to="/"
            className="font-mono font-bold flex items-center gap-2"
          >
            <img
              src={logo}
              alt="logo"
              className="h-10 w-10 sm:h-[3.5rem] sm:w-[3.5rem] rounded-se-2xl "
            />
            <h3 className="hidden sm:block text-black text-2xl font-extrabold tracking-widest">
              KAMPALA
            </h3>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="rounded-sm bg-black outline-none border-none active:border-none"
          />
          <Navbar.Collapse id="basic-navbar-nav" className="">
            <Nav className=" ms-auto  gap-2 md:gap-2  lg:gap-8 ">
              <Nav.Link as={Link} to="/cart" className="items-center flex">
                <FaShoppingCart color="white" size={25} />
                {cartItems.length > 0 ? (
                  <span className=" bg-red-500 ms-1 text-white inline-flex items-center justify-center w-6 h-6 ml-2 text-xs font-semibold rounded-full">
                    {cartItems.reduce(
                      (acc, currentItem) => acc + currentItem.qty,
                      0
                    )}
                  </span>
                ) : null}
              </Nav.Link>
              {userInfo ? (
                <div className="flex flex-col m-0 md:flex-row items-start md:items-center space-x-2 space-y-3 md:space-y-0 md:ml-5">
                  <Link to="/profile">
                    <img
                      src="http://localhost:3000/images/camera.jpg"
                      alt=""
                      height={30}
                      width={30}
                      className="rounded-full ring-2 ring-white"
                    />
                  </Link>
                  <Link to="/logout" onClick={handleLogout}>
                    <FaSignOutAlt color="orange" size={25} />
                  </Link>
                </div>
              ) : (
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="flex items-center gap-1 text-white font-semibold"
                >
                  <FaUser color="white" />
                  Sign in
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
