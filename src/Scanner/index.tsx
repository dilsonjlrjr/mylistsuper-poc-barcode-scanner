import React, { useEffect } from 'react';
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
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      minWidth: '100%',
      minHeight: '100%',
    },
  },
});

type ScannerProps = {
  startdetected: boolean;
  onWrapperCode(code: string | null): void;
};

type ResultCount = {
  [value: string]: number;
};

const Scanner: React.FC<ScannerProps> = (props: ScannerProps) => {
  const resultDetected: string[] = [];
  const limitDetected = 2;

  const { onWrapperCode } = props;
  let { startdetected } = props;

  const getCodeResult = (arrayDetected: Array<string>): string => {
    const distinctValue = (value: string, index: number, self: string[]) => {
      return self.indexOf(value) === index;
    };

    const distinctArrayResult = arrayDetected.filter(distinctValue);

    const arrayCount: ResultCount = {};
    distinctArrayResult.forEach((value: string) => {
      resultDetected.forEach((valueDetected: string) => {
        if (value === valueDetected) {
          if (Number.isNaN(arrayCount[value])) {
            arrayCount[value] = 1;
          } else {
            arrayCount[value] += 1;
          }
        }
      });
    });

    let lastNumber = 0;
    let keyValue = '';

    Object.entries(arrayCount).forEach(value => {
      const [resultStringCode, qunt] = value;

      if (qunt > lastNumber) {
        lastNumber = qunt;
        keyValue = resultStringCode;
      }
    });

    return keyValue;
  };

  const onDetected = (result: QuaggaJSResultObject): void => {
    if (resultDetected && resultDetected.length === limitDetected) {
      Quagga.offDetected(onDetected);
      startdetected = false;
      onWrapperCode(getCodeResult(resultDetected));
    } else {
      resultDetected.push(result.codeResult.code || '');
    }
  };

  useEffect(() => {
    console.info('mudou estado');
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
          target: '#barcodeContainer',
          type: 'VideoStream',
          constraints: {
            width: 800,
            height: 600,
            facingMode: 'environment',
          },
          area: {
            top: '0%',
            right: '0%',
            left: '0%',
            bottom: '0%',
          },
        },
        locator: {
          halfSample: true,
          patchSize: 'medium',
        },
        numOfWorkers: 4,
        frequency: 13,
        decoder: {
          readers: ['ean_reader'],
        },
        locate: true,
      },
      error => {
        if (error) {
          console.log(error, 'error msg');
        }
        Quagga.start();
      },
    );

    Quagga.onProcessed(result => {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute('width')),
            Number(drawingCanvas.getAttribute('height')),
          );
          result.boxes
            .filter(box => {
              return box !== result.box;
            })
            .forEach(box => {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: 'blue',
                lineWidth: 3,
              });
            });
        }
      }
    });

    Quagga.onDetected(onDetected);
  }, []);

  return <div className={classes.root} id="barcodeContainer" />;
};

export default Scanner;
