import { ethers } from "ethers";
import { SiweMessage } from "siwe";

const domain = window.location.host;
const origin = window.location.origin;
// @ts-ignore - https://github.com/Microsoft/TypeScript/issues/1574
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export const WalletConnect = () => {
  const connectWallet = () => {
    provider
      .send("eth_requestAccounts", [])
      .catch(() => console.log("user rejected request"));
  };

  return (
    <button id="connectWalletBtn" onClick={connectWallet}>
      Wallet Connect
    </button>
  );
};

export const EthereumSignIn = () => {
  const createSiweMessage = (address: string, statement: string) => {
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
    });
    return message.prepareMessage();
  };

  const signInWithEthereum = async () => {
    const message = createSiweMessage(
      await signer.getAddress(),
      "Sign in with Ethereum to the app."
    );
    console.log(await signer.signMessage(message));
  };

  return (
    <>
      <button id="siweBtn" onClick={signInWithEthereum}>
        Ethereum Sign In
      </button>
      <p>Sign in message here...</p>
      <button>Sign message</button>
    </>
  );
};
