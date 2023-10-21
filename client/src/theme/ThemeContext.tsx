import React, { useContext, createContext, useCallback } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const initialThemeContext: ThemeContextProps = {
  theme: "light" || "dark",
  setTheme: () => {},
  toggleTheme: () => {},
};


export const ThemeContext =
  createContext<ThemeContextProps>(initialThemeContext);

export const useThemeContext = (): ThemeContextProps =>
  useContext(ThemeContext);

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FunctionComponent<
  ThemeContextProviderProps
> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = React.useState<Theme>("light");

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        setTheme: setCurrentTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
