import React from 'react';

class GradeTable extends React.Component {
  render() {
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
              <tr>
                <td className="border-right-black">1</td>
                <td className="border-right-black">2</td>
                <td>3</td>
              </tr>
              <tr>
                <td className="border-right-black">4</td>
                <td className="border-right-black">5</td>
                <td>6</td>
              </tr>
              <tr>
                <td className="border-right-black">7</td>
                <td className="border-right-black">8</td>
                <td>9</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default GradeTable;
