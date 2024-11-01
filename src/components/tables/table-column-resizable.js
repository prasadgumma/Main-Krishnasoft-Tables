// // ResizableTableCell.js

// import React, { useState } from "react";
// import { TableCell } from "@mui/material";

// const ResizableTableCell = ({ children, onResize, width }) => {
//   const [isResizing, setIsResizing] = useState(false);

//   const handleMouseDown = (e) => {
//     setIsResizing(true);
//     const startX = e.clientX;
//     const startWidth = width;

//     const handleMouseMove = (moveEvent) => {
//       if (isResizing) {
//         const newWidth = Math.max(50, startWidth + moveEvent.clientX - startX);
//         onResize(newWidth);
//       }
//     };

//     const handleMouseUp = () => {
//       setIsResizing(false);
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   return (
//     <TableCell sx={{ position: "relative", width }} align="center">
//       {children}
//       <div
//         onMouseDown={handleMouseDown}
//         style={{
//           position: "absolute",
//           right: 0,
//           top: 0,
//           height: "100%",
//           width: "5px",
//           cursor: "col-resize",
//           zIndex: 1,
//         }}
//       />
//     </TableCell>
//   );
// };

// export default ResizableTableCell;

// ResizableTableCell.js
// import React, { useState } from "react";
// import { TableCell } from "@mui/material";

// const ResizableTableCell = ({ children, onResize, width }) => {
//   const [isResizing, setIsResizing] = useState(false);

//   const handleMouseDown = (e) => {
//     setIsResizing(true);
//     const startX = e.clientX;
//     const startWidth = width;

//     const handleMouseMove = (moveEvent) => {
//       if (isResizing) {
//         const newWidth = Math.max(50, startWidth + moveEvent.clientX - startX);
//         onResize(newWidth); // Ensure onResize is called
//       }
//     };

//     const handleMouseUp = () => {
//       setIsResizing(false);
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   return (
//     <TableCell sx={{ position: "relative", width }} align="center">
//       {children}
//       <div
//         onMouseDown={handleMouseDown}
//         style={{
//           position: "absolute",
//           right: 0,
//           top: 0,
//           height: "100%",
//           width: "5px",
//           cursor: "col-resize",
//           zIndex: 1,
//         }}
//       />
//     </TableCell>
//   );
// };

// export default ResizableTableCell;

import React, { useState } from "react";
import { TableCell } from "@mui/material";

const ResizableTableCell = ({ width, onResize, children, ...props }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(width);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(width);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = Math.max(startWidth + e.clientX - startX, 50); // Minimum width
      onResize(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <TableCell {...props} style={{ width, position: "relative" }}>
      {children}
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "5px",
          cursor: "ew-resize",
          zIndex: 1,
        }}
      />
    </TableCell>
  );
};

export default ResizableTableCell;
