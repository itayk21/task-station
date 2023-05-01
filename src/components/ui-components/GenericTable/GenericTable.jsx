import React from "react";

const GenericTable = ({ columns, items, clickRowFeature }) => {
  const getClickRowValue = (item, column) => {
    console.log("column.key", column);

    return clickRowFeature.key === column.key ? (
      <a href={`${clickRowFeature.baseUrl}/${item[clickRowFeature.idKey]}`}>
        {item[column.key]}
      </a>
    ) : (
      item[column.key]
    );
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.label}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.label + index}>
                {getClickRowValue(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GenericTable;
