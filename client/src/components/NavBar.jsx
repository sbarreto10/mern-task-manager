import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { navLinks } = useAuth();

  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark px-4 d-flex justify-content-between">
      <a className="navbar-brand d-flex align-items-center gap-4 py-0" href="/">
        <img
          src="/tskmngr.svg"
          className="navbar-logo"
          alt="TaskManager Logo"
        />
        <h1>{"TaskManager"}</h1>
      </a>

      <ul className="navbar-nav mr-auto navbar-links d-flex px-5 gap-5">
        {navLinks.map((link) => {
          return (
            <li className="nav-item active" key={`nav-link-${link.name}`}>
              <a className="nav-link" href={link.route} onClick={link.onClick}>
                {link.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NavBar;
