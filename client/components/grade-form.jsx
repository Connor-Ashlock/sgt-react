import React from 'react';

class GradeForm extends React.Component {
  render() {
    return (
      <form className="col-lg-4">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="fas fa-user"></i></span>
          </div>
          <input type="text" className="col" name="name" placeholder="Name" />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="fas fa-list"></i></span>
          </div>
          <input type="text" className="col" name="course" placeholder="Course" />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="fas fa-graduation-cap"></i></span>
          </div>
          <input type="text" className="col" name="grade" placeholder="Grade" />
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
