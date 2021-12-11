import AdminStyles from './admin.module.scss'
import { GraphQLClient } from 'graphql-request'
import { useState } from "react";

export async function getStaticProps() {
  // INITIALISE GRAPHQL CLIENT FOR GRAPHCMS
  const graphcms = new GraphQLClient(
      process.env.PRODUCTION_GRAPH_CMS_ENDPOINT,
      {
          headers: {
              Authorization: process.env.PRODUCTION_GRAPH_CMS_TOKEN
          }
      }
  ); 

  // QUERY DATA FROM GRAPHCMS
  const { drinks } = await graphcms.request(`
      {
          drinks(orderBy: name_ASC) {
              id
              image {
                  url
              }
              name
              quote
              sweetness
              strength
              ingredients {
                  id
                  name
                  isActive
              }
              isActive
              tastingNotes
              measures
          }
      }
  `);

  let drinksData = drinks

  return {
      props: {
          drinksData,
      },
  }

}


function Admin ({ drinksData }) {
  const [selectedElement, setSelectedElement] = useState(0);

  function handleClick(index){
    setSelectedElement(index)
    console.log(selectedElement)
  }

  let selected_drink=drinksData[selectedElement]

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

  console.log(selected_drink)
  return (
    <div className={ AdminStyles.pageWrapper }>
      <div className={ AdminStyles.drinksWrapper }>
        <ul className={ AdminStyles.drinksList } >
          { drinksData.map((drink,i) => {
            if (drink.isActive === true && checkIngredientsActive(drink.ingredients) === true){
              return(
                <li onClick={() => handleClick(i)} key={ i } className={ AdminStyles.drink }>
                  <p className={ AdminStyles.drinkName }>
                    { drink.name }
                  </p>
                </li>
              )
            }else{
              return null
            }
          })}
        </ul>
      </div>
      <div className={ AdminStyles.infoWrapper }>
        <h1>{selected_drink.name}</h1>
        <div className={ AdminStyles.ingredientList }>
          {selected_drink.ingredients.map(i => {
            return(
              <>
                <span key={i.id} className={ AdminStyles.ingredient }>
                  {i.name}
                </span>
              </>
            )
          })}
        </div>
        <ul className={ AdminStyles.infoList }>
          {selected_drink.measures.map((m,i) => {
            return(
              <li key={i}>
                <h2>{m}</h2>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Admin