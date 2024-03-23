import { Link } from "react-router-dom";
function Redirect({ data }) {
  const renderNavigation = () => {
    return data.map(({ id, caption, link: { path, title } }) => (
      <div className="" key={id}>
        <p className="">{caption}</p>
        <Link to={path} className="">
          {title}
        </Link>
      </div>
    ));
  };
  return (
    <>
      {renderNavigation()}
    </>
  );
}
export default Redirect;
