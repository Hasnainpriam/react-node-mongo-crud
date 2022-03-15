import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
   const [user,setUser]=useState([]);
   const {id}=useParams();
   useEffect(()=>{
       const url=`http://localhost:5000/users/${id}`;
       fetch(url)
       .then(res=>res.json())
       .then(data=>setUser(data))
   },[])
  
   const handleUpdate=e=>{
    e.preventDefault();
    const url=`http://localhost:5000/users/${id}`;
    fetch(url, {
        method: 'PUT',
        headers: {
           
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then(res=>res.json())
    .then(data=>
        {
            if(data.modifiedCount>0){
                alert('Data updated successfully')
                setUser({})
            }
        })
    
   }
   const handleName=e=>{
    const updatedName=e.target.value;
    const updatedUser={ name:updatedName , email: user.email }
    setUser(updatedUser)
   }
   const handleEmail=e=>{
    const updatedEmail=e.target.value;
    // const updatedUser={...user};
    // updatedUser.email=updatedEmail;
    const updatedUser={ email:updatedEmail , name:user.name }
    setUser(updatedUser)
   }

    return (
        <div>
            <h2>This is Update User</h2>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>

            <form onSubmit={handleUpdate}>
                <input type="text" onChange={handleName} value={user.name || ''} />
                <input type="email" onChange={handleEmail} value={user.email || ''}/>
                <input type="submit"  value='Submit'/>
            </form>
        </div>
    );
};

export default UpdateUser;