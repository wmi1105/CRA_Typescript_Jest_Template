import { useState } from "react";
import { textData } from "./data";

export function ShowUserInfo() {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow((b) => !b);

  return (
    <div>
      {!show ? (
        <div>{textData.toggleInfo}</div>
      ) : (
        <ul>
          <li>email - {textData.email}</li>
          <li>address - {textData.address}</li>
        </ul>
      )}
      <button onClick={handleClick}>
        {!show ? textData.buttonShow : textData.buttonHide}
      </button>
    </div>
  );
}
