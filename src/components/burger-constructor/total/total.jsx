import CurrencyIconPath from '../../../images/cur-icon.svg';
import styles from "./total.module.css";
import { useReducer } from 'react';

// const reducer=(state,action)=>{
//   switch(action.type){case (SUM):}
// }

function Total(props) {
  // const [store, dispatch] = useReducer(reducer, { text: '' });


  return (
    <>
      <span className="mr-1 text text_type_digits-medium">610</span>
      <img className="mr-10"src={CurrencyIconPath} alt="у.е." />
    </>
  );
}

export default Total;
