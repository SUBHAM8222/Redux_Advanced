import React from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import axios from 'axios';
import Notification from './components/UI/Notification';
import { cartsliceactions } from './components/Store/Index';
let isInitial = true;

function App() {

  const dispatch=useDispatch();
  const shown=useSelector(state=>state.cartclick.cartshown);
  const cart=useSelector(state=>state.cart);
  const notification = useSelector((state) => state.cartclick.notification)
  //const shownotfn=useSelector(state=>state.cartclick.Notification);
  //console.log(shownotfn)
  // console.log(shown)
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        cartsliceactions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );
      const response = await fetch(
        'https://redux-api-eb2dd-default-rtdb.firebaseio.com/expense.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      dispatch(
        cartsliceactions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        cartsliceactions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <React.Fragment>
{notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    <Layout>
    {shown && <Cart />}
      <Products />
    </Layout>
    </React.Fragment>
  );
}

export default App;
