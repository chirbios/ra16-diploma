import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { statusTypes } from '../../../store/storeTypes'
import { postActions, storageActions } from '../../../reducers'
import Loading from '../../shared/Loading/loading'
import OrderMessage from './OrderMessage'
import ErrorBubble from '../../shared/Error/error'
import './main.css'

const OrderForm = ({ name, namePost }) => {

  const cart = useSelector((state) => state[name].items);
  const cartStatus = useSelector((state) => state[name].status);

  const postResult = useSelector((state) => state[namePost].result);
  const postStatus = useSelector((state) => state[namePost].status);

  const dispatch = useDispatch();

  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agreement, setAgreement] = useState(false);

  const handleChangePhone = (e) => {
    // eslint-disable-next-line no-useless-escape
    setPhone(e.target.value.replace(/[^\+\(\)0-9]/g, ''));
  }

  const handleChangeAddress = (e) => {
    setAddress(e.target.value.trimLeft());
  }

  const handleChangeAgreement = (e) => {
    setAgreement((prev) => !prev);
  }

  const chekDisableSubmitButton = () => (
    phone && address && agreement ? false : true
  );

  const handleSubmit = () => {
    const data = {
      owner: {
        phone,
        address
      },
      items: cart

    }
    dispatch(postActions[namePost].postDataRequest(data, namePost));

    dispatch(storageActions[name].setStatus(statusTypes.SUCCESS, name));
  }

  useEffect(() => {
    if (postStatus === statusTypes.SUCCESS && cartStatus === statusTypes.SUCCESS && Object.keys(postResult).length) {
      dispatch(storageActions[name].clearItems(name));
    }

    if (postStatus === statusTypes.SUCCESS && cartStatus === statusTypes.IDLE && Object.keys(postResult).length) {
      dispatch(postActions[namePost].clearPostResult(namePost));
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postStatus, cartStatus])

  if (postStatus === statusTypes.LOADING)
    return <Loading />

  if (postStatus === statusTypes.SUCCESS)
    return <OrderMessage order={postResult} />

  if (postStatus === statusTypes.ERROR)
    return <ErrorBubble retry={handleSubmit} />

  if (cart && cart.length)
    return (
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card order-card" >
          <form className="card-body">
            <div className="form-group">
              <label htmlFor="phone">
                Телефон
                <span title="Обязательное поле" className="text-red">*</span>
              </label>
              <input className="form-control" id="phone" name="phone" placeholder="Ваш телефон" value={phone} onChange={handleChangePhone} />
            </div>
            <div className="form-group">
              <label htmlFor="address">
                Адрес доставки
                <span title="Обязательное поле" className="text-red">*</span>
              </label>
              <input className="form-control" id="address" name="address" placeholder="Адрес доставки" value={address} onChange={handleChangeAddress} />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="agreement" name="agreement" value={agreement} onChange={handleChangeAgreement} />
              <label className="form-check-label" htmlFor="agreement">
                Согласен с правилами доставки
                <span title="Обязательное поле" className="text-red">*</span>
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-outline-secondary"
              disabled={chekDisableSubmitButton()}
              onClick={(e) => { e.preventDefault(); handleSubmit() }}
            >
              Оформить
            </button>
          </form>
        </div>
      </section>
    )
  else
    return (
      <section className="order"></section>
    );
};

OrderForm.propTypes = {
  name: PropTypes.string.isRequired,
  namePost: PropTypes.string.isRequired
};

OrderForm.defaultProps = {
  name: 'storage_cart',
  namePost: 'post_cart',
}

export default OrderForm;