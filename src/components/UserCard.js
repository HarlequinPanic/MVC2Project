import React from 'react'

function UserCard({user, fighters}) {
    const{name, team} = user
    let IMG_URL = 'http://www.panicpalace.com/Images/mvc2/thumbnails'

    const teammates = team.map((id) => fighters.find((fighter) => fighter.id === id))
  return (
    <div>
      <h3>{name}</h3>
      <div className="teammateContainer">
        {teammates.map((fighter, index) => (
            <div key={index} className="teammateThumb">
                <img src={`${IMG_URL}/${fighter.thumbnail}`} alt={fighter.name}/>
            </div>
        ))}
      </div>
    </div>
  )
}

export default UserCard
