import DrinkCard from "../molecules/DrinkCard";
import MenuStyle from "./MenuList.module.scss"
import SlideModal from "../molecules/SlideModal";

import classNames from 'classnames/bind';
import { useState } from "react";


function MenuList ({ drinks }) {

  const [displayModal, setDisplayModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState(0);

  let cx = classNames.bind(MenuStyle)
  let modalWrapperClasses=cx({
    modalWrapper: true,
    show: displayModal
  })  
  let listClasses=cx({
    list: true,
    stopScroll: displayModal
  })  
  
  function handleCardClick(index){
    setSelectedElement(index)
    setDisplayModal(!displayModal)
  }

  function checkIngredientsActive(ingredientArr){
    let activeCount = 0;
    for (const i in ingredientArr) {
      if (ingredientArr[i].isActive === false) {
        activeCount++ 
      }
    }
    if (activeCount!==0){
      return false
    }
    return true
  }

  return(
    <>
      <div className={ modalWrapperClasses }>
        <div onClick={()=>{setDisplayModal(!displayModal)}} className={ MenuStyle.overlay }/>
        <SlideModal className={ MenuStyle.modal } drinkData={ drinks[selectedElement]} isActive={displayModal}/>
      </div>

      <ul className={ listClasses }>
        {drinks.map((drink, index) => {
          if (drink.image === null ){
            drink.image = 
              {
                url: 'https://images.vexels.com/media/users/3/189260/isolated/lists/3a367169d2eb53d9d840522a0cf451db-new-year-martini-glass-silhouette.png'
              }
          }
          
          if (drink.isActive === true && checkIngredientsActive(drink.ingredients) === true){
            return(
              <li onClick={() => handleCardClick(index)} key={index} className={ MenuStyle.listElement }>
                <DrinkCard drink={ drink }/>
              </li>
            )
          }

          // return null
        })}
      </ul>
    </>
  )
}

export default MenuList