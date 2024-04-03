import { Link } from "react-router-dom";
import classes from "./Layout.module.css";
function Layout() {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        Algorithm Visualizer
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/pathfind-algo" className={classes.link}>
              Path finder
            </Link>
          </li>
          <li>
            <Link to="/search-algo" className={classes.link}>
              Search
            </Link>
          </li>
          <li>
            <Link to="/sort-algo" className={classes.link}>
              Sort
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Layout;
