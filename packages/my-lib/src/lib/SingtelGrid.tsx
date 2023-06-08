import React, { useEffect, useState } from 'react';
import './SingtelGrid.css';
import sortingUpIcon from '../assets/sortingUp.svg';
import sortingDownIcon from '../assets/sortingDown.svg';
import sortingNeutralIcon from '../assets/sortingNeutral.svg';

import SingtelCheckBox from './SingtelCheckBox';
import SingtelRadioButton from './SingtelRadioButton';

export interface ColumnDef {
    headerName: string;
    property: string;
    width: number;
    align?: 'rightAligned' | 'leftAligned';
    isSort?: boolean;
}

export interface RowData {
    [key: string]: any;
}

export interface SingtelGridProps {
    columnDefs: ColumnDef[];
    rowData: RowData[];
    showHeader?: boolean;
    getUniqRowId?: (data: RowData) => string;
    rowSelection?: 'single' | 'multiple';
}

const SingtelGrid: React.FC<SingtelGridProps> = ({
    columnDefs,
    rowData,
    showHeader = true,
    rowSelection,
    getUniqRowId = (data: RowData) => JSON.stringify(data),
}) => {
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const [isMobileView, setIsMobileView] = useState<boolean>(false);
    const [isHeaderMultiselect, setIsHeaderMultiselect] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSort = (column: string) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const getSortIcon = (column: string) => {
        if (column === sortColumn) {
            return sortOrder === 'asc' ? sortingDownIcon : sortingUpIcon;
        } else {
            return sortingNeutralIcon;
        }
    };

    const handleRowSelection = (rowId: string) => {
        if (rowSelection === 'single') {
            setSelectedRows([rowId]);
        } else if (rowSelection === 'multiple') {
            const selectedRowSet = new Set(selectedRows);
            if (selectedRowSet.has(rowId)) {
                selectedRowSet.delete(rowId);
            } else {
                selectedRowSet.add(rowId);
            }
            setSelectedRows(Array.from(selectedRowSet));
        }
    };

    const handleHeaderRowSelection = (checked: boolean) => {
        setIsHeaderMultiselect(checked);
        if (checked) {
            const selectedRowSet = new Set(selectedRows);
            sortedData.map((row) => {
                const rowId = getUniqRowId(row); 
                selectedRowSet.add(rowId);
            })
            setSelectedRows(Array.from(selectedRowSet));
        } else {
            setSelectedRows([]);
        }
    }

    const handleRowSelectionHeader = () => {
        return <div
            className="singtel-grid-selection-cell"
        >
            {rowSelection === 'single' && (
                <div className='single'></div>
            )}
            {rowSelection === 'multiple' && (
                <SingtelCheckBox
                    checked={isHeaderMultiselect}
                    onChange={handleHeaderRowSelection}
                />
            )}
        </div>
    };

    const isRowSelected = (rowId: string) => {
        return selectedRows.includes(rowId);
    };

    const renderHeaderCell = (columnDef: ColumnDef) => {
        const isSortable = columnDef.isSort ?? false;
        const sortIcon = getSortIcon(columnDef.property);

        return (
            <div
                key={columnDef.property}
                className={`singtel-grid-header-cell ${columnDef.align ? columnDef.align : 'leftAligned'
                    }`}
                style={{ width: columnDef.width }}
                onClick={() => isSortable && handleSort(columnDef.property)}
            >
                <span>{columnDef.headerName}</span>
                {isSortable && (
                    <div className="singtel-grid-sort"><img
                        src={sortIcon}
                        alt="Sort Icon"
                        className="singtel-grid-sort-icon"
                    /></div>
                )}
            </div>
        );
    };

    const renderRowSelectionCell = (rowId: string) => {
        const isSelected = isRowSelected(rowId);
        const selectionBgColor = isSelected ? '#EFEDFD' : '';

        return (
            <div
                className="singtel-grid-selection-cell"
                style={{ backgroundColor: selectionBgColor }}
            >
                {rowSelection === 'single' && (
                    <SingtelRadioButton
                        checked={isSelected}
                        onChange={() => handleRowSelection(rowId)}
                    />
                )}
                {rowSelection === 'multiple' && (
                    <SingtelCheckBox
                        checked={isSelected}
                        onChange={() => handleRowSelection(rowId)}
                    />
                )}
            </div>
        );
    };

    const renderRow = (row: RowData) => {
        const rowId = getUniqRowId(row); 
        const isSelected = isRowSelected(rowId);
        const selectionBgColor = isSelected ? '#EFEDFD' : '';

        return (
            <div
                key={rowId}
                className="singtel-grid-row"
                style={{ backgroundColor: selectionBgColor }}
            >
                {rowSelection && renderRowSelectionCell(rowId)}
                {isMobileView && <div className='singtel-grid-cell-mobile'>
                    {columnDefs.map((columnDef, columnIndex) => (
                        <div key={columnIndex} style={{ display: 'flex', }}>
                            <div className={`singtel-grid-cell-mobile-header`}>{columnDef.headerName} : </div>
                            <div className={`singtel-grid-cell-mobile-text`} >{row[columnDef.property]}</div>
                        </div>
                    ))}</div>
                }
                {!isMobileView && columnDefs.map((columnDef, columnIndex) => (
                    <div key={columnIndex}>
                        <div
                            className={`singtel-grid-cell ${columnDef.align ? columnDef.align : 'leftAligned'
                                }`}
                            style={{ width: columnDef.width }}
                        >
                            {row[columnDef.property]}
                        </div>
                        {columnIndex < columnDefs.length - 1 && (
                            <div className="singtel-grid-row-divider" />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const sortedData = [...rowData].sort((a: RowData, b: RowData) => {
        if (sortColumn) {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (aValue < bValue) {
                return sortOrder === 'asc' ? -1 : 1;
            } else if (aValue > bValue) {
                return sortOrder === 'asc' ? 1 : -1;
            }
        }

        return 0;
    });

    return (
        <div className="singtel-grid">
            {showHeader && (
                <div className="singtel-grid-header">
                    {isMobileView ? <>Contract Details</> : <>
                        {rowSelection && <div className="singtel-grid-header-selection-cell">
                            {rowSelection && handleRowSelectionHeader()}
                        </div>}
                        {columnDefs.map((columnDef) => renderHeaderCell(columnDef))}
                    </>}
                </div>
            )}
            <div className="singtel-grid-body">
                {sortedData.map((row) => renderRow(row))}
            </div>
        </div>
    );
};

export default SingtelGrid;
