import React from "react";
import { Navigator } from "react-onsenui";
import MainPage from "./pages/MainPage";

const App: React.FC = () => {
  const renderPageApp = (route: any, navigator: Navigator | undefined) => {
    route.props = route.props || {};
    route.props.navigator = navigator;

    return React.createElement(route.component, route.props);
  };

  return (
    <Navigator
      initialRoute={{
        component: MainPage,
        props: { title: "Minha tela fofa" },
      }}
      renderPage={renderPageApp}
    />
  );
};

export default App;
