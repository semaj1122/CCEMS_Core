import React, { useEffect, useState } from 'react';
import GroupService from '../../../services/groupService';
import { PagedResult } from '../../../models/gruopDTOs';
import PaginationControls from '../../../components/Pagination/PaginationControls'
import Table from '../../../components/Table/Table';
import { Box, Typography, TextField, IconButton, Tooltip } from '@mui/material';
import EditNoteTwoTone from '@mui/icons-material/EditNoteTwoTone';
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';
import { FormattedDate } from '../../../utils/formatDate';
import { DashboardStyle } from './DashboardStyle';

const GroupList: React.FC = () => {

  // Define state with proper initial structure
  const [pagedResult, setPagedResult] = useState<PagedResult>({
    items: [], 
    totalCount: 0,
    pageNumber: 1,
    pageSize: 10, 
    searchTerm: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>(pagedResult.searchTerm);

  const fetchGroups = async () => {
    try {
      const result = await GroupService.getAllGroups(
        pagedResult.pageNumber, 
        pagedResult.pageSize, 
        searchTerm
      );
      setPagedResult(result);
      // console.log(result);
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  };

  // UseEffect hook to refetch groups based on page number, page size, or search term change
  useEffect(() => {
    fetchGroups();
  }, [pagedResult.pageNumber, pagedResult.pageSize, searchTerm]);

  const columns = [
    { label: 'Branch Code', accessor: 'code' },
    { label: 'Branch Name', accessor: 'name' },
    { label: 'Description', accessor: 'description' },
    { label: 'Date Created', 
      render: (data: any) => (
        FormattedDate(data.dateCreated)
      ),  
    },
    { label: 'Date Modifiedd', 
      render: (data: any) => (
        FormattedDate(data.dateModified)
      ),  
    },
    // { label: 'Created By', accessor: 'createdBy' },
    { label: 'Area', accessor: 'area' },
    { label: 'Division', accessor: 'division' },
    {
      label: 'Action',
      render: () => (
        <Box sx={DashboardStyle.buttonBox}>
          <Tooltip title="Edit">
            <IconButton color='primary'>
              <EditNoteTwoTone />
            </IconButton> 
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton sx={DashboardStyle.buttonRed}>
              <DeleteTwoTone />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const pageCount = Math.ceil(pagedResult.totalCount / pagedResult.pageSize);

  const handlePageChange = (newPage: number) => {
    setPagedResult({
      ...pagedResult,
      pageNumber: newPage,
    });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    pagedResult.pageNumber = 1;
  };

  return (
    <>
      <Box sx={DashboardStyle.mainBox}>
        <Typography variant="h6" component="h6" gutterBottom>
          Groups
        </Typography>

        {/* Search input box with spacing */}
        <Box sx={DashboardStyle.searchBox}>
          {/* Search Input */}
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={DashboardStyle.searchInput} // Make the input box flexible
            value={searchTerm}  // Controlled input
            onChange={handleSearchChange}  // Update search term as user types
          />
        </Box>
      </Box>

      {/* Table wrapped inside a responsive container */}
      <Table columns={columns} data={pagedResult.items} />

      {/* Pagination Controls Component */}
      <PaginationControls
        currentPage={pagedResult.pageNumber}
        totalPages={pageCount}
        onPageChange={handlePageChange}
        totalItems={pagedResult.totalCount}
      />
    </>
  );
};

export default GroupList;
