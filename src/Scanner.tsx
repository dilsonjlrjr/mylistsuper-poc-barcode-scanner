import React, { useEffect, useState } from 'react';
import Quagga, { QuaggaJSResultObject } from '@ericblade/quagga2';
import { makeStyles } from '@material-ui/core';

const useMyStyles = makeStyles({
  root: {
    '& video': {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      minWidth: '100%',
      minHeight: '100%',
    },
    '& canvas': {
      display: 'none',
    },
  },
});

type ScannerProps = {
  startdetected: boolean;
  onWrapperCode(code: string | null): void;
};

const Scanner: React.FC<ScannerProps> = (props: ScannerProps) => {
  const { startdetected, onWrapperCode } = props;

  const onDetected = (result: QuaggaJSResultObject): void => {
    Quagga.offDetected(onDetected);
    onWrapperCode(result.codeResult.code);
  };

  useEffect(() => {
    if (startdetected) {
      console.info('reiniciando a leitura', startdetected);
      Quagga.onDetected(onDetected);
    }
  }, [startdetected]);

  const classes = useMyStyles();

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#barcodeContainer') || undefined,
          constraints: {
            facingMode: 'enviroment',
          },
        },
        numOfWorkers: 1,
        locate: true,
        decoder: {
          readers: ['ean_reader'],
        },
      },
      error => {
        if (error) {
          return;
        }

        Quagga.start();
      },
    );

    Quagga.onDetected(onDetected);
  }, []);

  return <div className={classes.root} id="barcodeContainer" />;
};

export default Scanner;
