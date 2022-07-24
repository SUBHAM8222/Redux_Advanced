import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {

  const shown=useSelector(state=>state.cartshown);
  return (
    <Layout>
    {shown && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
