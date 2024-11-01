// Limit 25 Call The API
// __________________________________________________________________________________________________________
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Box,
//   Grid,
//   Card,
//   Checkbox,
//   IconButton,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import SettingsIcon from "@mui/icons-material/Settings";
// import MenuIcon from "@mui/icons-material/Menu";
// import Pagination from "./members-pagination";
// import DialogBox from "./members-dialogue";

// const MembersTable = () => {
//   const [data, setData] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectAll, setSelectAll] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [allMembers, setAllMembers] = useState([]); // This will hold all member data

//   const [selectedColumns, setSelectedColumns] = useState({
//     id: false,
//     sNo: true,
//     member: true,
//     age: true,
//     education: true,
//     fatherName: false,
//     motherName: false,
//     husbandName: false,
//     city: true,
//     profession: true,
//     description: false,
//     status: true,
//     action: true,
//   });
//   const [tempSelectedColumns, setTempSelectedColumns] = useState({
//     ...selectedColumns,
//   });
//   const navigate = useNavigate();

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 25;
//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const handleSelectAllChange = () => {
//     const newSelectAll = !selectAll;
//     setSelectAll(newSelectAll);

//     // Get only the IDs for the members on the current page
//     const currentDataIds = currentData.map((member) => member.id);

//     // Update selected rows based on select all action
//     setSelectedRows(newSelectAll ? currentDataIds : []);
//   };

//   // Fetch data based on the current page
//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const sessionId = sessionStorage.getItem("sessionId");
//         const response = await axios.get(
//           `http://localhost:7777/members?page=${currentPage}&limit=${itemsPerPage}`
//         );
//         setData(response.data);
//         console.log(response.data, "DATA");
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchMembers();
//   }, [currentPage]);

//   const currentData = data.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   ); // Show items only for the current page

//   const handleSettingsClick = () => {
//     setTempSelectedColumns({ ...selectedColumns });
//     setOpenDialog(true);
//   };

//   const DialogBoxHandleApply = () => {
//     setSelectedColumns({ ...tempSelectedColumns });
//     setOpenDialog(false);
//   };

//   const handleApply = () => {
//     alert(`Selected IDs: ${selectedRows.join(", ")}`);
//   };

//   const handleClose = () => setOpenDialog(false);

//   const deleteHandle = (id) => {
//     const confirm = window.confirm("Would you like to delete This Row?");
//     if (confirm) {
//       const sessionId = sessionStorage.getItem("sessionId");
//       axios
//         .delete(`http://localhost:7777/members/${id}`)
//         .then(() => {
//           setData((prevData) => prevData.filter((member) => member.id !== id));
//         })
//         .catch((error) => console.log(error));
//     }
//   };

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => setAnchorEl(null);

//   const handleEdit = (id) => {
//     navigate(`/edit/member/${id}`);
//     handleMenuClose();
//   };

//   const handleAdd = () => {
//     navigate("/add/member");
//     handleMenuClose();
//   };

//   const handleDelete = (id) => {
//     console.log("Delete member with id:", id);
//     handleMenuClose();
//   };

//   return (
//     <Box pt={4} pb={2}>
//       <Grid container spacing={6}>
//         <Grid item xs={12}>
//           <Card sx={{ height: "100%" }}>
//             <Box
//               mx={2}
//               mt={-3}
//               py={1}
//               px={2}
//               variant="gradient"
//               bgColor="info"
//               borderRadius="lg"
//               coloredShadow="info"
//             >
//               <Typography variant="h5" color="white">
//                 Members Table
//               </Typography>
//             </Box>
//             <Box p={2}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   m: 1,
//                 }}
//               >
//                 <Typography variant="h5" gutterBottom>
//                   Members List
//                 </Typography>
//                 <Button
//                   component={Link}
//                   to="/add/member"
//                   variant="contained"
//                   color="success"
//                   sx={{
//                     mr: 5,
//                     color: "#fff",
//                     bgcolor: "#1976d2",
//                     "&:hover": { bgcolor: "#115293" },
//                   }}
//                 >
//                   Add +
//                 </Button>
//               </Box>

