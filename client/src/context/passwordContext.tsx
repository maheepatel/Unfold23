import React, { createContext, useContext, useMemo, useState } from "react";

const initialContext = {
  password: "",
  accountName: "",
  wallet: {} as Wallet,
  setAccountName: (accountName: string) => {},
  setPassword: (password: string) => {},
  setWallet: (wallet: Wallet) => {},
};

export const passwordContext = createContext(initialContext);

export const usePasswordContext = () => {
  const context = useContext(passwordContext);
  if (!context) throw new Error("password context unavailable");
  return context;
};

type PasswordProviderProps = {
  children?: React.ReactNode;
};

type Wallet = {
  type: "mnemonic" | "privateKey";
  value: string;
};

export const PasswordProvider: React.FC<PasswordProviderProps> = ({
  children,
}) => {
  const [wallet, setWallet] = useState<Wallet>({ type: "mnemonic", value: "" });
  const [password, setPassword] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("Account 1");

  const value = useMemo(
    () => ({
      wallet,
      password,
      accountName,
      setWallet,
      setPassword,
      setAccountName,
    }),
    [password, wallet, accountName, setPassword, setWallet, setAccountName]
  );

  return (
    <passwordContext.Provider value={value}>
      {children}
    </passwordContext.Provider>
  );
};
