import {Table} from 'react-bootstrap'
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { hideLoading, showLoading } from "../../redux/alertReducer";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [search,setSearch]=useState("")
  const dispatch = useDispatch();
  const getUsersData = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Autherization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading);
    }
  };

  const changeUserStatus = async (record, status) => {

    try {
      
      dispatch(showLoading);
      const userId = record._id
      console.log(record,'inside catch',record._id)

      const response = await axios.post(
        "/api/admin/change-user-status",
        { record: record },
        {
          headers: {
            Autherization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading);
      if(response.data.success){
        setUsers(response.data.data)
        toast.success(response.data.message)
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const searchData = (data) => {
    return search === ""
      ? data
      : data.name.includes(search)
  }

 
  return (
   
    <Layout>
       <div style={{marginLeft:'10px', marginRight:'10px'}}>
       <header className="px-5 py-4 border-b border-slate-100">
               <h2 className="font-semibold text-slate-800">Users List</h2>
           </header>
           <form className="border-b border-slate-200" >
               <div className="relative">
                  <input
                       onChange={(e) => {
                           let searchValue = e.target.value.toLocaleLowerCase();
                           setSearch(searchValue)
                       }}
                       className="d-flex" type="search" placeholder="Search " 
       
                        />
               </div>
           </form>
        


    <Table striped bordered hover >
      <thead>
        <tr>
          
          <th>Name</th>
          <th>Email</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.filter(searchData).map((user)=>(
          <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.createdAt}</td>
          <td>
            <div className='d-flex'>
              {user.isActive ? (
                <button className='userblock' onClick={()=>changeUserStatus(user)}>Block</button>
              ):(
                <button className='userblock' onClick={()=>changeUserStatus(user)}>UnBlock</button>
              )}
            </div>
          </td>
          </tr>
        ))}
        
      </tbody>
    </Table>
    </div>
    </Layout>
    
  );
}

export default UsersList;
