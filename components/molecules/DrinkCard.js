import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';


import CardStyle from './DrinkCard.module.scss';

function DrinkCard({ drink }) {
  // Extracting cart state from redux store 
  const cart = useSelector((state) => state.cart);

  // Reference to the dispatch function from redux store
  const dispatch = useDispatch();

  return(
    <div className={ CardStyle.cardWrapper }>
      <div className={ CardStyle.imageWrapper }>
        <Image className={ CardStyle.image } src={drink.image.url} alt={ drink.name } layout="fill"/>
      </div>
      <div className={ CardStyle.cardText }>
        <h2>{ drink.name }</h2>
        <p>" { drink.quote } "</p>
      </div>
      {/* <div className={ CardStyle.buttonWrapper }>
        <button className={` btn-base-style ${ CardStyle.addToOrder }`} onClick={() => dispatch(addToCart( drink ))}>
          <Image className={ CardStyle.plusSVG } src="/svg/icons/addition_symbol.svg" alt="Add drink to order" height={30} width={30} layout="responsive" placeholder={() => <div style={{backgroundColor: 'grey'}}/>}/>
        </button>
      </div> */}
    </div>
  )
}

export default DrinkCard