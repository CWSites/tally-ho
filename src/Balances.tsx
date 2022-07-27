import { useState } from "react";
import { BalanceTable } from "./BalanceTable";

interface BalanceProps {
  ownerAddress: string;
}

export const Balances = ({ ownerAddress }: BalanceProps) => {
  const [balances, setBalances] = useState([]);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const apiKey = "_ArbR3W9Ttz3Cx1Ofa_vVhcIxzxbx7tC";
  const tokenAddress = "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9";

  const raw = JSON.stringify({
    jsonrpc: "2.0",
    id: 42,
    method: "alchemy_getTokenBalances",
    params: [ownerAddress, [tokenAddress]],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const fetchBalances = async () => {
    // @ts-ignore
    fetch(`https://eth-mainnet.alchemyapi.io/v2/${apiKey}`, requestOptions)
      .then((response) => response.text())
      .then((result) => setBalances(JSON.parse(result).result.tokenBalances))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      {ownerAddress !== "" && (
        <button onClick={fetchBalances}>Fetch Balances</button>
      )}
      <BalanceTable data={balances} />
    </>
  );
};
