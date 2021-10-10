import React, { Component } from 'react'
export default class ReposList extends Component { 
    constructor() {
      super()
      this.state = { repos: [] ,filteredRepos :[], value : "" , search : "" }
    this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeSearch= this.handleChangeSearch.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleChangeSearch(event){
          console.log(this.state.search)
          this.setState({search : event.target.value})
          this.setState({filteredRepos : this.state.repos.filter((user) => {
            (user.name.toLowerCase().match(this.state.search.toLowerCase())) }) }) 
          
      }

      handleSubmit(event) {
        this.setState({value: event.target.value});
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        var myRequest = `https://api.github.com/users/${this.state.value}/repos`;
        
    
        fetch(myRequest)
          .then(response => response.json())
          .then(data => {
            this.setState({ repos: data })
          })
        
      }
  
    componentDidMount() {
      
    }
  
    render() {
      return (
        <div>
             <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <form onSubmit={this.handleSubmit}>
          <label>
            Search:
            <input type="text" value={this.state.search} onChange={this.handleChangeSearch} />
          </label>
          
        </form>
          <h1>Repos List on netlify</h1>
          <ul>
            {this.state.repos.filter((val)=>{
                if(this.state.search == "") {
                    return val 
                } else if(val.name.toLowerCase().includes(this.state.search)){
                    return val
                }
            }).map(repo => {
              return <li key={`movie-${repo.id}`}>{this.state.repos ? repo.name : alert("no repos to show")}</li>
            })}
          </ul>
          
        </div>
      )
    }
  }


