


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './style.css'; // Ensure you have styles defined here
import { Button } from "@material-ui/core";

function UserDetails({ setClick }) {
    const [alluser, setAllUser] = useState([]);
    const [state, setState] = useState(false);
    const token = localStorage.getItem("adminConfig");
    const header = { headers: { "Authorization": `Bearer ${token}` } };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8080/admin/userData", header);
                setAllUser(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [state]);

    const addUser = () => {
        navigate("/admin/addUser");
    };

    const BlockUser = async (_id) => {
        try {
            const result = await Swal.fire({
                title: "Do you Want to block?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
                customClass: {
                    actions: "my-actions",
                    confirmButton: "order-2",
                    denyButton: "order-3",
                },
            });

            if (result.isConfirmed) {
                await axios.post("http://127.0.0.1:8080/admin/blockUser", { _id }, header);
                setState(prevState => !prevState); // Toggle state to refresh the user list
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const unBlockUser = async (_id) => {
        try {
            const result = await Swal.fire({
                title: "Do you Want to unblock?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
                customClass: {
                    actions: "my-actions",
                    confirmButton: "order-2",
                    denyButton: "order-3",
                },
            });

            if (result.isConfirmed) {
                await axios.post("http://127.0.0.1:8080/admin/unBlockUser", { _id }, header);
                setState(prevState => !prevState); // Toggle state to refresh the user list
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    return (
        <div className="container flex min-h-screen w-full">
            <div className="col-span-5 w-full">
                <div className="overflow-auto lg:overflow-visible w-full">
                    <Button
                        variant="contained"
                        className="btn-danger mt-5"
                        onClick={addUser}
                        style={{backgroundColor: "#3a4e69", color: "#fff"}}
                    >
                        ADD USER
                    </Button>

                    <table className="table text-gray-700 w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alluser.map((item, key) => (
                                <tr key={key} onClick={() => setClick(item._id)}>
                                    <td>
                                        <div className="flex align-items-center">
                                            <div className="ml-1">
                                                <div>{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.email}</td>
                                    <td>
                                        {item.status ? (
                                            <span className="status-active">Active</span>
                                        ) : (
                                            <span className="status-inactive">Inactive</span>
                                        )}
                                    </td>
                                    <td>
                                        {item.status ? (
                                            <Button
                                                variant="contained"
                                                className="rounded-md px-2 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click
                                                    BlockUser(item._id);
                                                }}
                                                style={{backgroundColor: "#E2F1E7", color: "#3a4e69"}}
                                            >
                                                Block
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                className="bg-green-400 text-white rounded-md px-2"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click
                                                    unBlockUser(item._id);
                                                }}
                                            >
                                                Unblock
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            className="edit-button rounded-md px-4 ms-5 cursor-pointer"
                                            style={{backgroundColor: "#3a4e69", color: "#E2F1E7"}}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent row click
                                                navigate('/admin/editUser', { state: { _id: item._id } });
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
