import React, { useState } from "react";
import "./ChampionRow.css";

export default ({ champions }) => {
  let [searchedChampionName, setSearchedChampionName] = React.useState("");
  let [searchedChampionInfo, setSearchedChampionInfo] = React.useState([]);
  let [contadorSkin, setContadorSkin] = React.useState(0);
  let [skins, setSkins] = React.useState([]);
  let [skillInformation, setSkillInformation] = useState("");
  let [skillName, setSkillName] = useState("");
  let [activeSkill, setActiveSkill] = useState();

  var actualAPI = "https://ddragon.leagueoflegends.com/cdn/13.10.1";

  function fetchChampion(championName) {
    let championIndex = -1;
    champions.map(function (element, index) {
      if (element[0]["id"] == championName) {
        championIndex = index;
      }
    });
    fetch(
      actualAPI +
        `/data/pt_BR/champion/${champions[championIndex][0]["id"]}.json`
    )
      .then((response) =>
        response.json().then((response) => {
          setContadorSkin(0);
          setSkins(
            Object.keys(response.data[championName]["skins"]).map((key) => [
              response.data[championName]["skins"][key]["num"],
            ])
          );
          setSearchedChampionInfo(response.data);
        })
      )
      .then(() => {
        setSearchedChampionName(championName);
        setSkillInformation("");
        setSkillName("");
      });
  }

  function loadSkillInformation(skill) {
    if (skill != "p") {
      setSkillInformation(
        searchedChampionInfo[searchedChampionName]["spells"][skill][
          "description"
        ]
      );
      setSkillName(
        searchedChampionInfo[searchedChampionName]["spells"][skill]["name"]
      );
      setActiveSkill(skill);
    } else {
      setActiveSkill(4);
      setSkillInformation(
        searchedChampionInfo[searchedChampionName]["passive"]["description"]
      );
      setSkillName(
        searchedChampionInfo[searchedChampionName]["passive"]["name"]
      );
    }
  }

  function changeSkin(value) {
    if (value == 1) {
      contadorSkin == skins.length - 1
        ? setContadorSkin(0)
        : setContadorSkin(contadorSkin + 1);
    } else {
      contadorSkin - 1 < 0
        ? setContadorSkin(skins.length - 1)
        : setContadorSkin(contadorSkin - 1);
    }
  }
  //
  return (
    <div className="Container">
      <div className="ChampionRow">
        {champions.map((element) => (
          <div
            className="champion"
            key={element[0].id}
            onClick={() => {
              fetchChampion(element[0].id);
            }}
          >
            <img
              src={actualAPI + `/img/champion/${element[0].image.full}`}
              style={{
                transform:
                  searchedChampionName == element[0].id ? "scale(1.2)" : "",
              }}
            />
            <p>{element[0].name}</p>
          </div>
        ))}
      </div>
      {searchedChampionName != "" ? (
        <div className="ChampionInfo">
          <div className="championImage">
            <button onClick={() => changeSkin(0)}>{"<"}</button>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${searchedChampionName}_${skins[contadorSkin]}.jpg`}
            />
            <button onClick={() => changeSkin("1")}>{">"}</button>
          </div>
          <div className="searchedChampionName">
            <h2>
              {contadorSkin == 0
                ? searchedChampionName
                : searchedChampionInfo[searchedChampionName]["skins"][
                    contadorSkin
                  ]["name"]}
            </h2>
          </div>
          <div className="ChampionSkills">
            <div
              className="ChampionSkillsP"
              onClick={() => loadSkillInformation("p")}
            >
              <img
                src={
                  actualAPI +
                  `/img/passive/${searchedChampionInfo[searchedChampionName]["passive"]["image"]["full"]}`
                }
                style={{ transform: activeSkill == 4 ? "scale(1.1)" : "none" }}
              />
            </div>
            <div
              className="ChampionSkillsQ"
              onClick={() => loadSkillInformation("0")}
            >
              <img
                src={
                  actualAPI +
                  `/img/spell/${searchedChampionInfo[searchedChampionName]["spells"]["0"]["id"]}.png`
                }
                style={{ transform: activeSkill == 0 ? "scale(1.1)" : "none" }}
              />
            </div>
            <div
              className="ChampionSkillsW"
              onClick={() => loadSkillInformation("1")}
            >
              <img
                src={
                  actualAPI +
                  `/img/spell/${searchedChampionInfo[searchedChampionName]["spells"]["1"]["id"]}.png`
                }
                style={{ transform: activeSkill == 1 ? "scale(1.1)" : "none" }}
              />
            </div>
            <div
              className="ChampionSkillsE"
              onClick={() => loadSkillInformation("2")}
            >
              <img
                src={
                  actualAPI +
                  `/img/spell/${searchedChampionInfo[searchedChampionName]["spells"]["2"]["id"]}.png`
                }
                style={{ transform: activeSkill == 2 ? "scale(1.1)" : "none" }}
              />
            </div>
            <div
              className="ChampionSkillsR"
              onClick={() => loadSkillInformation("3")}
            >
              <img
                src={
                  actualAPI +
                  `/img/spell/${searchedChampionInfo[searchedChampionName]["spells"]["3"]["id"]}.png`
                }
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
