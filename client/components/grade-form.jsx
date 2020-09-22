import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { studentName: '', studentCourse: '', studentGrade: '' };
  }

  handleNameChange(ev) {
    this.setState({ studentName: ev.target.value });
  }

  handleCourseChange(ev) {
    this.setState({ studentCourse: ev.target.value });
  }

  handleGradeChange(ev) {
    this.setState({ studentGrade: ev.target.value });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const newGrade = {
      name: this.state.studentName,
      course: this.state.studentCourse,
      grade: parseInt(this.state.studentGrade, 10)
    };
    if (!this.state.studentName && !this.state.studentCourse && !this.state.studentGrade) {
      this.setState({ studentName: 'Please submit a name', studentCourse: 'Please submit a course', studentGrade: 'Grade must be a number' });
    } else if (!parseInt(this.state.studentGrade, 10)) {
      this.setState({ studentName: '', studentCourse: '', studentGrade: 'Grade must be a number' });
    } else if (this.state.studentName) {
      this.setState({ studentName: 'Please submit a name', studentCourse: '', studentGrade: '' });
    } else if (this.state.studentCourse) {
      this.setState({ studentName: '', studentCourse: 'Please submit a course', studentGrade: '' });
    } else {
      this.props.onSubmit(newGrade);
      this.setState({ studentName: '', studentCourse: '', studentGrade: '' });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="col-lg-4">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="fas fa-user"></i></span>
          </div>
          <input type="text" value={this.state.studentName} onChange={this.handleNameChange} className="col" name="name" placeholder="Name" />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="fas fa-list"></i></span>
          </div>
          <input type="text" value={this.state.studentCourse} onChange={this.handleCourseChange} className="col" name="course" placeholder="Course" />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="fas fa-graduation-cap"></i></span>
          </div>
          <input type="text" value={this.state.studentGrade} onChange={this.handleGradeChange} className="col" name="grade" placeholder="Grade" />
        </div>
        <div className="input-group justify-content-end mb-3">
          <button type="submit" className="mx-3 btn btn-success">Add</button>
          <button type="reset" className="btn btn-outline-secondary">Cancel</button>
        </div>
      </form>
    );
  }
}

export default GradeForm;
