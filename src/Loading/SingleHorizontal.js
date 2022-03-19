import React, { Component, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { CardContent, Card, Typography } from '@material-ui/core'

class SingleHorizontal extends Component {
render() {
    return (   
        <Card style={{ maxWidth: '1360px', width: '100%' }}>
        <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          <Skeleton variant="text" width={200} />
        </Typography>
        <Typography variant="body" component="div" gutterBottom>
        <Skeleton variant="text" width={700} />
        <Skeleton variant="text" width={500} />
        <Skeleton variant="text" width={300} />
        </Typography>
          
          <Typography variant="body2" color="text.secondary">
  
          </Typography>
  
        </CardContent>
        </Card>
          )
    }
}
export default SingleHorizontal;