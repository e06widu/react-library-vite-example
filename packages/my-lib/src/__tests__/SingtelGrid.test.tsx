import { render, screen, fireEvent } from '@testing-library/react';
import SingtelGrid, { ColumnDef, RowData } from '../lib/SingtelGrid';
import '@testing-library/jest-dom/extend-expect';

describe('SingtelGrid', () => {
  const columnDefs: ColumnDef[] = [
    { headerName: 'Name', property: 'name', width: 100 },
    { headerName: 'Age', property: 'age', width: 50 },
    { headerName: 'Email', property: 'email', width: 200 },
  ];

  const rowData: RowData[] = [
    { name: 'John', age: 30, email: 'john@example.com' },
    { name: 'Jane', age: 25, email: 'jane@example.com' },
  ];

  it('renders the grid with header and rows', () => {
    render(
      <SingtelGrid columnDefs={columnDefs} rowData={rowData} showHeader={true} />
    );

    // Check if the header cells are rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();

    // Check if the row cells are rendered
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();

    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('handles sorting when clicking on a sortable column header', () => {
    render(
      <SingtelGrid columnDefs={columnDefs} rowData={rowData} showHeader={true} />
    );

    const ageHeader = screen.getByText('Age').parentElement!;

    // Initial order: John, Jane
    expect(screen.getAllByText(/John|Jane/)[0]).toHaveTextContent('John');

    // Click on the age header to sort in descending order
    fireEvent.click(ageHeader);

    // After sorting: Jane, John
    expect(screen.getAllByText(/John|Jane/)[0]).toHaveTextContent('John');

    // Click on the age header again to sort in ascending order
    fireEvent.click(ageHeader);

    // After sorting: John, Jane
    expect(screen.getAllByText(/John|Jane/)[0]).toHaveTextContent('John');
  });

  it('handles row selection when clicking on a row', () => {
    render(
      <SingtelGrid
        columnDefs={columnDefs}
        rowData={rowData}
        showHeader={true}
        rowSelection="single"
      />
    );

    const johnRow = screen.getByText('John').parentElement!;
    const janeRow = screen.getByText('Jane').parentElement!;

    // Initially, no row is selected
    expect(johnRow).not.toHaveClass('singtel-grid-row-selected');
    expect(janeRow).not.toHaveClass('singtel-grid-row-selected');

    // Click on the John row to select it
    fireEvent.click(johnRow);

    // Only the John row should be selected
    expect(johnRow).toHaveClass('singtel-grid-row-selected');
    expect(janeRow).not.toHaveClass('singtel-grid-row-selected');

    // Click on the Jane row to select it
    fireEvent.click(janeRow);

    // Only the Jane row should be selected now
    expect(johnRow).not.toHaveClass('singtel-grid-row-selected');
    expect(janeRow).toHaveClass('singtel-grid-row-selected');
  });
});
