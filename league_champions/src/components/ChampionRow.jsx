import React, {useState} from 'react'
import './ChampionRow.css'

export default ({champions}) => {
  
  let [championResponse, setChampionResponse] = useState('')
  let [championName, setChampionName] = useState('')
  let [skillInformation, setSkillInformation] = useState('')
  let [skillName, setSkillName] = useState('')
  let [championSkins, setChampionSkins] = useState([])
  let [actualSkin, setActualSkin] = useState(0)
 let [actualSkinAux, setActualSkinAux] = useState(0)
  
  async function fetchChampion(champion) {
      let championSkinsFetch = []
          await fetch(`https://ddragon.leagueoflegends.com/cdn/12.15.1/data/pt_BR/champion/${champion}.json`).then((response) => response.json()).then(function(response) {
            setChampionResponse(response.data)
            setChampionName(response.data[champion]["id"])
            console.log(response.data)
            championSkinsFetch = Object.keys(response.data[champion]["skins"]).map((key) => [response.data[champion]["skins"][key]]);
            setChampionSkins(championSkinsFetch)
            console.log(championSkinsFetch)
          })
          setActualSkin(0)
          setActualSkinAux(0)
          setSkillInformation('')
          setSkillName('')
    }
  
  function loadSkillInformation(skill) {
      if (skill != 'p') {
      setSkillInformation(championResponse[championName]["spells"][skill]["description"])
      setSkillName(championResponse[championName]["spells"][skill]["name"])
      } else {
      setSkillInformation(championResponse[championName]["passive"]["description"])
      setSkillName(championResponse[championName]["passive"]["name"])
      }
  }
  
  function changeSkin(args) {
      if(args == '1') {
         if(actualSkinAux < championSkins.length) {
              setActualSkinAux(actualSkinAux + 1)
              console.log(championSkins[actualSkinAux][0]["num"] + ' ' + actualSkinAux)
              setActualSkin(championSkins[actualSkinAux][0]["num"])
         }
         else
         {
             setActualSkinAux(0)
             setActualSkin(0)
         }
      }
      else
      {
          if(actualSkinAux >= 0) {
              setActualSkinAux(actualSkinAux - 1)
              setActualSkin(championSkins[actualSkinAux][0]["num"])
          }
          else
          {
              setActualSkinAux(championSkins.length - 1)
              setActualSkin(championSkins[championSkins.length][0]["num"])
          }
      }
  }
  //<div className='ChampionName'>{actualSkin === 0 ? <h2>{championResponse[championName]["name"]}</h2> : <h2>{championSkins[actualSkinAux][0]["name"]}</h2>}</div>
  return (
    <div className='Container'>
      <div className='ChampionRow'>
       {champions.map((element) =>
         <div className='champion' key={element[0].id} onClick={() => fetchChampion(element[0].id)} >
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/${element[0].image.full}`} />
          <p>{element[0].name}</p>
         </div>
       )}
      </div>
      {championName != '' ? <div className='ChampionInfo'>
         <div className='championImage'>
            <button onClick={() => changeSkin(0)}>{"<"}</button>
            <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${actualSkin}.jpg`}/>
            <button onClick={() => changeSkin('1')}>{">"}</button>            
         </div>
         
         <div className='ChampionSkills'>
           <div className='ChampionSkillsP' onClick={() => loadSkillInformation('p')}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/passive/${championResponse[championName]["passive"]["image"]["full"]}`}/>
           </div> 
           <div className='ChampionSkillsQ' onClick={() => loadSkillInformation('0')}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/${championResponse[championName]["spells"]["0"]["id"]}.png`}/>
           </div>
           <div className='ChampionSkillsW' onClick={() => loadSkillInformation('1')}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/${championResponse[championName]["spells"]["1"]["id"]}.png`}/>
           </div>
           <div className='ChampionSkillsE' onClick={() => loadSkillInformation('2')}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/${championResponse[championName]["spells"]["2"]["id"]}.png`}/>
           </div>
           <div className='ChampionSkillsR' onClick={() => loadSkillInformation('3')}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/${championResponse[championName]["spells"]["3"]["id"]}.png`}/>
           </div>  
         </div>
         <div className='SkillInformation'>
         <h3>{skillName}</h3>
         <div dangerouslySetInnerHTML={{ __html: skillInformation}}/>
         </div>
        </div>
      : <a/>}
      </div>
  );
}