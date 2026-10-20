
import { NavLink } from "react-router-dom";

function Navbar() {
return (
    <nav className="navbar">
<NavLink to="/" className="logo">
Parallel Me
</NavLink>

    <div className="nav-links">
<NavLink
to="/"
end
className={({ isActive }) =>
    isActive ? "nav-link active" : "nav-link"
}
>
Home
</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/create">Create</NavLink>
        <NavLink to="/compare">Compare</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/profile">Profile</NavLink>
    </div>

    <NavLink to="/create" className="nav-cta">
        Start Exploring ↗
    </NavLink>
    </nav>
);
}

export default Navbar;
