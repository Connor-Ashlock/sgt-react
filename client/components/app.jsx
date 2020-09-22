import React from 'react';
import Header from './header';
import GradeTable from './grade-table';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [] };
    this.getAverageGrade = this.getAverageGrade.bind(this);
    this.postGrade = this.postGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
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

  postGrade(newGrade) {
    fetch('/api/grades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGrade)
    })
      .then(res => res.json())
      .then(student => {
        const updatedGrades = this.state.grades.concat(student);
        this.setState({ grades: updatedGrades });
      })
      .catch(err => console.error(err));
  }

  deleteGrade(studentId) {
    let index = null;
    for (let i = 0; i < this.state.grades.length; i++) {
      if (this.state.grades[i].id === studentId) {
        index = i;
      }
    }
    fetch(`/api/grades/${studentId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        const updatedGrades = this.state.grades.slice();
        updatedGrades.splice(index, 1);
        this.setState({ grades: updatedGrades });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getAllGrades();
  }

  render() {
    return (
      <>
        <Header average={this.getAverageGrade()}/>
        <div className="row mt-4">
          <GradeTable onDelete={this.deleteGrade} grades={this.state.grades}/>
          <GradeForm onSubmit={this.postGrade}/>
        </div>
      </>
    );
  }
}

export default App;
