import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import './LanguageSelector.css';

const languageOptions = [
    { key: 'English', text: 'English', value: 'English' },
    { key: 'Euskara', text: 'Euskara', value: 'Euskara' },
    { key: 'French', text: 'French', value: 'French' },
    { key: 'Spanish', text: 'Spanish', value: 'Spanish' }
]

const LanguageSelector = () => (
    <Dropdown text='Select Language' simple item className='link item icon' icon='world'>
        <Dropdown.Menu>
            {languageOptions.map((language) =>
                <Dropdown.Item key={language.key}>{language.text}</Dropdown.Item>
            )}
        </Dropdown.Menu>
    </Dropdown>
)

export default LanguageSelector;