//               <TableContainer>
//                 <Table>
//                   <TableRow
//                     sx={{ bgcolor: "#5c5a59", color: "#fff", width: "100%" }}
//                   >
//                     <TableCell align="center">
//                       <Box display="flex" alignItems="center" gap={1.5}>
//                         <Checkbox
//                           checked={selectAll}
//                           onChange={handleSelectAllChange}
//                         />
//                         <IconButton onClick={handleSettingsClick}>
//                           <SettingsIcon sx={{ color: "#fff" }} />
//                         </IconButton>
//                       </Box>
//                     </TableCell>
//                     {selectedColumns.sNo && (
//                       <TableCell align="center" sx={{ minWidth: 50 }}>
//                         S.No
//                       </TableCell>
//                     )}
//                     {Object.keys(selectedColumns).map((column) =>
//                       selectedColumns[column] &&
//                       column !== "sNo" &&
//                       column !== "status" &&
//                       column !== "action" ? (
//                         <TableCell
//                           key={column}
//                           align="center"
//                           sx={{ minWidth: 100 }}
//                         >
//                           {column.charAt(0).toUpperCase() + column.slice(1)}
//                         </TableCell>
//                       ) : null
//                     )}
//                     {selectedColumns.status && (
//                       <TableCell align="center">Status</TableCell>
//                     )}
//                     {selectedColumns.action && (
//                       <TableCell align="center">Actions</TableCell>
//                     )}
//                   </TableRow>

//                   <TableBody>
//                     {currentData.map((member, index) => (
//                       <TableRow key={member.id}>
//                         <TableCell align="center">
//                           <Box display="flex" alignItems="center" gap={2}>
//                             <Checkbox
//                               checked={selectedRows.includes(member.id)}
//                               onChange={() => {
//                                 setSelectedRows((prev) =>
//                                   prev.includes(member.id)
//                                     ? prev.filter((id) => id !== member.id)
//                                     : [...prev, member.id]
//                                 );
//                               }}
//                             />
//                             <IconButton onClick={handleMenuClick}>
//                               <MenuIcon />
//                             </IconButton>

