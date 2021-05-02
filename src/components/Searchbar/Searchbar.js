import React, { useState } from 'react'
import { Search, Grid, Menu, Container } from 'semantic-ui-react'
import './Searchbar.css';
import { ADDONS_REPO, CATEGORIES } from '../../constants';


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

function Searchbar() {

    let [searchFocus, setSearchFocus] = useState(false);
    let [activeItem, setActiveItem] = useState('home')
    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const { loading, results, value } = state

    const timeoutRef = React.useRef()
    const handleSearchChange = React.useCallback((e, data) => {
        console.log()
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })

        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' })
                return
            }
            console.log("source.filter(item=>item.title === data.value): ", ADDONS_REPO.filter(item => item.title.indexOf(data.value) > -1))
            dispatch({
                type: 'FINISH_SEARCH',
                results: ADDONS_REPO.filter(item => item.title.indexOf(data.value) > -1 || item.category.indexOf(data.value) > -1),
            });
            setSearchFocus(true)
        }, 300)
    }, [])
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
                                <Menu.Item
                                    name={category.name}
                                    active={activeItem === category.id}
                                    onClick={(e) => {
                                        setActiveItem(category.id);
                                        dispatch({ type: 'UPDATE_SELECTION', selection: category.id });
                                        const data = {
                                            value: category.id
                                        }
                                        handleSearchChange(e, data);
                                    }}
                                />)
                            }
                        </Menu>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}

export default Searchbar;