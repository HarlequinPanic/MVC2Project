import React, {useState} from "react";
import '../index.css'

function TeamContainer({team, onRemoveTeammate, onSubmitTeam}){
    const [username, setUserName] = useState("")

    const handleInputChange = (e) => {
        setUserName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitTeam(username);
    }


    return(
    <div>
    <form onSubmit={handleSubmit}>
    <div className="teamContainer">
        <p>Enter a new username:</p>
        <input 
            name="username"
            value={username}
            onChange={handleInputChange}></input>
            
       <button type="submit">Submit Your Team</button>

        <ul>
  <li>Your Team:</li>
  {team.map(fighter => (
    <li key={fighter.id} onClick={() => onRemoveTeammate(fighter.id)}>
      {fighter.name}
    </li>
  ))}
</ul>
    </div>
    
    </form>
    </div>
    )}


export default TeamContainer