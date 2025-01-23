import React from "react";
import { useState } from "react";

const App = () => {
  const style = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "50px",
  };

  const [infos, setInfos] = useState([
    {
      id: new Date().getTime(),
      country: "대한민국",
      gold: 9,
      silver: 0,
      bronze: 1,
    },
    {
      id: new Date().getTime() +1, //초기값은 모두 같은 시간에 렌더링이 되기 때문에 1,2,3을 각각 더해서 차별을 둠
      country: "폴란드",
      gold: 6,
      silver: 7,
      bronze: 8,
    },
    {
      id: new Date().getTime() +2,
      country: "중국",
      gold: 7,
      silver: 8,
      bronze: 9,
    },
    {
      id: new Date().getTime() +3,
      country: "일본",
      gold: 4,
      silver: 5,
      bronze: 6,
    },
  ]);

  const [country, setCountry] = useState("");
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);

  const addInfoHandler = ()=>{ //좀 이따 이거 함수 이름 바꾸기 --------  infos state에 한 객체가 추가됨!
    const newInfo = {
      id: new Date().getTime(),
      country: country,
      gold: Number(gold),
      silver: Number(silver),
      bronze: Number(bronze)
    };
    setInfos([...infos, newInfo]);
  };

  const deleteInfoHandler = (id) => { //삭제를 위해선 삭제할 대상의 id가 필요하다!
    const deletedInfos = infos.filter(function(info) {
      return info.id != id
    });
    setInfos(deletedInfos);
  }

  const forOnChange = (e)=>{setCountry(e.target.value)};

  return ( // 부모요소는 하나밖에 있을 수 없기 때문에 <></>라는 빈 태그를 추가함
    <> 
      <input type="text" value={country} onChange={forOnChange} placeholder="국가 이름"/>
      <input type="number" value={gold} onChange={forOnChange}/>
      <input type="number" value={silver} onChange={forOnChange}/>
      <input type="number" value={bronze} onChange={forOnChange}/>

      <Button onClick={addInfoHandler}>국가 추가</button>

      <div style={style}>
        {infos.map(function (info) {
          return <Info key={info.id} user={info} deleteInfoHandler={deleteInfoHandler}/>;
        })}
      </div>
    </>
  );
};

export default App;

const Info = ({ user, deleteInfoHandler }) => {
  const squareStyle = {
    width: "fitContent",
    height: "fitContent",
    border: "1px solid green",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    margin: " 0 50px",
  };

  const {country, gold, silver, bronze, id} = user;

  return ( // <div>는 SEO나 가독성 측면에서 좋지 않기 때문에, 대신 각각의 목적에 맞는 semantic tag를 많이 사용해야 한다.
    <div style={squareStyle}>
      <div>{country} {gold} {silver} {bronze}</div>
      <div>
        <Button onClick={()=> deleteInfoHandler(id)}>삭제</button>
      </div>
    </div>
  );
};

const Button = ({children}) => {
  return <button>{children}</button>;
}