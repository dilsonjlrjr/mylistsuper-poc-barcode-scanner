import React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';

const useMyStyles = makeStyles({
  grid: {
    height: '100vh',
  },
});

const App: React.FC = () => {
  const classes = useMyStyles();

  return (
    <Grid
      className={classes.grid}
      container
      direction="row"
      justify="center"
      alignContent="center"
    >
      <Button variant="contained" color="primary">
        Iniciar leitor
      </Button>
    </Grid>
  );
};

export default App;
