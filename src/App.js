import React from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import axios from 'axios';
import Notification from './components/UI/Notification';
import { cartsliceactions,cartsslicesactions } from './components/Store/Index.js';

let isInitial = true;
 
function App() {

  const dispatch=useDispatch();
  const dispatch2=useDispatch();
  const shown=useSelector(state=>state.cartclick.cartshown);
  const cart=useSelector(state=>state.cart);
  const notification = useSelector((state) => state.cartclick.notification)
//  
useEffect(()=>{
  const Receivedata = async () => {
    
//     dispatch(
//       cartsliceactions.showNotification({
//         status: 'pending',
//         title: 'Sending...',
//         message: 'receiving cart data!',
//       })
//     );
   const response = await fetch(
    'https://redux-api-eb2dd-default-rtdb.firebaseio.com/expense.json');
     const data=await response.json();
    console.log(data);
//     if (!response.ok) {
//       throw new Error('receiving cart data failed.');
//     }

//     dispatch(
//       cartsliceactions.showNotification({
//         status: 'success',
//         title: 'Success!',
//         message: 'receive cart data successfully!',
//       })
     
//     );
 dispatch2(cartsslicesactions.replaceCart(data))
//   };



//   Receivedata().catch((error) => {
//     dispatch(
//       cartsliceactions.showNotification({
//         status: 'error',
//         title: 'Error!',
//         message: 'receiving cart data failed!',
//       })
//     );
//   });

 }
 Receivedata();
}
 ,[dispatch2])

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
          body: JSON.stringify({items:cart.items,totalQuantity:cart.totalQuantity}),
        }
      );
      const data=await response.json();
      console.log(data);
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
