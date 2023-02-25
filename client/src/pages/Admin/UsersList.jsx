import { Table } from "antd";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { hideLoading, showLoading } from "../../redux/alertReducer";

function UsersList() {
  const [users, setUsers] = useState([]);
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Join date",
      dataIndex: "createdAt",
      render: (record, text) => moment(record.createdAt).format("DD-MM-YY"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.isActive && <a className="anchor" onClick={()=>changeUserStatus(record, '1')}>Block</a>}
          {!record.isActive  && <a className="anchor" onClick={()=>changeUserStatus(record, 'h')} >Unblock</a>}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="user-header">Userslist</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
}

export default UsersList;
