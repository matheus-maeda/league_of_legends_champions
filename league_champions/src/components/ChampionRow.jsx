import React from 'react'
import './ChampionRow.css'

export default ({champions}) => {
  return (
    <div className='ChampionRow'>
       {champions.map((element) =>
         <div class='champion' id={element[0].id} onClick>
          <img src={'http://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/' + element[0].image.full} />
          <p>{element[0].name}</p>
         </div>
       )}
    </div>
  );
}