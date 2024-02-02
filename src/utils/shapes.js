import PropTypes from "prop-types";

export const titlesArrayShape = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export const cardDataShape = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
};

export const navbarDataShape = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};
