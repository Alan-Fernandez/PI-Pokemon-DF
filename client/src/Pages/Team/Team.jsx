import React from "react";
import style from "./team.module.css";
import Card from "../../components/Cards/Card";

const Team = () => {
  const team = () => {
    const storedTeam = localStorage.getItem("team");
    return storedTeam ? JSON.parse(storedTeam) : [];
  };

  const array = team();

  return (
    <div className={style.container}>
      <Card
        array={array}
        img={'https://media.giphy.com/media/SS4imysASHTHUsXyt6/source.gif?cid=ecf05e47q1uzwaxgylgvwkmsxvhlchbh8kvqe1bmf2emb35d&rid=source.gif&ct=s'}
      />
    </div>
  );
};

export default Team;
