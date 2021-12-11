import FooterStyle from './Footer.module.scss'
import Image from 'next/image'
import Link from 'next//link'

function Footer() {
  return(
    <footer className={ FooterStyle.footer }>
      <div className={FooterStyle.contentWrapper }>
        <div className={ FooterStyle.itemWrapper }>
          <h1 className="header-display">Menu <span className="accentText">67</span></h1>
        </div>
        <div className={ FooterStyle.itemWrapper }>
          <Link href='./admin' className={ `btn-base-style ${FooterStyle.adminBtn}` }>
            <Image className={ FooterStyle.adminSVG } src="/svg/icons/settings_icon.svg" alt="View cart" height={25} width={25}/>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer