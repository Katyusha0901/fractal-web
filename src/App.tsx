import React, { useState } from "react";

interface UserData {
  name: string;
  repos: number;
}
export function App() {
  const [givenValue, setGivenValue] = useState<string>("");
  const [selectorValue, setSelectorValue] = useState<string>("user");

  const [userData, setUserData] = useState<UserData | undefined>();
  console.log(userData);
  return (
    <div className="App">
      <Selector setSelectorValueFunction={setSelectorValue} />

      <Input
        givenValueInput={givenValue}
        setGivenValueFunction={setGivenValue}
        setUserDataFunction={setUserData}
      />

      <div></div>
    </div>
  );
}

///////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////
interface PropsSelector {
  setSelectorValueFunction: React.Dispatch<React.SetStateAction<string>>;
}

const Selector: React.FC<PropsSelector> = ({ setSelectorValueFunction }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        margin: "10px",
      }}
    >
      <p>Choose a type</p>
      <select
        name="type"
        id="type"
        onChange={(option) => setSelectorValueFunction(option.target.value)}
      >
        <option id="user" value={"user"}>
          user
        </option>
        <option id="repo" value={"repo"}>
          repo
        </option>
      </select>
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface PropsInput {
  givenValueInput: string;
  setGivenValueFunction: React.Dispatch<React.SetStateAction<string>>;
  setUserDataFunction: React.Dispatch<
    React.SetStateAction<UserData | undefined>
  >;
}

const Input: React.FC<PropsInput> = ({
  givenValueInput,
  setGivenValueFunction,
  setUserDataFunction,
}) => {
  return (
    <>
      <input
        onChange={(data) => setGivenValueFunction(data.target.value)}
      ></input>
      <button
        onClick={() => {
          fetch(`https://api.github.com/users/${givenValueInput}`)
            .then((response) => {
              return response.json();
            })
            .then((data: any) => {
              setUserDataFunction({
                name: `${data.name}`,
                repos: data.public_repos,
              });
            });
        }}
      >
        Send
      </button>
    </>
  );
};
