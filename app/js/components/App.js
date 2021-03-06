import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import { api } from '../constants'
import * as types from '../constants/ActionTypes'
import { routes } from '../constants'

export const requestProducts = () => ({
  type: types.REQUEST_ITEMS
})

export const getItems = (products) => ({
  type: types.RECEIVE_ITEMS,
  payload: { products }
})

export const addToBasket = (id) => ({
  type: types.ADD_TO_BASKET,
  payload: { id }
})

export const removeFromBasket = (id) => ({
  type: types.REMOVE_FROM_BASKET,
  payload: { id }
})

export const changeQuantity = (id, quantity) => ({
  type: types.CHANGE_QUANTITY,
  payload: { id, quantity: parseInt(quantity) }
})

export const receivePromoCode = (promoCode) => ({
  type: types.RECEIVE_PROMO_CODE,
  payload: { promoCode }
})

export const receiveDiscount = (discount) => ({
  type: types.RECEIVE_DISCOUNT,
  payload: { discount }
})

export const checkoutSuccess = () => ({
  type: types.CHECKOUT_SUCCESS
})

export const checkoutFailure = () => ({
  type: types.CHECKOUT_FAILURE
})

export const getAllProducts = () => (dispatch, getState) => {
  dispatch(requestProducts());
  return fetch(api.baseUrl + api.products)
      .then(res => res.json())
      .then(products => dispatch(getItems(products)));
}

export const applyPromoCode = (promoCode) => (dispatch) => {
  dispatch(receivePromoCode(promoCode));
  return fetch(api.baseUrl + api.promoCode, {
    method: 'POST',
    body: JSON.stringify({ promoCode })
  })
      .then(res => res.json())
      .then(discount => dispatch(receiveDiscount(discount)))
}

export const checkout = (productsInBasket, creditCard) => (dispatch) => {
  return fetch(api.baseUrl + api.checkout, {
    method: 'POST',
    body: JSON.stringify({
      basket: productsInBasket.map(product => ({
        sku: parseInt(product.id),
        quantity: product.quantity
      })),
      cardNumber: creditCard
    })
  })
      .then(res => res.json())
      .then(res => {
        if (!res.errors) {
          dispatch(push(routes.Success))
        } else {
          dispatch(push(routes.Failure))
        }
      })
      .catch(() => {
        dispatch(push(routes.Failure))
      })
}
