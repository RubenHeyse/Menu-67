import ModalStyle from "./SlideModal.module.scss"
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart.slice';

function SlideModal({ drinkData }){

  const dispatch = useDispatch();

  let ingredients = drinkData.ingredients
  return (
    <>
      <div className={ ModalStyle.modal }>
        <h1 className={ ModalStyle.drinkName }>{ drinkData.name }</h1>
        <div className={ ModalStyle.imageWrapper } >
          <Image 
            className={ ModalStyle.image } 
            src={drinkData.image.url} 
            alt={ drinkData.name } 
            layout="fill" 
            placeholder={() => <div style={{backgroundColor: 'grey'}} />}/>
        </div>
        <hr className={ ModalStyle.line }/>
        <div className={ ModalStyle.drinkStats }>
          <div className={ ModalStyle.statListItem }>
            <p className={ ModalStyle.statName } >Sweetness: </p>
            <p className={ ModalStyle.statData } >{ drinkData.sweetness?drinkData.sweetness:"?" }/5</p>
          </div>
          <div className={ ModalStyle.statListItem }>
            <p className={ ModalStyle.statName } >Strength: </p>
            <p className={ ModalStyle.statData } >{ drinkData.strength?drinkData.strength:"?" }/5</p>
          </div>
        </div>
        <hr className={ ModalStyle.line }/>
        <div className={ ModalStyle.ingredientList }>
          {ingredients.map(i => {
            return(
              <>
                <span key={i.id} className={ ModalStyle.ingredient }>
                  {i.name}
                </span>
              </>
            )
          })}
        </div>
        <div>
          <p>{ drinkData.tastingNotes === null ? drinkData.quote : drinkData.tastingNotes }</p>
        </div>
        {/* <div className={ ModalStyle.btnWrapper }>
          <button className={ ModalStyle.orderBtn } onClick={() => dispatch(addToCart(drinkData))}>
            <p>Add To Order</p>
            <div className={ ModalStyle.hoverFill }/>
          </button>
        </div> */}
      </div>
    </>
  )
}

export default SlideModal

//##########################
//TODO: Add scrolling inside of modal