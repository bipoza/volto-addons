import React, { useState } from 'react';
import LogoSVG from './logo.svg';

import {
    Container,
    Image,
    Menu,
    Visibility,
    Icon, Popup
} from 'semantic-ui-react'
import LanguageSelector from '../LangageSelector';

const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    marginBottom: '1em',
    marginTop: '1em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

export default function Navbar() {
    let [menuFixed, setMenuFixed] = useState(false);


    const stickTopMenu = () => setMenuFixed(true)


    const unStickTopMenu = () => setMenuFixed(false);
    return (<Visibility
        onBottomPassed={stickTopMenu}
        onBottomVisible={unStickTopMenu}
        once={false}
    >
        <Menu
            borderless
            fixed={menuFixed ? 'top' : undefined}
            style={menuFixed ? fixedMenuStyle : menuStyle}
        >
            <Container>
                <Menu.Item>
                    <Image size='small' src={LogoSVG} />
                </Menu.Item>
                <Menu.Item>
                    Volto community addons gallery
                </Menu.Item>


                <Menu.Menu position='right'>
                    <Popup
                        content='Contribute by publishing your addon or with anything you can think of. Any idea is welcome!'
                        trigger={<Menu.Item as='a'> <div>Contribute <Icon name="github" /></div></Menu.Item>} />

                    <LanguageSelector />
                </Menu.Menu>
            </Container>
        </Menu>
    </Visibility>);
}