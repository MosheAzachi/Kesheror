import { NavLink } from "react-router-dom";

function MenuLink({ to, children }) {
  return (
    <li>
      <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
        {children}
      </NavLink>
    </li>
  );
}

export default MenuLink;
