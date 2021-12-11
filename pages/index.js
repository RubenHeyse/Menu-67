import MenuList from '../components/organisms/MenuList';
import HeroBanner from '../components/molecules/HeroBanner'
import { GraphQLClient } from 'graphql-request'
import IndexStyle from "./Index.module.scss"


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
    const props = await graphcms.request(`
        {
            cocktails: drinks(orderBy: name_ASC, where: {tags_some: {tagText_contains: "cocktail"}}) {
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
            shots: drinks(orderBy: name_ASC, where: {tags_some: {tagText_contains: "shot"}}) {
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

    let cocktailsData = props.cocktails
    let shotsData = props.shots

    return {
        props: {
            cocktailsData,
            shotsData
        },
    }

}

function HomePage ({ cocktailsData, shotsData }) {
    return(
        <>
            <HeroBanner/>
            <div className={ IndexStyle.menu }>
                <h1>Cocktails</h1>
                <MenuList drinks={cocktailsData} />
                <h1>Shots</h1>
                <MenuList drinks={shotsData} />
            </div>
        </>
    )
}

export default HomePage;