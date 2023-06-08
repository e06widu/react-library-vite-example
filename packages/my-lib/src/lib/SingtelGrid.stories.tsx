import { Meta, StoryObj } from '@storybook/react';
import SingtelGrid, { ColumnDef, RowData } from './SingtelGrid';

const meta: Meta<typeof SingtelGrid> = {
    title: 'Design System/SingtelGrid',
    component: SingtelGrid,
};
export default meta;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const columnDefs: ColumnDef[] = [
//     { headerName: 'Name', property: 'name', width: 150, isSort: true },
//     { headerName: 'Age', property: 'age', width: 100, isSort: true },
//     { headerName: 'City', property: 'city', width: 200, isSort: true },
//     { headerName: 'Address', property: 'address', width: 300, isSort: true },
//     { headerName: 'Income', property: 'income', width: 120, align: 'rightAligned', isSort: false },
//   ];

//   const rowData: RowData[] = [
//     { name: 'A John Doe', age: 25, city: 'New York', address: 'Sample address',  income: 50000 },
//     { name: 'C Jane Smith', age: 30, city: 'San Francisco', address: 'Sample address', income: 70000 },
//     { name: 'B Mike Johnson', age: 35, city: 'London', address: 'Sample address', income: 60000 },
//     { name: 'E John Doe', age: 25, city: 'New York', address: 'Sample address',  income: 50000 },
//     { name: 'G Jane Smith', age: 30, city: 'San Francisco', address: 'Sample address', income: 70000 },
//     { name: 'P Mike Johnson', age: 35, city: 'London', address: 'Sample address', income: 60000 },
//   ];

  const columnDefs: ColumnDef[] = [
    { headerName: 'Name', property: 'name', width: 100 },
    { headerName: 'Age', property: 'age', width: 80 },
  ];

  const rowData: RowData[] = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Smith', age: 25 },
  ];

export const Primary: StoryObj<typeof SingtelGrid> = {
    args: {
        columnDefs:columnDefs,
        rowData:rowData,
        showHeader: true,
        rowSelection:"multiple"
    },
};

