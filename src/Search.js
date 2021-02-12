import React from 'react';
import './Search.css'; 
import axios from 'axios';

class Search extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            query: '',
            results: {},
            loading: false,
            message: ''
        } 
    }

    handleOnInputChange = ( event ) => { 
        const query = event.target.value;
        this.setState({ query, loading: true, message: ''});
        
    };

    render() {
        const { query } = this.state;

        return (
            <div className="container">
            <h1 className="heading">ITUNES SEARCH : REACT APPLICATION </h1>
            <lable className="search-label" htmlform="search-input">
                <input
                    type="text"
                    name="query"
                    value={query}
                    id="search-input"
                    placeholder = "Search Artist,Music...."
                    onChange={this.handleOnInputChange}
                />
                <i class="fas fa-search search-icon"/>
            </lable>
            </div>
        )
    }
}

export default Search;