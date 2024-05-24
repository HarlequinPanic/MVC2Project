import React, {useState, useEffect} from "react";
import UserCard from "../components/UserCard";

function UserList(){
    const [fighters, setFighters] = useState([])
    const [users, setUsers] = useState([])
    useEffect(() => {
    fetch("http://localhost:4000/fighters")
      .then((r) => r.json())
      .then((data) => setFighters(data))
    },[])
    useEffect(()=> {
        fetch("http://localhost:4000/users")
            .then((r) => r.json())
            .then((data)=>setUsers(data))
    }, [])

    const usersToDisplay = users.map((e) =>(
        <UserCard user={e} fighters={fighters}/>
    )
    )

    return(
        <div>{usersToDisplay}</div>
    )


}

export default UserList