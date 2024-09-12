//Michael Stone - u21497682
import React, { Component } from 'react';

class SearchInput extends Component 
{
    constructor(props) 
    {
        super(props);

        this.state = { searchTerm: '' };

        this.search = this.search.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) 
    {
        this.setState({ searchTerm: event.target.value });
    }

    search(event) 
    {
        event.preventDefault();  // Prevents the default form submission behavior
        this.props.handleSearch(this.state.searchTerm);  // Calls the handleSearch function passed as a prop
    }

    render() 
    {
        return (
            <form onSubmit={this.search}>
                <label>Search</label>
                <input type="text" placeholder="Search Something..." value={this.state.searchTerm} onChange={this.handleInputChange} />
                <button type="submit">Search</button>
            </form>
        );
    }
}

export default SearchInput