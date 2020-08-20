import React from 'react';

// Styles
import './Table.css';

// Material UI
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






function CollapsibleRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const symbol = row.title === "Totals" ? "" : "%";

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
                  <TableCell>Grocery, Convenience, & Drug Stores</TableCell>
                  <TableCell>Public Transit</TableCell>
                  <TableCell>Trucking, Warehouse, & Postal Service</TableCell>
                  <TableCell>Health Care</TableCell>
                  <TableCell>Childcare & Social Services</TableCell>
                  <TableCell>Building Cleaning Services</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row["rows"].map(row =>
                  <TableRow>
                  <TableCell>{row["index"]}</TableCell>
                  <TableCell>{row["All Workers"] + symbol}</TableCell>
                  <TableCell>{row["All Frontline Industries"] + symbol}</TableCell>
                  <TableCell>{row["Grocery, Convenience, & Drug Stores"] + symbol}</TableCell>
                  <TableCell>{row["Public Transit"] + symbol}</TableCell>
                  <TableCell>{row["Trucking, Warehouse, & Postal Service"] + symbol}</TableCell>
                  <TableCell>{row["Health Care"]+ symbol}</TableCell>
                  <TableCell>{row["Childcare & Social Services"] + symbol}</TableCell>
                  <TableCell>{row["Building Cleaning Services"] + symbol}</TableCell>
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


function CollapsibleTable(props) {
  const { rows } = props;

  return (
    <TableContainer component={Paper}  id="ctable">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell id="table-header">Demographics</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map((row) => <CollapsibleRow key={row.title} row={row} />) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default CollapsibleTable;