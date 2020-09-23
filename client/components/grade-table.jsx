import React from 'react';

class GradeTable extends React.Component {
  constructor(props) {
    super(props);
    this.createTableRows = this.createTableRows.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  createTableRows() {
    return <>{this.props.grades.map(student => <Grade key={student.id} student={student} handleEdit={this.handleEdit} handleDelete={this.handleDelete}/>)}</>;
  }

  handleDelete() {
    this.props.onDelete(parseInt(event.target.parentElement.id));
  }

  handleEdit() {
    this.props.getGradeById(event.target.parentElement.id);
  }

  render() {
    const rows = this.createTableRows();
    const grades = this.props.grades;
    return (
      <div className="col-lg-8 table-responsive">
        <table className="border border-dark table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="border-right-black">Student Name</th>
              <th className="border-right-black">Course</th>
              <th className="border-right-black">Grade</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
        {!grades.length && 'No grades recorded'}
      </div>
    );
  }
}

function Grade(props) {
  const student = props.student;
  return (
    <tr>
      <td className="border-right-black">{student.name}</td>
      <td className="border-right-black">{student.course}</td>
      <td className="border-right-black">{student.grade}</td>
      <td id={student.id} className="d-flex justify-content-end">
        <button className="btn btn-primary mr-3" onClick={props.handleEdit}>Edit</button>
        <button className="btn btn-danger" onClick={props.handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default GradeTable;
