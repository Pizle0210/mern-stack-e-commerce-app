import { Container, Table } from "react-bootstrap";
import { FaTimes,FaTrash,FaEdit,FaCheck } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useGetUsersQuery,useDeleteUsersMutation } from "../../slices/usersApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
 

export default function UsersListScreen() {
  const { data: users,refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser,{isLoading:userLoadinDel}] = useDeleteUsersMutation();


  const deleteHandler=async(id)=>{
    console.log(id,'delete');
    if (window.confirm(`You are about to delete a user!, click 'ok' to proceed`)) {
      try {
        await deleteUser(id);
        toast.success('user deleted')
        refetch()
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <Container className="min-h-screen py-5">
      <h1 className="text-lg mb-3">Users</h1>
      {userLoadinDel && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table striped responsive hover borderless className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck color="green" />
                  ) : (
                    <FaTimes color="red" />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <button className="px-2 p-1 shadow-md hover:scale-95 duration-150 transform transition-all rounded bg-yellow-300">
                      <FaEdit />
                    </button>
                  </LinkContainer>
                  <button
                    className="ml-2 px-2 p-1 shadow-md hover:scale-95 duration-150 transform transition-all rounded bg-red-500"
                    onClick={() => {
                      deleteHandler(user._id);
                    }}
                  >
                    <FaTrash color="white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
