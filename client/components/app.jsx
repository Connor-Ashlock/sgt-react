import React from 'react';
import Header from './header';
import GradeTable from './grade-table';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <GradeTable />
      </>
    );
  }
}

export default App;
