import { useState } from "react";
import Button from "./components/Button";
import Info from "./components/Info";

const App = () => {
  const style = {
    width: "90%",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "10px 10px rgba(0, 0, 0, 0.2)",
    display: "flex", // flexbox 사용
    flexDirection: "column", // 아이템 배치 방향: 세로
    alignItems: "center", // 세로 정렬: 가운데
    justifyContent: "center", // 가로 정렬: 가운데
    margin: "auto",
    padding: "1rem",
  };

  const outputStyle = {
    width: "93%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: " 0 30px",
  };

  const innerFormStyle = {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "50px",
  };

  const inputStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    } else {
    // 새로 추가되는 정보를 출력
      setInfos([...infos, newInfo])
    };
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
    <div style={style}>
      <form style={formStyle} action="">
        <h1>2024 파리 올림픽</h1>
        <div style={innerFormStyle}>
          <div style={inputStyle}>
            <label htmlFor="country">국가명</label>
            <input
              type="text"
              id={country}
              name="country"
              value={country}
              onChange={handleInputChange}
              placeholder="국가 이름"
            />
          </div>
          <div style={inputStyle}>
            <label htmlFor="country">금메달</label>
            <input
              type="number"
              name="gold"
              value={gold}
              onChange={handleInputChange}
            />
          </div>
          <div style={inputStyle}>
            <label htmlFor="country">은메달</label>
            <input
              type="number"
              name="silver"
              value={silver}
              onChange={handleInputChange}
            />
          </div>
          <div style={inputStyle}>
            <label htmlFor="country">동메달</label>
            <input
              type="number"
              name="bronze"
              value={bronze}
              onChange={handleInputChange}
            />
          </div>

          <Button color="#FCD12A" onClick={addInfoHandler}>
            국가 추가
          </Button>
          <Button color="#FCD12A" onClick={updateInfoHandler}>
            업데이트
          </Button>
        </div>
      </form>

      <div style={outputStyle}>
  {infos.length > 0 && ( // infos 배열에 데이터가 있을 때만 테이블 렌더링
    <table border="1" style={{ width: "100%", textAlign: "center", margin: "20px 0" }}>
      <thead>
        <tr>
          <th>국가명</th>
          <th>금메달</th>
          <th>은메달</th>
          <th>동메달</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        {infos.map((info) => (
          <tr key={info.id}>
            <td>{info.country}</td>
            <td>{info.gold}</td>
            <td>{info.silver}</td>
            <td>{info.bronze}</td>
            <td>
              <Button onClick={() => deleteInfoHandler(info.id)}>
                삭제
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
    </div>
  );
};

export default App;
