import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

// @ts-ignore - https://github.com/Microsoft/TypeScript/issues/1574
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

interface EthereumSignInProps {
  onSignIn: (address: string) => void;
}

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

export const EthereumSignIn = ({ onSignIn }: EthereumSignInProps) => {
  const [signerAddress, setSignerAddress] = useState("");
  const [ethAddress, setEthAddress] = useState("");

  const domain = window.location.host;
  const origin = window.location.origin;

  useEffect(() => {
    localStorage.setItem("signerAddress", signerAddress);
  }, [signerAddress]);

  const createSiweMessage = (address: string, statement: string) => {
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
    });
    setEthAddress(address);
    onSignIn(address);
    return message.prepareMessage();
  };

  const signInWithEthereum = async () => {
    const message = createSiweMessage(
      await signer.getAddress(),
      "Sign in with Ethereum to the app."
    );
    setSignerAddress(await signer.signMessage(message));
  };

  return (
    <div>
      {!signerAddress && (
        <button id="siweBtn" onClick={signInWithEthereum}>
          Ethereum Sign In
        </button>
      )}
      {signerAddress && (
        <p>
          Signed in to wallet{" "}
          <a
            href={`https://etherscan.io/address/${ethAddress}`}
            target="_blank"
            rel="noreferrer"
          >
            <code>{ethAddress}</code>
          </a>
          , verification <code>{signerAddress}</code>
        </p>
      )}
      <button>Sign message</button>
    </div>
  );
};
