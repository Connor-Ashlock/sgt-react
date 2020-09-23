import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.state = {
      studentName: '',
      studentCourse: '',
      studentGrade: '',
      isValidated: true
    };
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
    this.checkValidation();
  }

  handleCancel() {
    this.props.resetSelectedStudent();
    this.setState({ studentName: '', studentCourse: '', studentGrade: '', isValidated: true });
  }

  checkValidation(grade) {
    const newGrade = {
      name: this.state.studentName,
      course: this.state.studentCourse,
      grade: parseInt(this.state.studentGrade, 10)
    };
    if (!this.state.studentName || !this.state.studentCourse || !parseInt(this.state.studentGrade, 10)) {
      this.setState({ isValidated: false });
    } else {
      if (this.props.editStudent) {
        newGrade.id = this.props.editStudent.id;
      }
      this.props.onSubmit(newGrade);
      this.setState({ studentName: '', studentCourse: '', studentGrade: '', isValidated: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.editStudent === null) {
      return null;
    } else if (this.props.editStudent !== prevProps.editStudent) {
      const name = this.props.editStudent.name;
      const course = this.props.editStudent.course;
      const grade = this.props.editStudent.grade;
      this.setState({ studentName: name, studentCourse: course, studentGrade: grade });
    }
  }

  render() {
    const edit = this.props.editStudent;
    const validationMessage = <ValidationMessage state={this.state} />;
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
          <button type="submit" className={`mr-3 btn btn-${!edit ? 'success' : 'primary'}`}>{!edit ? 'Add' : 'Update'}</button>
          <button type="reset" onClick={this.handleCancel} className="btn btn-outline-secondary">Cancel</button>
        </div>
        {!this.state.isValidated && validationMessage}
      </form>
    );
  }
}

function ValidationMessage(props) {
  if (!props.state.studentName && !props.state.studentCourse && !parseInt(props.state.studentGrade, 10)) {
    return <p className="d-flex justify-content-end text-danger">Please submit a name, course, and grade!</p>;
  } else if (!parseInt(props.state.studentGrade, 10)) {
    return <p className="d-flex justify-content-end text-danger">Grade must be a number!</p>;
  } else if (!props.state.studentName) {
    return <p className="d-flex justify-content-end text-danger">Please submit a name!</p>;
  } else if (!props.state.studentCourse) {
    return <p className="d-flex justify-content-end text-danger">Please submit a course!</p>;
  } else {
    return null;
  }
}

export default GradeForm;
