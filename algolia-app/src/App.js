import React, { Component } from 'react';
import './App.css';
import ResultPanel from './ResultPanel.js'

class App extends Component {

  constructor(props){
    super(props);

    this.state= {
      results: [],
      value: null
    };
  }

  handleSubmit = (e) =>{
    //using this syntax, we no longer need to bind this method explicitly
    e.preventDefault();  
    //make use of the data collected in this form
    //alert(this.state.value);
    console.log("current search value = " + this.state.value);
    this.fetchData(this.state.value);
    this.setState({
      value: "",
    },
    () => {
      console.log("this.state.value should be cleared. Its value is: " + this.state.value);
    }
    );

  }

  handleChange = (e) =>{
    //update the state as this textbox's value is changed by the end user via typing
    this.setState({
      value: e.target.value,
    },
    //remember to use the second argument for this.setState(), if you want to do something based on the update of state
    () =>{ 
      console.log("The state's value is now: " + this.state.value);
    });
  }

  fetchData(input){
    //use fetch funtion and callback to transform the data to the JSON structure
    console.log("input in state = " + input);
    let firstPart = "https://hn.algolia.com/api/v1/search?query=";
    let secondPart = "&tags=story";
    let fullSearch = firstPart + input + secondPart;
    console.log(fullSearch);

    fetch(fullSearch)
    .then(response => response.json())      //transform the text data to json which comes back as a promise use then() to continue
    .then((results) => {                 // store json data in state
      this.setState({
        results: results.hits,
      },
    ()=> {
      //for checking purposes, use optional second argument ot pass a funtion to see if state changed
      console.log(`the results ${this.state.results}`);
      console.log(this.state.results[0].title);
      //console.log("results length is " + this.state.theUsers.length);

    });
  });
  }

 
  render(){

    //console.log(this.state.results.length);
    let theResultsPanel = [];
    for(let i =0; i < this.state.results.length; i++){
      theResultsPanel.push(<div className="resultsPanel"><ResultPanel key={this.state.results[i]} result={this.state.results[i]}/> </div> )
    }

    return (
      <div className="App">

        {/** your form will want to go to a different page for submission, don't let it. */}
        <form onSubmit={this.handleSubmit}>
        {/** within the form element, you will include your various input elements */}
        <label>Name: <input value = {this.state.value} type="text" onChange={this.handleChange}/></label>
        <input type="submit" value="click to submit"/>  
        </form>

      {theResultsPanel}

      </div>
    );
  }

}

export default App;
