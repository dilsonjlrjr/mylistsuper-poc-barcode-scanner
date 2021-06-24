import React from "react";
import { Page, Toolbar, Fab, Icon, Navigator } from "react-onsenui";
import ScannerPage from "./ScannerPage";

type MainProps = {
  title: string;
  navigator: Navigator | undefined;
};

const MainPage: React.FC<MainProps> = (props: MainProps) => {
  const { title, navigator } = props;

  const renderBar = () => {
    return (
      <Toolbar>
        <div className="left"></div>
        <div className="center">{title}</div>
        <div className="right"></div>
      </Toolbar>
    );
  };

  const renderFab = () => {
    return (
      <Fab
        position="bottom right"
        onClick={() => navigator?.pushPage({ component: ScannerPage })}
      >
        <Icon icon="md-camera-alt" />
      </Fab>
    );
  };

  return <Page renderToolbar={renderBar} renderFixed={renderFab}></Page>;
};

export default MainPage;
