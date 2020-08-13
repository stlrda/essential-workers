import React from 'react';
import DataTable from 'react-data-table-component';

import './Table.css';

const data = require("../data/test.json");

console.log(data);

const columns = [{name: "Demographics", selector: '', sortable: true}
, {name: "All Workers", selector: '', sortable: true}
, {name: "All Frontline Industries", selector: '', sortable: true}
,{name: "Grocery, Convenience, and Drug Stores", selector: '', sortable: true}
, {name: "Public Transit", selector: '', sortable: true}
, {name: "Trucking, Warehouse, and Postal Service", selector: '', sortable: true}
, {name: "Building Cleaning Services", selector: '', sortable: true}
, {name: "Health Care", selector: '', sortable: true}
, {name: "Child Care and Social Services", selector: '', sortable: true}];

class Table extends React.Component {
    render() {
      return (
        <section id="table-section">
          <DataTable className="rdt_Table"
            columns={columns}
            data={data}
          />
        </section>
      )
    }
};

export default Table;