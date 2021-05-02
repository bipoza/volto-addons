import React from 'react';
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Segment,
  } from 'semantic-ui-react';
import WhiteLogo from '../../images/logo_white_large.png';
function Footer() {

    return (
        <Segment inverted style={{ margin: '5em 0em 0em', padding: '5em 0em' }} vertical>
            <Container textAlign='center'>
          
                <Image src={WhiteLogo}centered size='small' />
                <Divider inverted section />
                <p>Made by bipoza with ❤️</p>

            </Container>
        </Segment>
    );
}
export default Footer;