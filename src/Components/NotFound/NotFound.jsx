import style from "./NotFound.module.scss";

function NotFound() {
  return (
    <div className={style.notFound}>
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <p>Sorry, the page you are looking for doesn not exist.</p>
      <a href="/">Go back to Home</a>
    </div>
  );
}

export default NotFound;
