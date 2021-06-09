import React, { useState } from 'react';
import ButtonStartScan from './ButtonStartScan';

const ContainerScanner: React.FC = () => {
  const [showScan, setShowScan] = useState(false);

  const clickShowScan = () => {
    setShowScan(true);
  };

  return showScan ? (
    <h1>uiuiui</h1>
  ) : (
    <ButtonStartScan onClick={clickShowScan} />
  );
};

export default ContainerScanner;
