import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';

import { cartsliceactions } from '../Store/Index';

const CartButton = (props) => {

const dispatch=useDispatch();

const changehandler=()=>{

  dispatch(cartsliceactions.cartshow());
}


  return (
    <button onClick={changehandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
