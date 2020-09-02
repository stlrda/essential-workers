import React from 'react';
import { MDBDataTable } from 'mdbreact';

import './ScrollingTable.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const ScrollingTable = (props) => {
  const { rows } = props;

  return (
    <section id="thing">
      <MDBDataTable
        id="thing2"
        autoWidth={true}
        paging={false}
        searching={false}
        data={rows}
        hover
        small
        striped
        responsive
        bordered
      />
    </section>

  );
}

export default ScrollingTable;