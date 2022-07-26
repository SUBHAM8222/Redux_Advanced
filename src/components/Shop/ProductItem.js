import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch } from 'react-redux';
import {  cartsslicesactions } from '../Store/Index';

const ProductItem = (props) => {

  const dispatch=useDispatch();
  //const dispatch2=useDispatch();

  const addcarthandler=(event)=>{
    event.preventDefault();
dispatch(cartsslicesactions.addItemToCart({

  id,
  title,
  price,
}))
//dispatch2(cartsliceactions.shownotification())

  }
  const { title, price, description,id} = props;

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addcarthandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
