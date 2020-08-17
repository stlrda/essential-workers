import React from 'react';

import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import './Table.css';

const data = require('../data/test.json');
const rows = [
  {title: "General", 
rows: [data[2], data[12], data[19], data[20], data[21]]},
{title: "Full/Part-time", 
rows: [data[4], data[5]]},
{title: "Race/Ethnicity", 
rows: [data[7], data[8], data[9], data[10], data[11],]},
{title: "Education Level", 
rows: [data[14], data[15], data[16], data[17], data[18],]},
{title: "Compensation and Benefits", 
rows: [data[23], data[24], data[25]]},
{title: "Family Responsibilities", 
rows: [data[27], data[28]]},
];


function CollapsibleRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow>
      <TableCell component="th" scope="row">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {" " + row.title}
        </TableCell>
      </TableRow>
      <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  <TableCell />
                  <TableCell>All Workers</TableCell>
                  <TableCell>All Frontline Industries</TableCell>
                  <TableCell>Grocery, Convenience, and Drug Stores</TableCell>
                  <TableCell>Public Transit</TableCell>
                  <TableCell>Trucking, Warehouse, and Postal Service</TableCell>
                  <TableCell>Health Care</TableCell>
                  <TableCell>Child Care and Social Services</TableCell>
                  <TableCell>Building Cleaning Services</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row["rows"].map(row =>
                  <TableRow>
                  <TableCell>{row["Demographics"]}</TableCell>
                  <TableCell>{row["All Workers"]}</TableCell>
                  <TableCell>{row["All Frontline Industries"]}</TableCell>
                  <TableCell>{row["Grocery, Convenience, and Drug Stores"]}</TableCell>
                  <TableCell>{row["Public Transit"]}</TableCell>
                  <TableCell>{row["Trucking, Warehouse, and Postal Service"]}</TableCell>
                  <TableCell>{row["Health Care"]}</TableCell>
                  <TableCell>{row["Child Care and Social Services"]}</TableCell>
                  <TableCell>{row["Building Cleaning Services"]}</TableCell>
                  </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}


function CollapsibleTable() {
  return (
    <TableContainer component={Paper}  id="ctable">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell id="table-header">Demographics</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <CollapsibleRow key={row.title} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default CollapsibleTable;