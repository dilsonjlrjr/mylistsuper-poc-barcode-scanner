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
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 320,
            facingMode: 'environment',
          },
          //   area: { // defines rectangle of the detection/localization area
          //     top: "10%",    // top offset
          //     right: "10%",  // right offset
          //     left: "10%",   // left offset
          //     bottom: "10%"  // bottom offset
          //   },
        },
        locator: {
          halfSample: true,
          patchSize: 'large', // x-small, small, medium, large, x-large
          debug: {
            showCanvas: true,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: true,
              showTransformedBox: true,
              showBB: true,
            },
          },
        },
        numOfWorkers: 4,
        decoder: {
          readers: ['ean_reader'],
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true,
          },
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

    // Quagga.onProcessed(result => {
    //   const drawingCtx = Quagga.canvas.ctx.overlay;
    //   const drawingCanvas = Quagga.canvas.dom.overlay;

    //   if (result) {
    //     if (result.boxes) {
    //       drawingCtx.clearRect(
    //         0,
    //         0,
    //         Number(drawingCanvas.getAttribute('width')),
    //         Number(drawingCanvas.getAttribute('height')),
    //       );
    //       result.boxes
    //         .filter(box => {
    //           return box !== result.box;
    //         })
    //         .forEach(box => {
    //           Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
    //             color: 'green',
    //             lineWidth: 2,
    //           });
    //         });
    //     }

    //     if (result.box) {
    //       Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
    //         color: '#00F',
    //         lineWidth: 2,
    //       });
    //     }

    //     if (result.codeResult && result.codeResult.code) {
    //       Quagga.ImageDebug.drawPath(
    //         result.line,
    //         { x: 'x', y: 'y' },
    //         drawingCtx,
    //         { color: 'red', lineWidth: 3 },
    //       );
    //     }
    //   }
    // });

    Quagga.onDetected(onDetected);
  }, []);

  return <div className={classes.root} id="barcodeContainer" />;
};

export default Scanner;
