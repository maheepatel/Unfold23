import React from "react";

import { RouterProvider } from "react-router-dom";
import router from "./routes";

import ThemeProvider from "./theme";
import { ThemeContextProvider } from "./theme/ThemeContext";
import { MotionContainer } from "./Components/animate";
import SnackbarProvider from "./Components/snackbar";

import { PasswordProvider } from "./context/passwordContext";
import Web3Provider from "./ethereum/index";

const App: React.FC<{}> = () => {
  return (
    <ThemeContextProvider>
      <ThemeProvider>
        <MotionContainer>
          <SnackbarProvider>
            <PasswordProvider>
              <Web3Provider>
                <RouterProvider router={router} />
              </Web3Provider>
            </PasswordProvider>
          </SnackbarProvider>
        </MotionContainer>
      </ThemeProvider>
    </ThemeContextProvider>
  );
};

export default App;
