// Importing hooks from react-redux
import { GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../redux/cart.slice';

import styles from './cart.module.scss';


export async function handleSubmit(name, notes, drinksOrdered){
  const graphcms = new GraphQLClient(
    process.env.PRODUCTION_GRAPH_CMS_ENDPOINT,
    {
        headers: {
            Authorization: process.env.PRODUCTION_GRAPH_CMS_TOKEN
        }
    }
  ); 

  let drinks_array=[]
  for (let i in drinksOrdered){
    drinks_array[i]= {id:`${drinksOrdered}`}
  }
  console.log(drinks_array)

  let orderData = {}

  orderData = {
    customerName: name, 
    drinks: {
      connect: drinks_array
    }, 
    notes: notes
  }

  // QUERY DATA FROM GRAPHCMS
  const order = await graphcms.request(`
  mutation createOrder($orderData: ${orderData}) {
    createOrder(data: $orderData) {
      id
      customerName
      createdAt
    }
  }
  `);

  return {
      props: {
          order,
      },
  }
}

const CartPage = () => {

  const [name, setName] = useState('');
  const [comments, setComments] = useState('');

  // Extracting cart state from redux store 
  const cart = useSelector((state) => state.cart);

  // Reference to the dispatch function from redux store
  const dispatch = useDispatch();

  const getItemsCount = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };

  return (
    <div className={styles.container}>
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i} className={styles.body}>
              <div className={styles.image}>
                <Image src={item.image.url} height="90" width="65" alt={item.name}/>
              </div>
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <div className={styles.buttons}>
                <button onClick={() => dispatch(incrementQuantity(item.id))}>
                  +
                </button>
                <button onClick={() => dispatch(decrementQuantity(item.id))}>
                  -
                </button>
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  x
                </button>
              </div>              
            </div>
          ))}
          <div>
            <label>Customer Name</label>
            <input
                type="text"
                value={name}
                onChange={e => { setName(e.currentTarget.value); }}
            />
            <label>Order Notes</label>
            <input
                type="text"
                value={comments}
                onChange={e => { setComments(e.currentTarget.value); }}
            />
          </div>
          <button onClick={ handleSubmit() }>
            Order Drinks
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;