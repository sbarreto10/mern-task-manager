import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { navLinks, isLoading } = useAuth();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid navbar-container">
        <a
          className="navbar-brand d-flex align-items-center gap-4 py-0"
          href="/"
        >
          <img
            src="/tskmngr.svg"
            className="navbar-logo"
            alt="TaskManager Logo"
          />
          <h1>{"TaskManager"}</h1>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {!isLoading && navLinks.map((link) => {
              return (
                <li className="nav-item active" key={`nav-link-${link.name}`}>
                  <a
                    className="nav-link"
                    href={link.route}
                    onClick={link.onClick}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
