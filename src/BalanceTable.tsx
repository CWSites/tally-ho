import icon from "./icon.svg";

interface TableProps {
  data: any[];
}

export const BalanceTable = ({ data }: TableProps) => {
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
        {data.length > 0 ? (
          data.map((row: any, index) => (
            <tr key={index}>
              <td className="center">
                <img src={icon} alt="" />
              </td>
              <td className="right">{row.tokenBalance}</td>
              <td>TAL</td>
              <td>Tally Token</td>
              <td>{row.contractAddress}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>
              <span className="empty-msg">
                No balances found. Please make sure you are signed in to your
                wallet.
              </span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
