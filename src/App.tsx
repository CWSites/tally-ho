import logo from "./logo.svg";
import { EthereumSignIn, WalletConnect } from "./EthereumSignIn";
import { Balances } from "./BalanceTable";

export const Header = () => {
  return (
    <header>
      <img src={logo} alt="Tally Ho" />
    </header>
  );
};

export const App = () => {
  return (
    <div className="App">
      <Header />
      <WalletConnect />
      <EthereumSignIn />
      <Balances />
    </div>
  );
};
