import { fireEvent, render, screen } from '@testing-library/react';
import SingtelGrid, { ColumnDef, RowData } from '../lib/SingtelGrid';
import '@testing-library/jest-dom/extend-expect';

describe('SingtelGrid', () => {
  const columnDefs: ColumnDef[] = [
    { headerName: 'Name', property: 'name', width: 100 },
    { headerName: 'Age', property: 'age', width: 80 },
  ];

  const rowData: RowData[] = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Smith', age: 25 },
  ];

  it('renders the grid with header and rows', () => {
    render(<SingtelGrid columnDefs={columnDefs} rowData={rowData} />);

    // Header
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();

    // Rows
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('handles row selection', () => {
    // const handleRowSelection = jest.fn();

    render(
      <SingtelGrid
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="multiple"
      />
    );

    const checkbox1 = screen.getAllByAltText('Not Checked')[1];
    const checkbox2 = screen.getAllByAltText('Not Checked')[2];

    // Click checkboxes to select rows
    expect(checkbox1.getAttribute('alt')).toEqual('Not Checked');
    expect(checkbox2.getAttribute('alt')).toEqual('Not Checked');

    // Select first row
    fireEvent.click(checkbox1);
    expect(checkbox1.getAttribute('alt')).toEqual('Checked');
    expect(checkbox2.getAttribute('alt')).toEqual('Not Checked');
    // expect(handleRowSelection).toHaveBeenCalledWith('{"name":"John Doe","age":30}');

    // Select second row
    fireEvent.click(checkbox2);
    expect(checkbox1.getAttribute('alt')).toEqual('Checked');
    expect(checkbox2.getAttribute('alt')).toEqual('Checked');
    // expect(handleRowSelection).toHaveBeenCalledWith('{"name":"Jane Smith","age":25}');

    // Deselect first row
    fireEvent.click(checkbox1);
    expect(checkbox1.getAttribute('alt')).toEqual('Not Checked');
    expect(checkbox2.getAttribute('alt')).toEqual('Checked');
    // expect(handleRowSelection).toHaveBeenCalledWith('{"name":"John Doe","age":30}');

    // Deselect second row
    fireEvent.click(checkbox2);
    expect(checkbox1.getAttribute('alt')).toEqual('Not Checked');
    expect(checkbox2.getAttribute('alt')).toEqual('Not Checked');
    // expect(handleRowSelection).toHaveBeenCalledWith('{"name":"Jane Smith","age":25}');
  });

  it('handles single row selection', () => {
    // const handleRowSelection = jest.fn();

    render(
      <SingtelGrid
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="single"
      />
    );

    const radioButton1 = screen.getAllByAltText('Not Checked')[0];
    const radioButton2 = screen.getAllByAltText('Not Checked')[1];

    // Click radio buttons to select rows
    expect(radioButton1.getAttribute('alt')).toEqual('Not Checked');
    expect(radioButton2.getAttribute('alt')).toEqual('Not Checked');

    // Select first row
    fireEvent.click(radioButton1.parentElement as HTMLElement);
    expect(radioButton1.getAttribute('alt')).toEqual('Checked');
    expect(radioButton2.getAttribute('alt')).toEqual('Not Checked');
    // expect(handleRowSelection).toHaveBeenCalledWith('0');

    // Select second row
    fireEvent.click(radioButton2.parentElement as HTMLElement);
    expect(radioButton1.getAttribute('alt')).toEqual('Not Checked');
    expect(radioButton2.getAttribute('alt')).toEqual('Checked');
    // expect(handleRowSelection).toHaveBeenCalledWith('1');
  });
});
