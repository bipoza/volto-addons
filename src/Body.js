import React from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import Searchbar from './components/Searchbar';
import NavBar from './components/Navbar';
import Carousel from './components/Carousel';
import { connect } from "react-redux";

function Body({ categories, addons }) {
    return (<>
        <NavBar />
        <Searchbar />
        <Container style={{ marginTop: '2em' }}>
            {/* <Button onClick={handleGetAddons}>GET addons</Button> */}

            {categories.map(category => {
                return (<Carousel title={category.title} description={category.description} elements={addons.filter(item => item.category === category.title)}></Carousel>)
            })}
        </Container>
    </>);

}
const mapStateToProps = (state) => {
    const { categories, addons } = state['data'];

    console.log("categories: ", categories)
    return {
        categories: categories,
        addons: addons
    };
};

export default connect(mapStateToProps)(Body);
