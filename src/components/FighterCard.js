import React from 'react'

export default function FighterCard({fighter, onAddTeammate}) {

    const handleClick = (e) => {
        e.target.classList.toggle('desaturate');
        console.log("child component reports: ", e.target.id)
        onAddTeammate(parseInt(e.target.id, 10))
        e.target.disabled = true;
    }

    let IMG_URL = 'http://www.panicpalace.com/Images/mvc2/characterblades'
    const {id, name, wins, losses, img} = fighter
  return (
    <li id={id} className="banner" style={{backgroundImage: `url("${IMG_URL}/${img}")`}} onClick={handleClick}>
        <div className='tile'>
            <h3>{name}</h3>
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
        </div>
    </li>
  )
}
