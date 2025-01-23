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
    width: "60vw",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "50px",
    border: "2px solid green",
    borderRadius: "10px",
  };

  const inputStyle = {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    padding: "50px",
  };

  const [infos, setInfos] = useState([]);

  const [country, setCountry] = useState("");
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // 필드별로 상태를 업데이트
    if (name === "country") {
      setCountry(value);
    }
    if (name === "gold") setGold(value);
    if (name === "silver") setSilver(value);
    if (name === "bronze") setBronze(value);
  };

  const addInfoHandler = (e) => {
    e.preventDefault();
    const newInfo = {
      id: new Date().getTime(), // 출력된 시간에 따라 고유 ID생성!
      country: country,
      gold: Number(gold),
      silver: Number(silver),
      bronze: Number(bronze),
    };

    // 중복 체크: 동일한 데이터가 있는지 확인
    const isDuplicate = infos.some((info) => info.country === newInfo.country);

    // 중복 데이터가 있으면 aler창을 띄움!
    if (isDuplicate) {
      alert("이미 존재하는 국가입니다.");
      return; // 중복된 경우 함수 종료
    }

    // 새로 추가되는 정보를 출력
    setInfos([...infos, newInfo]);
  };

  const updateInfoHandler = (e) => {
    e.preventDefault();
    const newInfo = {
      id: new Date().getTime(),
      country: country,
      gold: Number(gold),
      silver: Number(silver),
      bronze: Number(bronze),
    };

    // 이미 존재하는 정보가 있는지 확인 (국가 기준)
    const existingInfo = infos.findIndex(
      (info) => info.country === newInfo.country
    );

    if (existingInfo !== -1) {
      // country가 같은 데이터가 있으면 해당 데이터 업데이트!
      const updatedInfos = [...infos];
      updatedInfos[existingInfo] = {
        ...updatedInfos[existingInfo],
        gold: newInfo.gold,
        silver: newInfo.silver,
        bronze: newInfo.bronze,
      };
      setInfos(updatedInfos);
    } else {
      alert("업데이트할 국가가 존재하지 않습니다.");
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
        <h1>2024 파리 올림픽</h1>
        <div style={inputStyle}>
          <input
            type="text"
            name="country"
            value={country}
            onChange={handleInputChange}
            placeholder="국가 이름"
          />
          <input
            type="number"
            name="gold"
            value={gold}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="silver"
            value={silver}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="bronze"
            value={bronze}
            onChange={handleInputChange}
          />

          <Button color="#FCD12A" onClick={addInfoHandler}>
            국가 추가
          </Button>
          <Button color="#FCD12A" onClick={updateInfoHandler}>
            업데이트
          </Button>
        </div>
      </form>

      <div style={style}>
        {infos.map(function (info) {
          // 화면에 추가될 정보들을 렌더링할 코드!
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
