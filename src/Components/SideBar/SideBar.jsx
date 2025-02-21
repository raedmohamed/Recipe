import style from "./SideBar.module.scss";
import logo from "../../assets/logo-BfNap0Pe.png";
import { NavLink } from "react-router-dom";

function SideBar({ isOpen, toggleSidebar }) {
  const navItems = [
    { path: "", label: "Meals" },
    { path: "/ingredients", label: "Ingredients" },
    { path: "/area", label: "Area" },
  ];

  return (
    <div
      className={`${style.mainSideBar} ${isOpen ? style.open : style.closed}`}
    >
      <div>
        <img src={logo} alt="logo" />
      </div>

      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink to={item.path}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M445.588 56l-.026 384.352c6.881 11.323 14 15.677 19.97 15.648 5.924-.028 12.967-4.434 19.714-15.418L466.82 244.27l-.215-2.391 1.475-1.906c21.174-27.169 28.573-74.108 22.533-113.81-3.02-19.852-9.342-37.82-18.195-50.522-7.424-10.652-16.28-17.447-26.828-19.641h-.002zm-372.375.004l-.016 67.127-12.56-.016V56.008H46.332l.002 67.11H33.756v-67.11h-14.57v103.228c-.001 11.417 6.23 17.748 16.04 21.662l4.06 1.622-.09 4.37c-2 84.57-3.977 169.139-5.962 253.708C40.074 451.79 47.1 456.028 52.95 456c5.85-.028 12.87-4.377 19.623-15.432-2.315-84.547-4.63-169.096-6.941-253.644l-.12-4.4 4.073-1.606c10.324-4.106 17.039-11.074 17.039-21.676V56.004h-13.41zM256 95A161 161 0 0 0 95 256a161 161 0 0 0 161 161 161 161 0 0 0 161-161A161 161 0 0 0 256 95z" />
              </svg>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
