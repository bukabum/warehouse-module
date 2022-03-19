import React, { Component, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { DialogContent, TableRow, TableCell, Table, CardActions, CardContent, Card, Typography, Paper, Button, Grid } from '@material-ui/core'

class NormalCardLoading extends Component {
render() {
    return (   
        <Card style={{ width: 200, height: 350, marginLeft: 15, marginBottom: 20}}>
          <Skeleton variant="rectangular" height={150} />
        <CardContent>
          <Skeleton variant="text" width={165} />
          <Skeleton variant="text" width={165} />
          <Skeleton variant="text" width={165} />
          <Skeleton variant="text" width={165} />
        </CardContent>
        </Card>
        )
    }
}
export default NormalCardLoading;