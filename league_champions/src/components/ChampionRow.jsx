import React, { useState } from "react";
import "./ChampionRow.css";

export default ({ champions }) => {
  let [championResponse, setChampionResponse] = useState("");
  let [championName, setChampionName] = useState("");
  let [skillInformation, setSkillInformation] = useState("");
  let [skillName, setSkillName] = useState("");
  let [championSkins, setChampionSkins] = useState([]);
  let [actualSkin, setActualSkin] = useState();
  let [actualSkinAux, setActualSkinAux] = useState();
  let [activeSkill, setActiveSkill] = useState();

  async function fetchChampion(champion) {
    let championSkinsFetch = [];
    await fetch(`https://ddragon.leagueoflegends.com/cdn/12.15.1/data/pt_BR/champion/${champion}.json`)
      .then((response) => response.json())
      .then(function (response) {
        setChampionResponse(response.data);
        setChampionName(response.data[champion]["id"]);
        championSkinsFetch = Object.keys(response.data[champion]["skins"]).map((key) => [response.data[champion]["skins"][key]]);
        setChampionSkins(championSkinsFetch);
      });
    setActualSkin(0);
    setActualSkinAux(0);
    setSkillInformation("");
    setSkillName("");
  }

  function loadSkillInformation(skill) {
    if (skill != "p") {
      setSkillInformation(championResponse[championName]["spells"][skill]["description"]);
      setSkillName(championResponse[championName]["spells"][skill]["name"]);
      setActiveSkill(skill);
    } else {
      setActiveSkill(4);
      setSkillInformation(championResponse[championName]["passive"]["description"]);
      setSkillName(championResponse[championName]["passive"]["name"]);
    }
  }

  function changeSkin(args) {
    if (args == "1") {
      if (actualSkinAux < championSkins.length) {
        setActualSkinAux(actualSkinAux + 1);
        setActualSkin(championSkins[actualSkinAux][0]["num"]);
      } else {
        setActualSkinAux(0);
        setActualSkin(0);
      }
    } else {
      if (actualSkin > 0) {
        setActualSkinAux(actualSkinAux - 1);
        setActualSkin(championSkins[actualSkinAux][0]["num"]);
      } else {
        setActualSkinAux(championSkins.length - 1);
        setActualSkin(championSkins[championSkins.length - 1][0]["num"]);
      }
    }
  }
  //
  return (
    <div className="Container">
      <div className="ChampionRow">
        {champions.map((element) => (
          <div className="champion" key={element[0].id} onClick={() => fetchChampion(element[0].id)}>
            <img src={`http://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/${element[0].image.full}`} style={{ transform: championName == element[0].id ? "scale(1.2)" : "" }} />
            <p>{element[0].name}</p>
          </div>
        ))}
      </div>
      {championName != "" ? (
        <div className="ChampionInfo">
          <div className="championImage">
            <button onClick={() => changeSkin(0)}>{"<"}</button>
            <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${actualSkin}.jpg`} />
            <button onClick={() => changeSkin("1")}>{">"}</button>
          </div>
          <div className="ChampionName">{actualSkin === 0 ? <h2>{championResponse[championName]["name"]}</h2> : <h2>{championResponse[championName]["skins"][actualSkinAux - 1]["name"]}</h2>}</div>
          <div className="ChampionSkills">
            <div className="ChampionSkillsP" onClick={() => loadSkillInformation("p")}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/passive/${championResponse[championName]["passive"]["image"]["full"]}`}
                style={{ transform: activeSkill == 4 ? "scale(1.1)" : "none" }}
              />
            </div>
            <div className="ChampionSkillsQ" onClick={() => loadSkillInformation("0")}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/${championResponse[championName]["spells"]["0"]["id"]}.png`}
                style={{ transform: activeSkill == 0 ? "scale(1.1)" : "none" }}
              />
            </div>
            <div className="ChampionSkillsW" onClick={() => loadSkillInformation("1")}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/${championResponse[championName]["spells"]["1"]["id"]}.png`}
                style={{ transform: activeSkill == 1 ? "scale(1.1)" : "none" }}
              />
            </div>
            <div className="ChampionSkillsE" onClick={() => loadSkillInformation("2")}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/${championResponse[championName]["spells"]["2"]["id"]}.png`}
                style={{ transform: activeSkill == 2 ? "scale(1.1)" : "none" }}
              />
            </div>
            <div className="ChampionSkillsR" onClick={() => loadSkillInformation("3")}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/${championResponse[championName]["spells"]["3"]["id"]}.png`}
                style={{ transform: activeSkill == 3 ? "scale(1.1)" : "none" }}
              />
            </div>
          </div>
          <div className="SkillInformation">
            <h3>{skillName}</h3>
            <div dangerouslySetInnerHTML={{ __html: skillInformation }} />
          </div>
        </div>
      ) : (
        <a />
      )}
    </div>
  );
};
