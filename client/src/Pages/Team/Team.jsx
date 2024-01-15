import React from "react";
import style from "./team.module.css";
import Card from "../../components/Cards/Card";

// const TEAM_IMAGE = 'coolest-poke-ball-on-starry-galaxy-r7w8578dkhu46pim.jpg'
const TEAM_IMAGECARGA = 'https://media.giphy.com/media/SS4imysASHTHUsXyt6/source.gif?cid=ecf05e47q1uzwaxgylgvwkmsxvhlchbh8kvqe1bmf2emb35d&rid=source.gif&ct=s'

const Team = () => {
  const team = () => {
    const storedTeam = localStorage.getItem("team");
    return storedTeam ? JSON.parse(storedTeam) : [];
  };

  const array = team().map((pokemon, index) => ({ ...pokemon, key: index }));


  return (
    <div className={style.container}>
      <div className={style.container_Card}>
        <div className={style.card}>
          <Card
            array={array}
            img={TEAM_IMAGECARGA}
          />
        </div>
      </div>
    </div>
  );
};

export default Team;
