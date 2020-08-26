import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props){
    super(props);

    this.searchSpotify = this.searchSpotify.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.state = {
      term: '',
    }
  }
  searchSpotify() { //method called search that passes the state of the term to this.props.onSearch 
    console.log(this.state.term);
    this.props.onSearch(this.state.term);
      //event.preventDefault();
  }

  handleTermChange(event){
    this.setState({term: event.target.value});
  }

  // handleKeyPress(event) {
  //   if(event.key === 'Enter') {
  //     this.searchSpotify();
  //   }
  // }

  render(){
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <button onClick={this.searchSpotify} className="SearchButton">SEARCH</button>
      </div>
    );
  }
};