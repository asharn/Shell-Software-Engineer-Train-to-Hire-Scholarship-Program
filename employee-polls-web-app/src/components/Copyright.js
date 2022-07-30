import { Link, Typography } from '@mui/material';
import * as React from 'react';
import { COMPANY_NAME } from '../utils/GenericConstants';

function Copyright(props) {
    return (
      <Typography variant="body1" color="white" align="center" {...props}>
        Copyright © 
        <Link color="inherit" href="/" >
        &nbsp;{COMPANY_NAME} 
        </Link>&nbsp;&nbsp;
        {new Date().getFullYear()}
        .
      </Typography>
    );
  }

  export default Copyright;