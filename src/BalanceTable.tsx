import { useState } from "react";

interface TableProps {
  data: string;
}

export const BalanceTable = ({ data }: TableProps) => {
  console.log(data);

  return (
    <table>
      <thead>
        <tr>
          <th>Token icon</th>
          <th>Current balance</th>
          <th>Token symbol</th>
          <th>Token name</th>
          <th>Contract address</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>
      </tbody>
    </table>
  );
};

export const Balances = () => {
  const [balances, setBalances] = useState("");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: "0xA97AB8",
        toBlock: "0xA97CAC",
        fromAddress: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
        contractAddresses: ["0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"],
        maxCount: "0x5",
        excludeZeroValue: true,
        category: ["external", "token"],
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const fetchBalances = async () => {
    // @ts-ignore
    fetch("https://eth-mainnet.alchemyapi.io/v2/demo", requestOptions)
      .then((response) => response.text())
      .then((result) => setBalances(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <button onClick={fetchBalances}>Fetch Balances</button>
      <BalanceTable data={balances} />
    </>
  );
};
