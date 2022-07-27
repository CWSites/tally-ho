import { useState } from "react";
import logo from "./logo.svg";
import { EthereumSignIn, WalletConnect } from "./EthereumSignIn";
import { Balances } from "./Balances";

export const Header = () => {
  return (
    <header>
      <img src={logo} alt="Tally Ho" />
    </header>
  );
};

export const App = () => {
  const [address, setAddress] = useState("");

  return (
    <div className="App">
      <Header />
      <WalletConnect />
      <EthereumSignIn onSignIn={setAddress} />
      <Balances ownerAddress={address} />
    </div>
  );
};