//                             <Menu
//                               anchorEl={anchorEl}
//                               open={Boolean(anchorEl)}
//                               onClose={handleMenuClose}
//                               anchorOrigin={{
//                                 vertical: "bottom",
//                                 horizontal: "center",
//                               }}
//                               transformOrigin={{
//                                 vertical: "top",
//                                 horizontal: "center",
//                               }}
//                             >
//                               <MenuItem onClick={() => handleAdd()}>
//                                 Add
//                               </MenuItem>
//                               <MenuItem onClick={() => handleEdit(member.id)}>
//                                 Edit
//                               </MenuItem>
//                               <MenuItem onClick={() => handleDelete(member.id)}>
//                                 Delete
//                               </MenuItem>
//                             </Menu>
//                           </Box>
//                         </TableCell>
//                         {selectedColumns.sNo && (
//                           <TableCell align="center" sx={{ minWidth: 50 }}>
//                             {index + 1 + (currentPage - 1) * itemsPerPage}
//                           </TableCell>
//                         )}
//                         {Object.keys(selectedColumns).map((column) =>
//                           selectedColumns[column] &&
//                           column !== "sNo" &&
//                           column !== "status" &&
//                           column !== "action" ? (
//                             <TableCell
//                               key={column}
//                               align="center"
//                               sx={{ minWidth: 100 }}
//                             >
//                               {member[column]}
//                             </TableCell>
//                           ) : null
//                         )}
//                         {selectedColumns.status && (
//                           <TableCell align="center" sx={{ minWidth: 80 }}>
//                             {member.isEnabled ? "Enabled" : "Disabled"}
//                           </TableCell>
//                         )}
//                         {selectedColumns.action && (
//                           <TableCell align="center" sx={{ minWidth: 150 }}>
//                             <Button
//                               sx={{
//                                 color: "#fff",
//                                 mr: 1,
//                                 bgcolor: "#0288d1",
//                                 "&:hover": { bgcolor: "#01579b" },
//                               }}
//                               component={Link}
//                               to={`/edit/member/${member.id}`}
//                             >
//                               Edit
//                             </Button>
//                             <Button
//                               sx={{
//                                 color: "#ffff",
//                                 bgcolor: "#d32f2f",
//                                 "&:hover": { bgcolor: "#9a0007" },
//                               }}
//                               // variant="outlined"
//                               onClick={() => deleteHandle(member.id)}
//                             >
//                               Delete
//                             </Button>
//                           </TableCell>
//                         )}
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPageChange={setCurrentPage}
//                   onChange={(_, page) => setCurrentPage(page)}
//                 />
//               </TableContainer>
//             </Box>
//             {/* Buttons for Apply and Cancel */}
//             {selectedRows.length > 0 && (
//               <Box
//                 sx={{
//                   display: "flex",
//                   p: 2,
//                   gap: 2,
//                   bgcolor: "#ebeae8",
//                   position: "fixed",
//                   bottom: 25,
//                   right: 16,
//                   borderRadius: 2,
//                   width: "81.5%",
//                 }}
//               >
//                 <Button
//                   sx={{
//                     color: "#ffff",
//                     bgcolor: "#0288d1", // Cyan color for Apply
//                     "&:hover": {
//                       bgcolor: "#01579b", // Darker cyan on hover
//                     },
//                   }}
//                   variant="contained"
//                   onClick={handleApply}
//                 >
//                   Apply
//                 </Button>
//                 <Button
//                   sx={{
//                     color: "#ffff",
//                     bgcolor: "#0288d1", // Cyan color for Cancel
//                     "&:hover": {
//                       bgcolor: "#01579b", // Darker cyan on hover
//                     },
//                   }}
//                   variant="contained"
//                   onClick={() => setSelectedRows([])}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             )}
//           </Card>
//         </Grid>
//       </Grid>
//       <DialogBox
//         open={openDialog}
//         onClose={handleClose}
//         selectedColumns={selectedColumns}
//         tempSelectedColumns={tempSelectedColumns}
//         setTempSelectedColumns={setTempSelectedColumns}
//         onApply={DialogBoxHandleApply}
//       />
//     </Box>
//   );
// };

// export default MembersTable;

// Part 2 ______________________________________________________________________________________________________

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Grid,
  Card,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import Pagination from "./members-pagination";
import DialogBox from "./members-dialogue";

