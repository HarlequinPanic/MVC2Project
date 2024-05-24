import React, {useState} from 'react'

export default function TourneyForm({fighters, onSubmitTourney}) {
  const [selectedFightersTeam1, setSelectedFightersTeam1] = useState([])
  const [selectedFightersTeam2, setSelectedFightersTeam2] = useState([])
  const [winnerTeam1, setWinnerTeam1] = useState(false)
  const [winnerTeam2, setWinnerTeam2] = useState(false)

  const fightersForSelect = fighters.map((fighter) => fighter.name)

  //handle the selection
  const handleSelectFighter = (fighter, index, team) => {
    if(team === 'team1'){
      const newSelectedFighters = [...selectedFightersTeam1];
      newSelectedFighters[index] = fighter;
      setSelectedFightersTeam1(newSelectedFighters)
    }else if (team === 'team2'){
      const newSelectedFighters = [...selectedFightersTeam2];
      newSelectedFighters[index] = fighter;
      setSelectedFightersTeam2(newSelectedFighters)
    }
  }

  const handleWinnerChange = (team) => {
    if(team === 'team1') {
      setWinnerTeam1(true);
      setWinnerTeam2(false);
    }else if (team === 'team2'){
      setWinnerTeam1(false);
      setWinnerTeam2(true);
    }
  }

  function handleWinner(winTeam){
    const fightersToUpdateWins = winTeam.map((teammate) => {
      const fighter = fighters.find((f) => f.name === teammate)
    if(fighter){
      const updatedFighter ={
        ...fighter,
        wins: fighter.wins + 1
      }
      return updatedFighter
    }
    return fighter;
  })
    console.log('Updated fighter', fightersToUpdateWins)
    return fightersToUpdateWins
  }

  function handleLoser(loseTeam){
    const fightersToUpdateLosses = loseTeam.map((teammate) => {
      const fighter = fighters.find((f) => f.name === teammate);
      if (fighter) {
        // Create a new object with updated losses
        const updatedFighter = {
          ...fighter,
          losses: fighter.losses + 1,
        };
        return updatedFighter;
      }
      return fighter;
    });
  
    console.log('Updated fighters (losses)', fightersToUpdateLosses);
    return fightersToUpdateLosses;
  }
  

  const handleSubmit = async(event) =>{
    event.preventDefault();
    const datatoUpdateWins = winnerTeam1 ? handleWinner(selectedFightersTeam1) : handleWinner(selectedFightersTeam2)
    const datatoUpdateLosses = winnerTeam1? handleLoser(selectedFightersTeam2) : handleLoser(selectedFightersTeam1)
    console.log(datatoUpdateWins, datatoUpdateLosses)
    
    for(const winner of Object.values(datatoUpdateWins)){

    try{
      const URL = `http://localhost:4000/fighters/${winner.id}`

      fetch(URL, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(winner),
      })
      .then((r)=>r.json())
      .then((updatedfighters) => console.log("Updated fighters", updatedfighters))
    } catch (error){
      console.error('error updating winners')
    }
  }
    for(const loser of Object.values(datatoUpdateLosses)){

      try{
        const URL = `http://localhost:4000/fighters/${loser.id}`

        fetch(URL, {
          method: "PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(loser),
        })
        .then((r)=>r.json())
        .then((updatedLosers) => console.log("Updated losers", updatedLosers))
      }catch(error){
        console.error('error updating losers')
      }
    }
  }

  return (
    <div>
      <form onSubmit = {handleSubmit}>
        <h3>Match Registration Form:</h3>
        <h2>Team 1</h2>
        {[...Array(3)].map((_, index) => (
          <select 
            key ={index} 
            value={selectedFightersTeam1[index] || ''}
            onChange={(e) => handleSelectFighter(e.target.value, index, 'team1')}
            >
              <option value="">Select a Fighter</option>
              {fightersForSelect.map((fighterName, fighterIndex) => (
                <option
                  key={fighterIndex}
                  value={fighterName}
                  disabled={selectedFightersTeam1.includes(fighterName)}
                >
                  {fighterName}
                </option>
              ))}
            </select>
        ))}
        <p>Selected Fighters: {selectedFightersTeam1.join(', ')}</p>
        <label htmlFor="team victory">Winner?</label>
        <input 
          type="radio" 
          id="team1win" 
          name="winner" 
          checked={winnerTeam1} 
          onChange={() => handleWinnerChange('team1')}
        /> 

        <h2>Team 2</h2>
        {[...Array(3)].map((_, index) => (
          <select 
            key ={index} 
            value={selectedFightersTeam2[index] || ''}
            onChange={(e) => handleSelectFighter(e.target.value, index, 'team2')}
            >
              <option value="">Select a Fighter</option>
              {fightersForSelect.map((fighterName, fighterIndex) => (
                <option
                  key={fighterIndex}
                  value={fighterName}
                  disabled={selectedFightersTeam2.includes(fighterName)}
                >
                  {fighterName}
                </option>
              ))}
            </select>
        ))}
        <p>Selected Fighters: {selectedFightersTeam2.join(', ')}</p>
        <label htmlFor="team victory">Winner?</label>
        <input 
          type="radio" 
          id="team2win" 
          name="winner" 
          checked={winnerTeam2} 
          onChange={() => handleWinnerChange('team2')}
        /> 
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
