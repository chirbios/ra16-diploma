import HeadCart from './headCart'
import BodyCart from './bodyCart'
import './main.css'

const Cart = ({ name }) => {

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <HeadCart/>
        <BodyCart/>
      </table>
    </section >
  )
}

export default Cart