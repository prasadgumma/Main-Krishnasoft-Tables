// Dynamic Code
import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  Typography,
  Grid,
  Box,
} from "@mui/material";

const DialogBox = ({
  open,
  onClose,
  selectedColumns = {}, // Default to an empty object
  tempSelectedColumns = {}, // Default to an empty object
  setTempSelectedColumns,
  onApply,
}) => {
  const handleColumnChange = (column) => {
    setTempSelectedColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Columns</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {Object.keys(selectedColumns).map((column) => (
            <Grid item xs={4} key={column}>
              <Box display="flex">
                <Checkbox
                  checked={tempSelectedColumns[column]}
                  onChange={() => handleColumnChange(column)}
                />
                {/* <Typography>{column.replace(/([A-Z])/g, " $1")}</Typography> */}
                <Typography>
                  {column
                    .replace(/([A-Z])/g, " $1") // Add space before capital letters
                    .charAt(0)
                    .toUpperCase() + column.slice(1).toLowerCase()}{" "}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{
            color: "#ffff",
            mr: 1,
            bgcolor: "#0288d1", // Cyan color for Edit
            "&:hover": {
              color: "#ffff",
              bgcolor: "#01579b", // Darker cyan on hover
            },
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          sx={{
            color: "#ffff",
            mr: 1,
            bgcolor: "#0288d1", // Cyan color for Edit
            "&:hover": {
              color: "#ffff",
              bgcolor: "#01579b", // Darker cyan on hover
            },
          }}
          onClick={onApply}
          color="primary"
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Prop validation
DialogBox.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedColumns: PropTypes.object,
  tempSelectedColumns: PropTypes.object,
  setTempSelectedColumns: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
};

export default DialogBox;

// Static Code...
//---------------------------------------
// import React from "react";
// import PropTypes from "prop-types";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Checkbox,
//   Typography,
//   Grid,
//   Box,
// } from "@mui/material";

// const headerNames = [
//   { key: "id", label: "ID" },
//   { key: "sNo", label: "S.No" },
//   { key: "member", label: "Member" },
//   { key: "age", label: "Age" },
//   { key: "education", label: "Education" },
//   { key: "fatherName", label: "Father Name" },
//   { key: "motherName", label: "Mother Name" },
//   { key: "husbandName", label: "Husband Name" },
//   { key: "city", label: "City" },
//   { key: "profession", label: "Profession" },
//   { key: "description", label: "Description" },
//   { key: "action", label: "Action" },
// ];

// const DialogBox = ({
//   open,
//   onClose,
//   tempSelectedColumns = {},
//   setTempSelectedColumns,
//   onApply,
// }) => {
//   const handleColumnChange = (key) => {
//     setTempSelectedColumns((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Select Columns</DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2}>
//           {headerNames.map(({ key, label }) => (
//             <Grid item xs={6} key={key}>
//               <Box display="flex" alignItems="center">
//                 <Checkbox
//                   checked={tempSelectedColumns[key] || false}
//                   onChange={() => handleColumnChange(key)}
//                 />
//                 <Typography>{label}</Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           sx={{
//             color: "#ffff",
//             mr: 1,
//             bgcolor: "#0288d1", // Cyan color for Edit
//             "&:hover": {
//               color: "#ffff",
//               bgcolor: "#01579b", // Darker cyan on hover
//             },
//           }}
//           onClick={onClose}
//         >
//           Cancel
//         </Button>
//         <Button
//           sx={{
//             color: "#ffff",
//             mr: 1,
//             bgcolor: "#0288d1", // Cyan color for Edit
//             "&:hover": {
//               color: "#ffff",
//               bgcolor: "#01579b", // Darker cyan on hover
//             },
//           }}
//           onClick={onApply}
//           color="primary"
//         >
//           Apply
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // Prop validation
// DialogBox.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   selectedColumns: PropTypes.object,
//   tempSelectedColumns: PropTypes.object,
//   setTempSelectedColumns: PropTypes.func.isRequired,
//   onApply: PropTypes.func.isRequired,
// };

// export default DialogBox;
