import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getAllCars, deleteCar } from '../../services/Car';
import { Spinner, Table, Thead, Tbody, Tr, Th, Td, chakra, Box, Button } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import './CarList.css';

import EditModal from '../EditModal/EditModal';

const CarList = () => {
  // Handle fetching the data for table
  const { isFetching, isLoading, data = { cars: [] } } = useQuery('allCars', getAllCars);

  // Handle Edit
  const [modalState, setModalState] = useState({ isOpen: false, data: null });
  // Handle Edit button click to open modal
  const handleEditClick = (data) => {
    setModalState({ isOpen: true, data });
  };

  //  Handle delete
  const deleteCarMutation = useMutation(deleteCar);
  useEffect(() => {}, [deleteCarMutation.isSuccess, modalState.isOpen]);
  //// Handle delete click
  const handleDeleteClick = (link) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      deleteCarMutation.mutate(link);
    }
  };

  //   Prepare columns for react-table
  const columns = useMemo(
    () => [
      { Header: 'Brand', accessor: 'brand' },
      { Header: 'Model', accessor: 'model' },
      { Header: 'Color', accessor: 'color' },
      { Header: 'Fuel', accessor: 'fuel' },
      { Header: 'Year', accessor: 'year', isNumeric: true },
      { Header: 'Price', accessor: 'price', isNumeric: true },
      {
        accessor: '_links.self.href',
        Cell: (row) => <Button onClick={() => handleEditClick(row.cell)}>Edit</Button>,
      },
      {
        accessor: '_links.car.href',
        Cell: (row) => {
          return (
            <Button onClick={() => handleDeleteClick(row.value)}>
              {deleteCarMutation.isLoading ? <Spinner /> : 'Delete'}
            </Button>
          );
        },
      },
    ],
    []
  );
  // Prepare props and data for react-table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: data.cars },
    useSortBy
  );

  //   Check and handle state from fetching
  if (isFetching || isLoading)
    return (
      <div className='loading'>
        <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
        <h1>Loading</h1>
      </div>
    );
  if (deleteCarMutation.isError) return 'Delete Error';

  // JSX
  return (
    <div>
      <EditModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        data={modalState.data}
      />
      <Box className='table-container'>
        <Table
          {...getTableProps()}
          variant='striped'
          colorScheme='teal'
          size='md'
          className='table'
        >
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                  >
                    {column.render('Header')}
                    <chakra.span pl='4'>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label='sorted descending' />
                        ) : (
                          <TriangleUpIcon aria-label='sorted ascending' />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};

export default CarList;
