import React, { Component } from 'react'
export default class ReposList extends Component { 
    constructor() {
      super()
      this.state = { repos: [] ,filteredRepos :[], value : "" , search : "" , days:"" }
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

          var date1 = new Date(this.state.repos.updated_at);
        console.log(this.state.repos.updated_at) ;var date2 = new Date();
        var difference = date1. getTime() - date2. getTime();
        var days = Math. ceil(difference / (1000 * 3600 * 24)); console. log(days + ' days to Christmas');
        this.setState({days:days});
        
      }
  
    componentDidMount() {
      
    }
  
    render() {
      return (
        <div>
            <br />
             <form onSubmit={this.handleSubmit} className="justify-content-between">
          <div className="form-group">
          <label>
            <b>Github Username: </b>
            &nbsp;
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          &nbsp;&nbsp;
          <input type="submit" value="Search" className="btn btn-success" />
          </div>
        </form>
        
<br /><br />
        <div className="profile">
            {this.state?.repos?.owner?.login}
        </div>
          <h1>Repos List on netlify {this.state.repos?.owner?.login}</h1>
          <br />
          <form style= {{textAlign:"left" , marginLeft:100}} onSubmit={this.handleSubmit}>
          <label>
            <b>Search: </b>
            <input  type="text" value={this.state.search} onChange={this.handleChangeSearch} />
          </label>
          
        </form>
            {this.state.repos.filter((val)=>{
                if(this.state.search == "") {
                    return val 
                } else if(val.name.toLowerCase().includes(this.state.search)){
                    return val
                }
            }).map(repo => {
              return <div style={{marginRight : 100 , marginLeft : 100 , marginTop:20 ,textAlign:"left"}}className="list-group">
              <a href={repo.svn_url} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                <img src={repo.owner.avatar_url + ""} alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"/>
                <div className="d-flex gap-2 w-100 justify-content-between">
                  <div>
                    <h6 className="mb-0">{repo.name}</h6>
                    <p className="mb-0 opacity-75">Last updated {new Date(repo.updated_at).getDate()} {new Date(repo.updated_at).toLocaleString('default', { month: 'short' })} </p>
                  </div>
                  <small className="opacity-50 text-nowrap">Language: {repo.language}</small>
                </div>
              </a>
              </div>
            })}
          
          
        </div>
      )
    }
  }


