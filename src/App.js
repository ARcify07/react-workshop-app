import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Steps from './Steps';

class App_test_with_test extends Component {
  render() {
    const {data = {}} = this.props;
    const {title = "", steps = []} = data;
    console.log(data);
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Steps data={steps} />
      </div>
      );
  }
}

export default App_test_with_test;
