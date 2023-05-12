import * as React from "react";

import { HotkeysProvider } from "@blueprintjs/core";
import {
    Cell,
    Column,
    ColumnHeaderCell2,
    Table2,
} from "@blueprintjs/table";

const NumberFormat = new Intl.NumberFormat();

const formatNumber = (num: number) => NumberFormat.format(num);

const getCellData = (rowIndex: number, columnIndex: number) => {
    return `Cell ${formatNumber(rowIndex)}-${formatNumber(columnIndex)}`;
};

const getColumn = (index: number, getCellData: (rowIndex: number, columnIndex: number) => string) => {
    const name = `Column ${index}`;
    const cellRenderer = (rowIndex: number, columnIndex: number) => {
        return <Cell>{getCellData(rowIndex, columnIndex)}</Cell>;
    };
    const columnHeaderCellRenderer = () => <ColumnHeaderCell2 name={name} />;
    return (
        <Column
            cellRenderer={cellRenderer}
            columnHeaderCellRenderer={columnHeaderCellRenderer}
            key={name}
            name={name}
        />
    );
};

export const Table = () => {
    const [numRows, setNumRows] = React.useState(10);
    const [numColumn, setNumColumns] = React.useState(4);
    const columns = Array(numColumn).fill(null).map((_, index) => getColumn(index, getCellData));
    const changeNum = (setNum: (num: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => setNum(parseInt(e.target.value) || 0);
    const [focusedCellCoordinates, setFocusedCellCoordinates] = React.useState({
        col: 0,
        row: 0,
        focusSelectionIndex: 0
    });
    return (
        <HotkeysProvider>
            <div className="container">
                <div className="row">
                    <label>Rows</label>
                    <input type="number" value={numRows} onChange={changeNum(setNumRows)} />
                    <label>Columns</label>
                    <input type="number" value={numColumn} onChange={changeNum(setNumColumns)} />
                    <span>{formatNumber(numRows)} x {formatNumber(numColumn)}</span>
                    <span>Focused {getCellData(focusedCellCoordinates.row, focusedCellCoordinates.col)}</span>
                </div>
                <div className="tableContainer">
                    <Table2
                        numRows={numRows}
                        enableFocusedCell={true}
                        enableRowResizing={false}
                        enableColumnResizing={false}
                        enableRowHeader={false}
                        onFocusedCell={setFocusedCellCoordinates}
                    >
                        {columns}
                    </Table2>
                </div>
            </div>
        </HotkeysProvider>
    );
};