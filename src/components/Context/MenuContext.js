import React, { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = (props) => {
  const [stopwatch, setStopwatch] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const [xy, setXY] = useState(false);
  const [tabata, setTabata] = useState(false);
  const [menu, setMenu] = useState(true);

  return (
    <MenuContext.Provider
      value={{
        stopwatch,
        setStopwatch,
        xy,
        setXY,
        tabata,
        setTabata,
        menu,
        setMenu,
        countdown,
        setCountdown,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};
