import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../slices/usersApiSlice";


export default function UserEditScreen() {
const {id:userId}= useParams();
const [name,setName]= useState('')
const [email,setEmail]= useState('')
const [isAdmin,setIsAdmin]= useState(false)

const {data:user,refetch,error,isLoading}= useGetUserDetailsQuery(userId);
const [updateUser,{isLoading:loadingUser,}]= useUpdateUserMutation();


// const navigate = useNavigate();

useEffect(()=>{
    if(user){
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
    }
},[user])


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({userId,name,email,isAdmin})
      toast.success('User Updated Successfully')
      refetch()
    } catch (error) {
      toast.error(error.message)
    }
  };


  return (
    <Container className="py-5 min-h-screen">
      <Link to="/admin/userlist" className="back-link">
        Back
      </Link>
      <div className="mt-4 flex justify-center">
        <div className="w-full md:w-[600px]">
          <h1 className="text-slate-500 font-semibold mb-3 text-2xl">
            Edit User
          </h1>
          <div className="">
            {loadingUser || isLoading ? <Loader /> : null}
            {error ? (
              <Message className="alert alert-danger">{error}</Message>
            ) : (
              <form
                className="space-y-3 "
                onSubmit={submitHandler}
              >
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="update-product__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Description"
                    className="update-product__input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-orange-500 focus:ring-yellow-500"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                    <label className="ml-3">Are you an Admin?</label>
                </div>
                <div>
                  <button className="update-button" disabled={loadingUser}>
                    {loadingUser ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
