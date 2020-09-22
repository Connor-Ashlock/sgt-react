import React from 'react';

class GradeTable extends React.Component {
  constructor(props) {
    super(props);
    this.createTableRows = this.createTableRows.bind(this);
  }

  createTableRows() {
    return <>{this.props.grades.map(student => <Grade key={student.id} student={student}/>)}</>;
  }

  render() {
    const rows = this.createTableRows();
    const grades = this.props.grades;
    return (
      <div className="row">
        <div className="col">
          <table className="border border-dark table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th className="border-right-black">Student Name</th>
                <th className="border-right-black">Course</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
          {!grades.length && 'No grades recorded'}
        </div>
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
      <td>{student.grade}</td>
    </tr>
  );
}

export default GradeTable;