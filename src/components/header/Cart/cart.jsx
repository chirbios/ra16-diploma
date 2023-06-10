import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import './main.css'

const Cart = ({ name }) => {

  const cart = useSelector((state) => state[name].items);
  const navigate = useNavigate();

  return (
    <div className="header-controls-pic header-controls-cart"
      onClick={() => { navigate('/cart') }}>
      {cart.length > 0 &&
        <div className="header-controls-cart-full">{cart.length}</div>
      }
    </div>
  )
};

Cart.propTypes = {
  name: PropTypes.string.isRequired,
};
Cart.defaultProps = {
  name: 'storage_cart',
}

export default Cart