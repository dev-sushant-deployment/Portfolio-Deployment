import { createContext, Dispatch, SetStateAction, useContext } from "react";

type slimeBallContextType = {
  slimeBallColor: string;
  setSlimeBallColor: Dispatch<SetStateAction<string>>;
  scale: number;
  setScale: Dispatch<SetStateAction<number>>;
};

const SlimeBallContext = createContext<slimeBallContextType>({
  slimeBallColor: "white",
  setSlimeBallColor: () => {},
  scale: 1,
  setScale: () => {},
});

export const SlimeBallProvider = SlimeBallContext.Provider;

export const useSlimeBall = () => useContext(SlimeBallContext)