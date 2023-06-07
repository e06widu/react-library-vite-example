import React, { useState, useMemo } from "react";
import "./SingtelTbl.css";

interface SingtelTblProps {
  data: any[]; // Array of table data objects
  showHeader?: boolean; // Optional flag to show or hide the header
  onRowSelect?: (selectedRows: any[]) => void; // Row selection callback function
  selectedRows?: any[]; // Array of selected rows
}

const SingtelTbl: React.FC<SingtelTblProps> = ({
  data,
  showHeader = true,
  onRowSelect,
  selectedRows = [],
}) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleRowSelect = (row: any) => {
    const isSelected = selectedRows.includes(row);
    let updatedSelectedRows: any[];

    if (isSelected) {
      updatedSelectedRows = selectedRows.filter((selectedRow) => selectedRow !== row);
    } else {
      updatedSelectedRows = [...selectedRows, row];
    }

    if (onRowSelect) {
      onRowSelect(updatedSelectedRows);
    }
  };

  const sortedData = useMemo(() => {
    if (!sortField) {
      return data;
    }

    const sorted = [...data].sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [data, sortField, sortOrder]);

  return (
    <div className="singtel-tbl">
      {showHeader && (
        <div className="singtel-tbl-header">
          <div className="singtel-tbl-row">
            <div
              className={`singtel-tbl-cell ${
                sortField === "header1" ? "active" : ""
              }`}
              onClick={() => handleSort("header1")}
            >
              Header 1 {sortField === "header1" && <span>{sortOrder === "asc" ? "▲" : "▼"}</span>}
            </div>
            <div
              className={`singtel-tbl-cell ${
                sortField === "header2" ? "active" : ""
              }`}
              onClick={() => handleSort("header2")}
            >
              Header 2 {sortField === "header2" && <span>{sortOrder === "asc" ? "▲" : "▼"}</span>}
            </div>
            <div
              className={`singtel-tbl-cell ${
                sortField === "header3" ? "active" : ""
              }`}
              onClick={() => handleSort("header3")}
            >
              Header 3 {sortField === "header3" && <span>{sortOrder === "asc" ? "▲" : "▼"}</span>}
            </div>
          </div>
        </div>
      )}
      <div className="singtel-tbl-body">
        {sortedData.map((item, index) => (
          <div
            key={index}
            className={`singtel-tbl-row ${
              index === data.length - 1 ? "last-row" : ""
            } ${selectedRows.includes(item) ? "selected-row" : ""}`}
          >
            <div className="singtel-tbl-cell">
              <input
                type="checkbox"
                checked={selectedRows.includes(item)}
                onChange={() => handleRowSelect(item)}
              />
            </div>
            <div className="singtel-tbl-cell">{item.header1}</div>
            <div className="singtel-tbl-cell">{item.header2}</div>
            <div className="singtel-tbl-cell">{item.header3}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingtelTbl;