const MembersTable = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectAllPages, setSelectAllPages] = useState(false); // Track All Pages selection
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [allMembers, setAllMembers] = useState([]); // This will hold all member data

  const [selectedColumns, setSelectedColumns] = useState({
    id: false,
    sNo: true,
    member: true,
    age: true,
    education: true,
    fatherName: false,
    motherName: false,
    husbandName: false,
    city: true,
    profession: true,
    description: false,
    status: true,
    action: true,
  });
  const [tempSelectedColumns, setTempSelectedColumns] = useState({
    ...selectedColumns,
  });
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    // Get current page IDs
    const currentDataIds = currentData.map((member) => member.id);

    // Update selected rows based on select all action
    setSelectedRows(
      newSelectAll
        ? [...new Set([...selectedRows, ...currentDataIds])]
        : selectedRows.filter((id) => !currentDataIds.includes(id))
    );
  };

  const handleSelectAllPagesChange = () => {
    const newSelectAllPages = !selectAllPages;
    setSelectAllPages(newSelectAllPages);

    // Get all member IDs
    const allDataIds = allMembers.map((member) => member.id);
    setSelectedRows(newSelectAllPages ? allDataIds : []);
  };

  // Fetch data based on the current page
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const sessionId = sessionStorage.getItem("sessionId");
        const response = await axios.get(
          `http://localhost:7777/members?page=${currentPage}&limit=${itemsPerPage}`
        );
        setData(response.data);
        setAllMembers((prevMembers) => [...prevMembers, ...response.data]); // Store all members
        console.log(response.data, "DATA");
      } catch (error) {
        console.error(error);
      }
    };
    fetchMembers();
  }, [currentPage]);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); // Show items only for the current page

  const handleSettingsClick = () => {
    setTempSelectedColumns({ ...selectedColumns });
    setOpenDialog(true);
  };

  const DialogBoxHandleApply = () => {
    setSelectedColumns({ ...tempSelectedColumns });
    setOpenDialog(false);
  };

  const handleApply = () => {
    alert(`Selected IDs: ${selectedRows.join(", ")}`);
  };

  const handleClose = () => setOpenDialog(false);

  const deleteHandle = (id) => {
    const confirm = window.confirm("Would you like to delete This Row?");
    if (confirm) {
      const sessionId = sessionStorage.getItem("sessionId");
      axios
        .delete(`http://localhost:7777/members/${id}`)
        .then(() => {
          setData((prevData) => prevData.filter((member) => member.id !== id));
          setAllMembers((prev) => prev.filter((member) => member.id !== id)); // Update allMembers
        })
        .catch((error) => console.log(error));
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = (id) => {
    navigate(`/edit/member/${id}`);
    handleMenuClose();
  };

  const handleAdd = () => {
    navigate("/add/member");
    handleMenuClose();
  };

  const handleDelete = (id) => {
    console.log("Delete member with id:", id);
    handleMenuClose();
  };
  const showBottomButtons = selectedRows.length > 0;

  return (
    <Box pt={4} pb={2}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ height: "100%" }}>
            <Box
              mx={2}
              mt={-3}
              py={1}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <Typography variant="h5" color="white">
                Members Table
              </Typography>
            </Box>
            <Box p={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  m: 1,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Members List
                </Typography>
                <Button
                  component={Link}
                  to="/add/member"
                  variant="contained"
                  color="success"
                  sx={{
                    mr: 5,
                    color: "#fff",
                    bgcolor: "#1976d2",
                    "&:hover": { bgcolor: "#115293" },
                  }}
                >
                  Add +
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableRow
                    sx={{ bgcolor: "#5c5a59", color: "#fff", width: "100%" }}
                  >
                    <TableCell align="center">
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Checkbox
                          checked={selectAll}
                          onChange={handleSelectAllChange}
                        />
                        <IconButton onClick={handleSettingsClick}>
                          <SettingsIcon sx={{ color: "#fff" }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                    {selectedColumns.sNo && (
                      <TableCell align="center" sx={{ minWidth: 50 }}>
                        S.No
                      </TableCell>
                    )}
                    {Object.keys(selectedColumns).map((column) =>
                      selectedColumns[column] &&
                      column !== "sNo" &&
                      column !== "status" &&
                      column !== "action" ? (
                        <TableCell
                          key={column}
                          align="center"
                          sx={{ minWidth: 100 }}
                        >
                          {column.charAt(0).toUpperCase() + column.slice(1)}
                        </TableCell>
                      ) : null
                    )}
                    {selectedColumns.status && (
                      <TableCell align="center">Status</TableCell>
                    )}
                    {selectedColumns.action && (
                      <TableCell align="center">Actions</TableCell>
                    )}
                  </TableRow>

                  <TableBody>
                    {currentData.map((member, index) => (
                      <TableRow key={member.id}>
                        <TableCell align="center">
                          <Box display="flex" alignItems="center" gap={2}>
                            <Checkbox
                              checked={selectedRows.includes(member.id)}
                              onChange={() => {
                                setSelectedRows((prev) =>
                                  prev.includes(member.id)
                                    ? prev.filter((id) => id !== member.id)
                                    : [...prev, member.id]
                                );
                              }}
                            />
                            <IconButton onClick={handleMenuClick}>
                              <MenuIcon />
                            </IconButton>

                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleMenuClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                              }}
                            >
                              <MenuItem onClick={() => handleAdd()}>
                                Add
                              </MenuItem>
                              <MenuItem onClick={() => handleEdit(member.id)}>
                                Edit
                              </MenuItem>
                              <MenuItem onClick={() => handleDelete(member.id)}>
                                Delete
                              </MenuItem>
                            </Menu>
                          </Box>
                        </TableCell>
                        {selectedColumns.sNo && (
                          <TableCell align="center" sx={{ minWidth: 50 }}>
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </TableCell>
                        )}
                        {Object.keys(selectedColumns).map((column) =>
                          selectedColumns[column] &&
                          column !== "sNo" &&
                          column !== "status" &&
                          column !== "action" ? (
                            <TableCell
                              key={column}
                              align="center"
                              sx={{ minWidth: 100 }}
                            >
                              {member[column]}
                            </TableCell>
                          ) : null
                        )}
                        {selectedColumns.status && (
                          <TableCell align="center" sx={{ minWidth: 80 }}>
                            {member.isEnabled ? "Enabled" : "Disabled"}
                          </TableCell>
                        )}
                        {selectedColumns.action && (
                          <TableCell align="center" sx={{ minWidth: 300 }}>
                            <Button
                              sx={{
                                color: "#fff",
                                mr: 1,
                                bgcolor: "#0288d1",
                                "&:hover": { bgcolor: "#01579b" },
                              }}
                              component={Link}
                              to={`/edit/member/${member.id}`}
                            >
                              Edit
                            </Button>
                            <Button
                              sx={{
                                color: "#ffff",
                                bgcolor: "#d32f2f",
                                "&:hover": { bgcolor: "#9a0007" },
                              }}
                              onClick={() => deleteHandle(member.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  onChange={(_, page) => setCurrentPage(page)}
                />
              </TableContainer>
            </Box>
            {/* Buttons for Apply and Cancel */}
            {/* <Box
              sx={{
                display: "flex",
                p: 1,
                gap: 2,
                bgcolor: "#ebeae8",
                position: "fixed",
                bottom: 25,
                right: 16,
                borderRadius: 2,
                width: "81.5%",
              }}
            >
              <Button
                sx={{
                  color: "#ffff",
                  bgcolor: "#0288d1", // Cyan color for Apply
                  "&:hover": {
                    bgcolor: "#01579b", // Darker cyan on hover
                  },
                }}
                variant="contained"
                onClick={handleApply}
              >
                Apply
              </Button>
              <Box display={"flex"}>
                <Checkbox
                  checked={selectAllPages}
                  onChange={handleSelectAllPagesChange}
                />
                <Typography mt={1.5}>For All</Typography>
              </Box>
              <Button
                sx={{
                  color: "#ffff",
                  bgcolor: "#0288d1", // Cyan color for Cancel
                  "&:hover": {
                    bgcolor: "#01579b", // Darker cyan on hover
                  },
                }}
                variant="contained"
                onClick={() => setSelectedRows([])}
              >
                Cancel
              </Button>
            </Box> */}
            {showBottomButtons && ( // Conditional rendering
              <Box
                sx={{
                  display: "flex",
                  p: 1,
                  gap: 2,
                  bgcolor: "#ebeae8",
                  position: "fixed",
                  bottom: 25,
                  right: 16,
                  borderRadius: 2,
                  width: "81.5%",
                }}
              >
                <Button
                  sx={{
                    color: "#ffff",
                    bgcolor: "#0288d1",
                    "&:hover": {
                      bgcolor: "#01579b",
                    },
                  }}
                  variant="contained"
                  onClick={handleApply}
                >
                  Apply
                </Button>
                <Box display={"flex"}>
                  <Checkbox
                    checked={selectAllPages}
                    onChange={handleSelectAllPagesChange}
                  />
                  <Typography mt={1.5}>For All</Typography>
                </Box>
                <Button
                  sx={{
                    color: "#ffff",
                    bgcolor: "#0288d1",
                    "&:hover": {
                      bgcolor: "#01579b",
                    },
                  }}
                  variant="contained"
                  onClick={() => setSelectedRows([])}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
      <DialogBox
        open={openDialog}
        onClose={handleClose}
        selectedColumns={selectedColumns}
        tempSelectedColumns={tempSelectedColumns}
        setTempSelectedColumns={setTempSelectedColumns}
        onApply={DialogBoxHandleApply}
      />
    </Box>
  );
};

export default MembersTable;
