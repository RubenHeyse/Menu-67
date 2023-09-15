/* eslint-disable @next/next/link-passhref */
import Link from 'next/link';
import { useSelector } from 'react-redux';
import NavBarStyle from './NavBar.module.scss';

function NavBar() {

  const cart = useSelector((state) => state.cart);

  const getItemsCount = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };

  function cartTotal (){
    let cart_total = cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
    if(cart_total!==0){
      return(
        <span>
          {cart_total}
        </span>
      )
    }else{
      return null
    }
  }

  return(
    <header className={ NavBarStyle.header }>
      <div className={NavBarStyle.contentWrapper }>
        <Link href="/" className={ NavBarStyle.itemWrapper }>
          <h1 className={ NavBarStyle.logoText }>Menu <span className="accentText">67</span></h1>
        </Link>
        {/* <div className={ NavBarStyle.itemWrapper }>
          <Link href="/cart" className={ `btn-base-style ${ NavBarStyle.viewOrderBtn }` }>
            <Image className={ NavBarStyle.shoppingBagSVG} src="/svg/shopping-cart-icon.svg" alt="View cart" height={35} width={30}/>
          </Link>
          {cartTotal()}
        </div> */}
      </div>
    </header>
  )
}

export default NavBar