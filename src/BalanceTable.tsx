interface TableProps {
  data: any[];
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
