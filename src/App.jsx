import { useState } from "react";
import Button from "./components/Button";
import Info from "./components/Info";

const App = () => {
  const style = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "50px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  };
  
  const [infos, setInfos] = useState([]);

  const [country, setCountry] = useState("");
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // 필드별로 상태를 업데이트
    if (name === "country") setCountry(value);
    if (name === "gold") setGold(value);
    if (name === "silver") setSilver(value);
    if (name === "bronze") setBronze(value);
  };


  const addInfoHandler = () => {
    //좀 이따 이거 함수 이름 바꾸기 --------  infos state에 한 객체가 추가됨!
    const newInfo = {
      id: new Date().getTime(),
      country: country,
      gold: Number(gold),
      silver: Number(silver),
      bronze: Number(bronze),
    };
  // 중복 체크: infos 배열에 동일한 데이터가 있는지 확인
  const isDuplicate = infos.some(
    (info) =>
      info.country === newInfo.country &&
      info.gold === newInfo.gold &&
      info.silver === newInfo.silver &&
      info.bronze === newInfo.bronze
  );

  if (isDuplicate) {
    alert("중복되는 정보입니다.");
  } else {
    setInfos([...infos, newInfo]);
  }
  };

  const deleteInfoHandler = (id) => {
    //삭제를 위해선 삭제할 대상의 id가 필요하다!
    const deletedInfos = infos.filter(function (info) {
      return info.id != id;
    });
    setInfos(deletedInfos);
  };


  return (
    // 부모요소는 하나밖에 있을 수 없기 때문에 <></>라는 빈 태그를 추가함
    <div>
      <form style={formStyle} action="">
        <input type="text" name="country" value={country} onChange={handleInputChange} placeholder="국가 이름"/>
        <input type="number" name="gold" value={gold} onChange={handleInputChange} />
        <input type="number" name="silver" value={silver} onChange={handleInputChange} />
        <input type="number" name="bronze" value={bronze} onChange={handleInputChange} />

        <Button color="#FCD12A" onClick={addInfoHandler}>국가 추가</Button>
        <Button color="#FCD12A" onClick={addInfoHandler}>국가 추가</Button>
      </form>


      <div style={style}>
        {infos.map(function (info) {
          return (
            <Info
              key={info.id}
              user={info}
              deleteInfoHandler={deleteInfoHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;