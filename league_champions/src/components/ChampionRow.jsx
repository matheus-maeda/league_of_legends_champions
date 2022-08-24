import React, {useState} from 'react'
import './ChampionRow.css'

export default ({champions}) => {
  
  let [championResponse, setChampionResponse] = useState('')
  let [championName, setChampionName] = useState('')
  let [skillInformation, setSkillInformation] = useState('')
  
  async function fetchChampion(champion) {
          await fetch('https://ddragon.leagueoflegends.com/cdn/12.15.1/data/pt_BR/champion/' + champion + '.json').then((response) => response.json()).then(function(response) {
            setChampionResponse(response.data)
            setChampionName(response.data[champion]["id"])
            console.log(response.data)
          })
          setSkillInformation('')
    }
  
  function loadSkillInformation(skill) {
      skill != 'p' ?
      setSkillInformation(championResponse[championName]["spells"][skill]["description"])
      :
      setSkillInformation(championResponse[championName]["passive"]["description"])
  }
  
  
  return (
    <div className='Container'>
      <div className='ChampionRow'>
       {champions.map((element) =>
         <div className='champion' key={element[0].id} onClick={() => fetchChampion(element[0].id)} >
          <img src={'http://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/' + element[0].image.full} />
          <p>{element[0].name}</p>
         </div>
       )}
      </div>
      {championName != '' ? <div className='ChampionInfo'>
        <img src={'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + championName +'_0.jpg'}/>
         <p className='ChampionName'>{championResponse[championName]["name"]}</p>
         <div className='ChampionSkills'>
           <div className='ChampionSkillsP' onClick={() => loadSkillInformation('p')}>
            <img src={'https://ddragon.leagueoflegends.com/cdn/12.15.1/img/passive/' + championResponse[championName]["passive"]["image"]["full"]}/>
           </div> 
           <div className='ChampionSkillsQ' onClick={() => loadSkillInformation('0')}>
            <img src={'https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/' + championResponse[championName]["spells"]["0"]["id"] + '.png'}/>
           </div>
           <div className='ChampionSkillsW' onClick={() => loadSkillInformation('1')}>
            <img src={'https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/' + championResponse[championName]["spells"]["1"]["id"] + '.png'}/>
           </div>
           <div className='ChampionSkillsE' onClick={() => loadSkillInformation('2')}>
            <img src={'https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/' + championResponse[championName]["spells"]["2"]["id"] + '.png'}/>
           </div>
           <div className='ChampionSkillsR' onClick={() => loadSkillInformation('3')}>
            <img src={'https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/' + championResponse[championName]["spells"]["3"]["id"] + '.png'}/>
           </div>  
         </div>
         <div className='SkillInformation'>
         <p>{skillInformation}</p>
         </div>
        </div>
      : <a/>}
      </div>
  );
}