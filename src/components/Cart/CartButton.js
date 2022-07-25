import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { cartsliceactions } from '../Store/Index';

const CartButton = (props) => {

  const value=useSelector((state)=>state.cart.totalQuantity);

const dispatch=useDispatch();

const changehandler=()=>{

  dispatch(cartsliceactions.cartshow());
}


  return (
    <button onClick={changehandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{value}</span>
    </button>
  );
};

export default CartButton;
