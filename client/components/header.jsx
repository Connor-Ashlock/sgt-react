import React from 'react';

function Header(props) {
  return (
    <header className="row align-items-center">
      <h1 className="col-lg-8 justify-content-lg-start justify-content-center d-flex">Student Grade Table</h1>
      <h3 className="col-lg-4 d-flex justify-content-lg-end justify-content-center">Average Grade <span className="border border-dark badge badge-secondary ml-2 border-3 border-dark">{props.average}</span></h3>
    </header>
  );
}

export default Header;
