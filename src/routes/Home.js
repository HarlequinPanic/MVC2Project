import React, {useState} from 'react'

import FighterContainer from '../components/FighterContainer'
import TeamContainer from '../components/TeamContainer'

export default function Home({fighters}) {


  const [teammates, setTeammates] = useState([])

  function handleAddTeammate(characterId){
    console.log("parent component reports", characterId)
    const newFighter=fighters.find((fighter) => fighter.id === characterId);
    console.log(newFighter.name)
    setTeammates([...teammates, newFighter])
}

  function handleRemoveTeammate(id){
    console.log("Triggering remove of: ", id)
    const newTeam = teammates.filter((teammate => teammate.id !== id))
    setTeammates(newTeam)
  }

  function handleTeamSubmit(username){
    const teammateIds = teammates.map(teammate => teammate.id);
    const formData = {
    name: username,
    team: teammateIds};

    if(teammateIds.length !==3){
      alert("Teams must have 3 members")}
    else{
    fetch('http://localhost:4000/users',{
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Accept': "application/json"},
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data=>
      console.log(data)
    )
    .catch((error) => {
      console.error('Error:', error);
    });}
    //check 3 teammates
    

  }

  return (
  <div className="UserTeam">
    <TeamContainer team={teammates} onAddTeammate={handleAddTeammate} onRemoveTeammate={handleRemoveTeammate} onSubmitTeam={handleTeamSubmit}/>
    <FighterContainer fighters={fighters} onAddTeammate={handleAddTeammate}/>
    
  </div>
  )
}

