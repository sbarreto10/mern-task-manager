function NavBar() {
  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark p-4">
      <a className="navbar-brand d-flex align-items-center gap-4" href="#">
        <img src="./tskmngr.svg" className="w-25" alt="TaskManager Logo" />
        <h1>{"TaskManager"}</h1>
      </a>
    </div>
  );
}

export default NavBar;
