import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
import { TimerProvider } from "./components/Context/TimersContext";
import { MenuProvider } from "./components/Context/MenuContext";
import { CountdownProvider } from "./components/Context/CountdownContext";
import Add from "./views/Add";
import { QueueProvider } from "./components/Context/QueueContext";
import Home from "./views/Home";
const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

function App() {
  return (
    <Container>
      <TimerProvider>
        <MenuProvider>
          <CountdownProvider>
            <QueueProvider>
              <Router>
                <nav>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/docs">Documentation</Link>
                    </li>
                  </ul>
                </nav>
                <Switch>
                  <Route path="/add">
                    <Add />
                  </Route>
                  <Route path="/docs">
                    <DocumentationView />
                  </Route>
                  <Route path="/">
                    <Home></Home>
                  </Route>
                </Switch>
              </Router>
            </QueueProvider>
          </CountdownProvider>
        </MenuProvider>
      </TimerProvider>
    </Container>
  );
}

export default App;
