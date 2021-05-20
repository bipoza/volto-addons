import React from 'react';
import { Container } from 'semantic-ui-react';
import Searchbar from './components/Searchbar';
import NavBar from './components/Navbar';
import Carousel from './components/CardCarousel';
import { connect } from "react-redux";

function Body({ categories, addons }) {
    return (<>
        <NavBar />
        <Searchbar />
        <Container style={{ marginTop: '2em' }}>
            {categories.map(category => {
                return (<Carousel title={category.title} description={category.description} elements={addons.filter(item => item.category === category.title).reverse()}></Carousel>)
            })}
        </Container>
    </>);

}
const mapStateToProps = (state) => {
    const { categories, addons } = state['data'];
    return {
        categories: categories,
        addons: addons
    };
};

export default connect(mapStateToProps)(Body);
