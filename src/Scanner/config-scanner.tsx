import { QuaggaJSConfigObject } from '@ericblade/quagga2';

const configScanner: QuaggaJSConfigObject = {
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
};

export default configScanner;
