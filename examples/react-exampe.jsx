import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

import themeDSM from './output/theme.dsm';

// You could add additional values to themeDSM by
// extending the object

const theme = {
  ...themeDSM,
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>Example</div>
      </ThemeProvider>
    );
  }
}

export default App;
