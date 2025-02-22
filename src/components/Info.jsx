import React from "react";
import Button from "./Button";

const Info = ({ user, deleteInfoHandler }) => {

  const { country, gold, silver, bronze, id } = user;

  return (
    // <div>는 SEO나 가독성 측면에서 좋지 않기 때문에, 대신 각각의 목적에 맞는 semantic tag를 많이 사용해야 한다.
    <div style={squareStyle}>
      <div>
        {country} {gold} {silver} {bronze}
        <Button color="#ddd" onClick={() => deleteInfoHandler(id)}>
          삭제
        </Button>
      </div>
    </div>
  );
};

export default Info;
