import React, { createContext, useState, useEffect } from "react";

export const QueueContext = createContext();

export const QueueProvider = (props) => {
  const [componentArray, setComponentArray] = useState([]);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let time = 0;
    componentArray.map((timer) => (time = time + timer.totalSeconds));
    setTotalTime(time);
    console.log(time);
  }, [JSON.stringify(componentArray)]);

  const addComponent = (Component) => {
    setComponentArray(componentArray.concat(Component));
  };

  const removeComponent = (Index) => {
    setComponentArray(
      componentArray.splice(0, Index),
      ...componentArray.slice(Index + 1)
    );
  };

  return (
    <QueueContext.Provider
      value={{
        componentArray,
        setComponentArray,
        addComponent,
        removeComponent,
      }}
    >
      {props.children}
    </QueueContext.Provider>
  );
};
