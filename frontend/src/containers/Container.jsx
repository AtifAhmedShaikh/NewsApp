import PropTypes from "prop-types";
const Container = ({ children, className }) => {
  return <div className={`pb-10 min-h-[75vh] lg:px-5 bg-background ${className}`}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};
export default Container;
