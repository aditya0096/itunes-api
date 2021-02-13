import React from 'react';
import './Search.css'; 
import axios from 'axios';

class Search extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            query: '',
            result: {},
            loading: false,
            message: ''
        };

        this.cancel = '';

        this.cancel='';
    }

    fetchSearchResults = ( query ) => {
        // const pageNumber = updatedPageNo ? '&page=4${updatedPageNo}' : '';
        // const searchUrl = `https://itunes.apple.com/search?parameterkeyvalue`
        const searchUrl = `https://itunes.apple.com/search?term=${query}&`

        if( this.cancel ){
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();

        axios.get( searchUrl, {
            cancelToken: this.cancel.token
        } )
            .then( res => {
                const resultNotFoundMsg = ! res.data.results.length
                                        ? 'There Are No More Results.'
                                        : '';
                this.setState ( {
                    result: res.data.results,
                    message: resultNotFoundMsg,
                    loading: false
                })
                //  console.log(res.data);  
            })
            .catch( error => {
                if( axios.isCancel(error) || error ) {
                    this.setState( {
                    loading: false,
                    message: 'Failed to fetch the data'
                    })
                }
            } )
                
    };

    handleOnInputChange = ( event ) => { 
        const query = event.target.value;
        this.setState({ query: query, loading: true, message: ''}, () => {
            this.fetchSearchResults(query);
        });

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