import React from 'react'
import FighterCard from './FighterCard'

export default function FighterContainer({fighters, onAddTeammate}) {

    const fightersToDisplay = fighters.map((e) => (
        <FighterCard
        key={e.id}
        id={e.id}
        fighter={e}
        onAddTeammate={onAddTeammate}
        />
    ))
  return (
    <div className="banners-container">
    <ul>
        {fightersToDisplay}
    </ul>
    </div>
  )
}
