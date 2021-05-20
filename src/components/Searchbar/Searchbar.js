import React, { useState } from 'react'
import { Search, Grid, Menu, Container, Popup } from 'semantic-ui-react'
import './Searchbar.css';
import { ADDONS_REPO, CATEGORIES } from '../../constants';
import { connect } from "react-redux";

const initialState = {
    loading: false,
    results: [],
    value: '',
}

function exampleReducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query }
        case 'FINISH_SEARCH':
            return { ...state, loading: false, results: action.results }
        case 'UPDATE_SELECTION':
            return { ...state, value: action.selection }

        default:
            throw new Error()
    }
}

function Searchbar({ addons }) {
    console.log("ADDOS: ", addons)
    let [searchFocus, setSearchFocus] = useState(false);
    let [activeItem, setActiveItem] = useState('home')
    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const { loading, results, value } = state

    const timeoutRef = React.useRef()
    const handleSearchChange = React.useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })

        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' })
                return
            }
            dispatch({
                type: 'FINISH_SEARCH',
                results: addons?.filter(item => (item.title.indexOf(data.value) > -1) || (item.category.indexOf(data.value) > -1))
            });
            setSearchFocus(true)
        }, 300)
    }, [addons])
    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    return (
        <div className="search-row">
            <Container>
                <Grid>
                    <Grid.Column width={8}>
                        <Search
                            size="large"
                            className="search-bar"
                            loading={loading}
                            onResultSelect={(e, data) =>
                                dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
                            }
                            onSearchChange={handleSearchChange}
                            results={results}
                            value={value}
                            open={searchFocus}
                            onBlur={() => setSearchFocus(false)}
                        />

                    </Grid.Column>

                    <Grid.Column width={8}>
                        <Menu secondary>
                            {CATEGORIES.map((category) =>
                                <Popup
                                    content={category.description}
                                    position='bottom center'
                                    trigger={<Menu.Item
                                        name={category.name}
                                        active={activeItem === category.name}
                                        onClick={(e) => {
                                            setActiveItem(category.name);
                                            dispatch({ type: 'UPDATE_SELECTION', selection: category.name });
                                            const data = {
                                                value: category.name
                                            }
                                            handleSearchChange(e, data);
                                        }}
                                    />} />
                            )
                            }
                        </Menu>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}
const mapStateToProps = (state) => {
    const { addons } = state['data'];
    return {
        addons: addons,
    };
};
export default connect(mapStateToProps)(Searchbar);