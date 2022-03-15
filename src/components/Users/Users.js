import React,{ useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/users')
        .then(res=>res.json())
        .then(data=>setUsers(data))
    },[])

    //deleting
    const handleDeleteUser=id=>{
       const url= `http://localhost:5000/users/${id}`;
       const proceed = window.confirm('Are you sure you want to delete?')
       if(proceed){
        fetch(url,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount>0){
                alert('Deleted successfully.')
                const remainingUsers=users.filter(user=>user._id!==id);
                setUsers(remainingUsers)
            }
        })
       }

    }
    return (
        <div>
            <h2>Total Users : {users.length}</h2>
            <ul>
                {
                    users.map(user=><li key={user._id}>
                        {user.name}::{user.email} <br />
                       <Link to={`/users/update/${user._id}`}> <button>Update</button></Link>
                        <button onClick={()=>handleDeleteUser(user._id)}>X</button>
                        </li>)
                }
            </ul>
        </div>
    );
};

export default Users;