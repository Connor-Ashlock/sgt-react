import React from 'react';
import Header from './header';
import GradeTable from './grade-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [] };
    this.getAverageGrade = this.getAverageGrade.bind(this);
  }

  getAllGrades() {
    fetch('/api/grades')
      .then(res => res.json())
      .then(grades => this.setState({ grades: grades }))
      .catch(err => console.error(err));
  }

  getAverageGrade() {
    let average = 0;
    for (let i = 0; i < this.state.grades.length; i++) {
      average += this.state.grades[i].grade;
      if (i + 1 === this.state.grades.length) {
        return Math.ceil(average / this.state.grades.length);
      }
    }
  }

  componentDidMount() {
    this.getAllGrades();
  }

  render() {
    return (
      <>
        <Header average={this.getAverageGrade()}/>
        <GradeTable grades={this.state.grades}/>
      </>
    );
  }
}

export default App;
