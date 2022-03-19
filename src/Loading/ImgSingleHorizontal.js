import React, { Component, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import {  CardContent, Card, Typography } from '@material-ui/core'

class ImgSingleHorizontal extends Component {
render() {
    return (   
        <Card style={{  height: 200, marginBottom: 20 }}>
        <div style={{ display: 'flex' }}>
        <CardContent>
        <Skeleton variant="rectangular" height={170} width={220} />

        </CardContent>

        <CardContent>
          
          <Typography variant="h4" component="div" gutterBottom>
            <Skeleton variant="text" width={300} />
          </Typography>

          <Skeleton variant="text" width={700} />
          <Skeleton variant="text" width={500} />
          <Skeleton variant="text" width={500} />
        </CardContent>
        </div>
        </Card>
          )
    }
}
export default ImgSingleHorizontal;