import { Button } from "semantic-ui-react";

import "./App.scss";
import { Navigation } from "./routes";
import { ClientLayout } from "./layouts";

const App = () => {
  return (
    <ClientLayout className="app">
      <h1 className="app__title">Hola Mundo!</h1>
      <Button primary>Click Me</Button>
      <Navigation />
    </ClientLayout>
  );
};

export default App;
