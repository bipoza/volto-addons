import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import Searchbar from './components/Searchbar';
import NavBar from './components/Navbar';

function Body() {
    return (<>
        <NavBar /> 
        <Searchbar />
        <Container style={{ marginTop: '2em' }}>

        </Container>
    </>);

}

export default Body;
