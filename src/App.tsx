import React, { useState } from "react";

interface UserData {
  name: string;
  repos: number;
}
interface RepoData {
  name: string;
  stars: number;
}

export function App() {
  const [givenValue, setGivenValue] = useState<string>("");
  const [selectorValue, setSelectorValue] = useState<string>("user");

  const [userData, setUserData] = useState<UserData | undefined>();
  const [repoData, setRepoData] = useState<RepoData | undefined>();

  const [isSendData, setIsSendData] = useState<boolean>(false);

  return (
    <div className="App">
      <Selector
        setSelectorValueFunction={setSelectorValue}
        setIsSendDataFunction={setIsSendData}
      />

      <Input
        givenValueInput={givenValue}
        selectorValueInput={selectorValue}
        setGivenValueFunction={setGivenValue}
        setUserDataFunction={setUserData}
        setRepoDataFunction={setRepoData}
        setIsSendDataFunction={setIsSendData}
      />

      <Information
        userDataValue={userData}
        repoDataValue={repoData}
        isSendDataValue={isSendData}
        selectorValueInformation={selectorValue}
      />
    </div>
  );
}

///////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////
interface PropsSelector {
  setSelectorValueFunction: React.Dispatch<React.SetStateAction<string>>;
  setIsSendDataFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const Selector: React.FC<PropsSelector> = ({
  setSelectorValueFunction,
  setIsSendDataFunction,
}) => {
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
        onChange={(option) => {
          setSelectorValueFunction(option.target.value);
          setIsSendDataFunction(false);
        }}
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
  selectorValueInput: string;
  setGivenValueFunction: React.Dispatch<React.SetStateAction<string>>;
  setUserDataFunction: React.Dispatch<
    React.SetStateAction<UserData | undefined>
  >;
  setRepoDataFunction: React.Dispatch<
    React.SetStateAction<RepoData | undefined>
  >;
  setIsSendDataFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input: React.FC<PropsInput> = ({
  givenValueInput,
  selectorValueInput,
  setGivenValueFunction,
  setUserDataFunction,
  setRepoDataFunction,
  setIsSendDataFunction,
}) => {
  return (
    <>
      <input
        onChange={(data) => setGivenValueFunction(data.target.value)}
      ></input>
      <button
        onClick={() => {
          if (selectorValueInput === "user") {
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
          } else {
            fetch(`https://api.github.com/repos/${givenValueInput}`)
              .then((response) => {
                return response.json();
              })
              .then((data: any) => {
                setRepoDataFunction({
                  name: `${data.full_name}`,
                  stars: data.stargazers_count,
                });
              });
          }
          setIsSendDataFunction(true);
        }}
      >
        Send
      </button>
    </>
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface PropsInformation {
  userDataValue: UserData | undefined;
  repoDataValue: RepoData | undefined;
  isSendDataValue: boolean;
  selectorValueInformation: string;
}

const Information: React.FC<PropsInformation> = ({
  userDataValue,
  repoDataValue,
  isSendDataValue,
  selectorValueInformation,
}) => {
  return isSendDataValue ? (
    selectorValueInformation === "user" ? (
      <div>
        <div>Full Name: {userDataValue?.name}</div>
        <div>Count Of Repositories: {userDataValue?.repos}</div>
      </div>
    ) : (
      <div>
        <div>Full Name: {repoDataValue?.name}</div>
        <div>Count Of Stars: {repoDataValue?.stars}</div>
      </div>
    )
  ) : (
    <div></div>
  );
};
