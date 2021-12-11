import React from "react"
import PropTypes from "prop-types"

import NavBar from "../molecules/NavBar"
import Footer from "../molecules/Footer"
import MenuStyle from "../organisms/MenuList.module.scss"
import LayoutStyle from "./LayoutStyles.module.scss"

function Layout({ children }) {
  return (
    <main className={ LayoutStyle.main + MenuStyle.stopScroll }>
      <NavBar />

      <div className={ LayoutStyle.mainContent }>
        <div>{children}</div>
      </div>

      <Footer />
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
