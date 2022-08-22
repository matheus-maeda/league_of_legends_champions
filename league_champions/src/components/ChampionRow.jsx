import React, {useState} from 'react'
import './ChampionRow.css'

export default ({champions}) => {
    
    
  let[getChosenChampion, setChosenChampion] = useState([]) 
  
  return (
    <div className='Container'>
      <div className='ChampionRow'>
       {champions.map((element) =>
         <div className='champion' key={element[0].id} onClick={() => setChosenChampion(element[0])} >
          <img src={'http://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/' + element[0].image.full} />
          <p>{element[0].name}</p>
         </div>
       )}
      </div>
      <div className="ChampionInfo">
          {getChosenChampion.id != undefined ? <img src={'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + getChosenChampion.id + '_0.jpg'} /> : <a />}
      </div>
    </div>
    
  );
}