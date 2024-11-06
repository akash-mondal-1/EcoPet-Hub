import styles from './Table.module.css';

const Table = ({ className, data, columns }) => {
  let tableClassName = styles.table;

  if (className) {
    tableClassName = `${tableClassName} ${className}`;
  }

  // Generate table rows based on the data provided
  const rows = data.map((item) =>
    columns.map(({ columnId }) => item[columnId] ?? "N/A") // Default to "N/A" if data is missing
  );

  return (
    <table className={tableClassName}>
      <thead>
        <tr>
          {columns.map(({ columnId, Header }) => (
            <th key={columnId}>{Header}</th>  // Use <th> for headers
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={`${rowIndex}-${cellIndex}`}>{cell}</td> // Improved key naming
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
