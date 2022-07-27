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

    console.log(provider);
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
    <>
      {!signerAddress && (
        <button id="siweBtn" onClick={signInWithEthereum}>
          Ethereum Sign In
        </button>
      )}
      <div>
        {signerAddress && (
          <dl>
            <dt>Owner Address</dt>
            <dd>
              <a
                href={`https://etherscan.io/address/${ethAddress}`}
                target="_blank"
                rel="noreferrer"
              >
                <code>{ethAddress}</code>
              </a>
            </dd>
            <dt>Signer Address</dt>
            <dd>
              <code className="ellipsis">{signerAddress}</code>
            </dd>
          </dl>
        )}
      </div>
    </>
  );
};
