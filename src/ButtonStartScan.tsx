import React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';

const useMyStyles = makeStyles({
  grid: {
    height: '100vh',
  },
});

type ButtonStartScanProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const ButtonStartScan: React.FC<ButtonStartScanProps> = (
  props: ButtonStartScanProps,
) => {
  const classes = useMyStyles();
  const { onClick } = props;

  return (
    <Grid
      className={classes.grid}
      container
      direction="row"
      justify="center"
      alignContent="center"
    >
      <Button variant="contained" color="primary" onClick={onClick}>
        Iniciar leitor
      </Button>
    </Grid>
  );
};

ButtonStartScan.defaultProps = {
  onClick: undefined,
};

export default ButtonStartScan;
