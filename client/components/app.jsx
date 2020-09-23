import React from 'react';
import Header from './header';
import GradeTable from './grade-table';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getAverageGrade = this.getAverageGrade.bind(this);
    this.postGrade = this.postGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.getGradeById = this.getGradeById.bind(this);
    this.updateGrade = this.updateGrade.bind(this);
    this.resetSelectedStudent = this.resetSelectedStudent.bind(this);
    this.state = {
      grades: [],
      selectedStudent: null
    };
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

  getGradeById(studentId) {
    fetch(`/api/grades/${studentId}`, {
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(studentId)
    })
      .then(res => res.json())
      .then(editStudent => {
        this.setState({ selectedStudent: editStudent });
      })
      .catch(err => console.error(err));
  }

  updateGrade(newGrade) {
    let index = null;
    for (let i = 0; i < this.state.grades.length; i++) {
      if (this.state.grades[i].id === newGrade.id) {
        index = i;
      }
    }
    fetch(`/api/grades/${newGrade.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGrade)
    })
      .then(res => res.json())
      .then(newStudent => {
        const updatedGrades = this.state.grades.slice();
        updatedGrades[index] = newStudent;
        this.setState({
          grades: updatedGrades,
          selectedStudent: null
        });
      })
      .catch(err => console.error(err));
  }

  resetSelectedStudent() {
    this.setState({ selectedStudent: null });
  }

  componentDidMount() {
    this.getAllGrades();
  }

  render() {
    return (
      <>
        <Header average={this.getAverageGrade()}/>
        <div className="row mt-4">
          <GradeTable getGradeById={this.getGradeById} onDelete={this.deleteGrade} grades={this.state.grades}/>
          <GradeForm onSubmit={!this.state.selectedStudent ? this.postGrade : this.updateGrade} resetSelectedStudent={this.resetSelectedStudent} editStudent={this.state.selectedStudent}/>
        </div>
      </>
    );
  }
}

export default App;
