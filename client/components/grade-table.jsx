import React from 'react';

function GradeTable(props) {
  const grades = props.grades;
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
            <Grade grades={grades} />
          </tbody>
        </table>
        {!grades.length && 'No grades recorded'}
      </div>
    </div>
  );
}

function Grade(props) {
  const tr = props.grades.map(student => {
    return (
      <tr key={student.id}>
        <td className="border-right-black">{student.name}</td>
        <td className="border-right-black">{student.course}</td>
        <td>{student.grade}</td>
      </tr>
    );
  });
  return tr;
}

export default GradeTable;
