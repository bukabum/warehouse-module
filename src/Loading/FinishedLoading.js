import React, { Component, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { DialogContent, TableRow, TableCell, Table, CardActions, CardContent, Card, Typography, Paper, Button, Grid } from '@material-ui/core'

class FinishedLoading extends Component {
render() {
    return (   
            <div style={{ maxWidth: 1200, width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
        {Array.apply(null, { length: 5 }).map(() => (
          <>
          <div style={{ maxWidth: 1200, width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                  <Skeleton variant="text" width={200} />
              </Typography>
              <Typography variant="body" component="div" gutterBottom>
                <Skeleton variant="text" width={700} />
                <Skeleton variant="text" width={500} />
              </Typography>
                  <Typography variant="h4" component="div" gutterBottom>
                      <Skeleton variant="text" width={200} />
                  </Typography>
                  <Typography variant="body" component="div" gutterBottom>
                    <Skeleton variant="text" width={700} />
                    <Skeleton variant="text" width={500} />
                  </Typography>
              </CardContent>
            </Card>        
          </div>
          <br/>
          </>
        ))}
        </div>
        )
    }
}
export default FinishedLoading;