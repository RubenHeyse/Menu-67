import CardStyle from './DrinkCard.module.scss'
import Image from 'next/image'


function DrinkCard({ drink }) {
  return(
    <div className={ CardStyle.cardWrapper }>
      <Image className={ CardStyle.image } src={drink.image.url} alt={ drink.name } width={ 310 } height={ 230 } layout="responsive"/>
      <div className={ CardStyle.cardText }>
        <h2>{ drink.name }</h2>
        <p>" { drink.quote } "</p>
      </div>
      {/* <div className={ CardStyle.buttonWrapper }>
        <button className={` btn-base-style ${ CardStyle.addToOrder }`}>
          <Image className={ CardStyle.plusSVG } src="/svg/icons/addition_symbol.svg" alt="Add drink to order" height={30} width={30} layout="responsive" placeholder={() => <div style={{backgroundColor: 'grey'}}/>}/>
        </button>
      </div> */}
    </div>
  )
}

export default DrinkCard