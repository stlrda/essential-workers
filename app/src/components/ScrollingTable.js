import React from 'react';
import { MDBDataTable } from 'mdbreact';

import './ScrollingTable.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const ScrollingTable = (props) => {
  const { tableData } = props;

  return (
    <section id="scrolling-table-section">
      <MDBDataTable
        id="scrolling-table"
        paging={false}
        searching={false}
        sortable={false}
        data={tableData}
        hover
        small
        striped
        responsive
      />
    </section>

  );
}

export default ScrollingTable;