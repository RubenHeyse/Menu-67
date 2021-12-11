import BannerStyle from './HeroBanner.module.scss'
import Image from 'next/image'

function NavBar() {
  return(
    <div className={ BannerStyle.bannerWrapper }>
      <div className={ BannerStyle.darkFilter }>
        <h1 className={ `header-display ${ BannerStyle.title }` }>THE MENU</h1>
      </div>
    </div>
  )
}

export default NavBar