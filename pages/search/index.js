import React from 'react';
import { connect } from "react-redux";

import Grid from '@material-ui/core/Grid';

import DefaultLayout from '../../layouts/index';
import Collapsible from '../../components/Collapsible'

const HomePage = () => {
  return (
    <DefaultLayout>
       <Grid container spacing={2}>
        <Grid item xs={2}>
          <div>
            <Collapsible 
              heading={"States"}
              list={[{id: 1, name: "MP"}, {id: 2, name: "HP"}, {id: 3, name: "AP"}]}
              setFunc={"addState"}
              type="states"
            />
          </div>
          <div>
            <Collapsible 
              heading={"Party"}
              list={[{id: 1, name: "BJP"}, {id: 2, name: "INC"}, {id: 3, name: "SP"}, {id: 4, name: "BSP"}]}
              setFunc={"addParty"}
              type="parties"
            />
          </div>
        </Grid>
        <Grid item xs={10}>
        </Grid>
       </Grid>
    </DefaultLayout>
  );
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps)(HomePage);