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
            <form onSubmit={this.search} className="flex items-center space-x-4 mb-4">
              <label className="text-gray-700 font-medium">Search</label>
              <input
                type="text"
                placeholder="Search Something..."
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 text-gray-800"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Search
              </button>
            </form>
          );
    }
}

export default SearchInput