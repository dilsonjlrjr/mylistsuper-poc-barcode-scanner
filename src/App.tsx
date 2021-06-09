import React, { useState } from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import Scanner from './Scanner';

const useMyStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 21,
  },
});

const App: React.FC = () => {
  const [startDetected, setStartDetected] = useState(false);

  const classes = useMyStyles();

  const onWrapperCode = (code: string) => {
    alert(code);
  };

  const onClickButtonReiniciarLeitura = () => {
    setStartDetected(true);
  };

  return (
    <Grid
      container
      lg={12}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} spacing={0}>
        <Scanner startdetected={startDetected} onWrapperCode={onWrapperCode} />
      </Grid>
      <Grid item xs={12} spacing={0} className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClickButtonReiniciarLeitura}
        >
          Reiniciar a leitura
        </Button>
      </Grid>
    </Grid>
  );
};

export default App;
