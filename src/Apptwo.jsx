import { useState } from 'react'
import './App.css'

function App() {

  const formStyle = {
    minWidth: "fit-content",
    minHeight: "250px",
    border: "1px solid green",
    borderRadius: "10px",
    display: "flex",          // flexbox 사용
    flexDirection: "column",  // 아이템 배치 방향: 세로
    alignItems: "center",     // 세로 정렬: 가운데
    justifyContent: "center", // 가로 정렬: 가운데
    padding: "1rem",
  }

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "800",
    marginBottom: "50px",
    color: "navy",
  }

  const input = {
    display: "flex",
    flexDirection: "column",
  }

  const inputStyle = {
    display: "flex",
    gap: "5px",
  }

  const buttonStyle = {
    display: "flex",
    gap: "10px",
  }

  //-----------------------------기능 구현!

const [countries, setCountries] = useState([]); // 국가 목록을 저장할 상태

// 값 입력값을 저장할 상태
const [countryName, setCountryNamy] = useState(""); 
const [gold, setGold] = useState(0);
const [silver, setSilver] = useState(0);
const [bronze, setBronze] = useState(0);

const getFormData = () => {
  return {name: countryName, gold, silver, bronze};
}

const handleSubmit = (e) => {
    e.preventDefault(); //새로고침 방지

    const newCountry = getFormData();

    setCountries([...countries, newCountry]); //새로운 국가 정보 추가

    // form 제출 후 input 값 초기화
    setCountryName(""); 
    setGold(0);
    setSilver(0);
    setBronze(0);
}


  return (
    <div style={formStyle}>
      <div style={titleStyle}>2024 파리 올림픽</div>
      <form style={inputStyle} onSubmit={handleSubmit}>
        <div style={input}>
          <label htmlFor="#country">국가이름</label>
          <input
            type="text"
            onChange={(e) => setCountryName(e.target.value)}
            placeholder="국가 이름 입력"
            required/>
        </div>
        <div style={input}>
          <label htmlFor="#country">금메달</label>
          <input 
          type="number"
          value={gold}
          onChange={(e) => setGold(Number(e.target.value))}
          placeholder="0"
          required/>
        </div>
        <div style={input}>
          <label htmlFor="#country">은메달</label>
          <input 
            type="number"
            value={silver}
            onChange={(e) => setSilver(Number(e.target.value))}
            placeholder="0"
            required/>
        </div>
        <div style={input}>
          <label htmlFor="#country">동메달</label>
          <input 
            type="number" 
            value={bronze}
            onChange={(e) => setBronze(Number(e.target.value))}
            placeholder="0"
            required/>
        </div>
        <div style={buttonStyle}>
          <button>국가 추가</button>
          <button>업데이트</button>
        </div>
      </form>

      <h2>국가 목록</h2>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            <strong>{country.name}</strong> - 금메달: {country.gold}, 은메달: {country.silver}, 동메달: {country.bronze}
          </li>
        ))}
      </ul>
    </div>
  );
}


// MedalItem 컴포넌트: 개별 국가 정보 출력
function MedalItem({ country }) {
  return (
    <li>
      <strong>{country.name}</strong> - 금메달: {country.gold}, 은메달: {country.silver}, 동메달: {country.bronze}
    </li>
  );
}

// MedalList 컴포넌트: 국가 목록을 출력
function MedalList({ countries }) {
  // 금메달 수를 기준으로 내림차순 정렬
  const sortedCountries = [...countries].sort((a, b) => b.gold - a.gold);

  const renderSortedCountries = (soatedCountries) => {
    return sortedCountries.map((country, index) => (
    <MedalItem key={index} country={country} />
  ));
};

  return (
    <div>
      <div>
        {renderSortedCountries(sortedCountries)}
      </div>
      <div>
        <button>삭제</button>
      </div>
    </div>
  );
}

export default App