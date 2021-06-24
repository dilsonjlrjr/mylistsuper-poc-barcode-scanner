import React from "react";
import {
  Page,
  SpeedDial,
  Fab,
  Icon,
  SpeedDialItem,
  Navigator,
} from "react-onsenui";
import Scanner from "../components/Scanner";

type ScannerProps = {
  navigator: Navigator | undefined;
};

const ScannerPage: React.FC<ScannerProps> = (props: ScannerProps) => {
  const { navigator } = props;

  const onWrapperCode = (code: string) => {
    alert(code);
  };

  const renderFixed = () => {
    return (
      <SpeedDial position="bottom right">
        <Fab>
          <Icon icon="md-settings" />
        </Fab>
        <SpeedDialItem onClick={() => navigator?.popPage()}>
          <Icon icon="md-long-arrow-return" />
        </SpeedDialItem>
      </SpeedDial>
    );
  };

  return (
    <Page renderFixed={renderFixed}>
      <Scanner startdetected={true} onWrapperCode={onWrapperCode} />
    </Page>
  );
};

export default ScannerPage;
