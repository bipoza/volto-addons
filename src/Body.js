import React from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import Searchbar from './components/Searchbar';
import NavBar from './components/Navbar';
import getAddons from './services';

function Body() {

    const handleGetAddons = () => {
        getAddons()
    }

    return (<>
        <NavBar />
        <Searchbar />
        <Container style={{ marginTop: '2em' }}>
            <Button onClick={handleGetAddons}>GET addons</Button>
        </Container>
    </>);

}

export default Body;
