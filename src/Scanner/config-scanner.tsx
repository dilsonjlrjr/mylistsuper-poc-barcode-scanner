import { QuaggaJSConfigObject } from '@ericblade/quagga2';

const configScanner: QuaggaJSConfigObject = {
  inputStream: {
    name: 'Live',
    type: 'LiveStream',
    target: document.querySelector('#barcodeContainer') || undefined,
    constraints: {
      facingMode: 'environment',
      aspectRatio: { min: 1, max: 2 },
    },
  },
  locator: {
    patchSize: 'medium',
    halfSample: true,
  },
  numOfWorkers: 2,
  frequency: 10,
  decoder: {
    readers: ['ean_reader'],
  },
  locate: true,
};

export default configScanner;
