import React, { Component } from 'react';
import './App.css';
import ResultPanel from './ResultPanel.js'

class App extends Component {

  //set up variables in constructor
  constructor(props){
    super(props);

    this.state= {
      results: [],
      value: null,
      author: null,
      start: null,
      end: null

    };
  }

  handleSubmit = (e) =>{
    //using this syntax, we no longer need to bind this method explicitly
    e.preventDefault();  
    //make use of the data collected in this form
    //console.log("current search value = " + this.state.value);
    this.fetchData(this.state.value);
    this.setState({
      value: "",
    },
    () => {
      console.log("this.state.value should be cleared. Its value is: " + this.state.value);
    }
    );
  }

  handleSubmit2 = (e) =>{
    //using this syntax, we no longer need to bind this method explicitly
    e.preventDefault();  
    //make use of the data collected in this form
    // console.log("start date = " + this.state.start);
    // console.log("end date = " + this.state.end);
    this.fetchDateSearch(this.state.start, this.state.end);
    this.setState({
      start: "",
      end: ""
    },
    () => {
      console.log("this.state.start should be cleared. Its value is: " + this.state.start);
      console.log("this.state.end should be cleared. Its value is: " + this.state.end);
    }
    );
  }

  handleSubmit3 = (e) =>{
    //using this syntax, we no longer need to bind this method explicitly
    e.preventDefault();  
    //make use of the data collected in this form
    //alert(this.state.value);
    // console.log("current search author = " + this.state.author);
    this.fetchAuthor(this.state.author);
    this.setState({
      author: "",
    },
    () => {
      console.log("this.state.author should be cleared. Its value is: " + this.state.author);
    }
    );
  }

  handleChange = (e) =>{
    //update the state as this textbox's value is changed by the end user via typing
    this.setState({
      value: e.target.value,
    },
    //using console log to show current state from user input
    () =>{ 
      console.log("The state's value is now: " + this.state.value);
    });
  }

  handleChange2 = (e) =>{
    //update the state as this textbox's value is changed by the end user via typing
    this.setState({
      //handle change for start date value
      start: e.target.value, 
    },
    //using console log to show current state from user input
    () =>{ 
      console.log("start = " + this.state.start);
      console.log("end = " + this.state.end);
    });
  }

  handleChange3 = (e) =>{
    //update the state as this textbox's value is changed by the end user via typing
    this.setState({ 
      //handle change for end date value
      end: e.target.value,
    },
   //using console log to show current state from user input
    () =>{ 
      console.log("start = " + this.state.start);
      console.log("end = " + this.state.end);
    });
  }

  handleChange4 = (e) =>{
    //update the state as this textbox's value is changed by the end user via typing
    this.setState({
      author: e.target.value,
    },
    //using console log to show current state from user input
    () =>{ 
      console.log("The state's author is now: " + this.state.author);
    });
  }

  fetchAuthor(input){
    //use fetch funtion and callback to transform the data to the JSON structure
    //console.log("author in state = " + input);

    //setting up url with user input for author search
    let firstPart = "http://hn.algolia.com/api/v1/search?tags=story,author_";
    let fullSearch = firstPart + input;
    //console.log(fullSearch);

    //pass in url per user input
    fetch(fullSearch)
    .then(response => response.json())      //transform the text data to json which comes back as a promise use then() to continue
    .then((results) => {                 // store json data in state
      this.setState({
        results: results.hits,
      },
    ()=> {
      //for checking purposes, use optional second argument ot pass a funtion to see if state changed
      console.log(`the authors ${this.state.results}`);
      console.log(this.state.results[0].title);
      //console.log("results length is " + this.state.theUsers.length);
    });
  });
  }

  fetchData(input){
    //use fetch funtion and callback to transform the data to the JSON structure
    //console.log("input in state = " + input);

    //setting up url with user input for search
    let firstPart = "https://hn.algolia.com/api/v1/search?query=";
    let secondPart = "&tags=story";
    let fullSearch = firstPart + input + secondPart;
    //console.log(fullSearch);

    //pass in url per user input
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

  fetchDateSearch = (start,end) =>{
    //console.log("we are in datasearch fetch with start = " + start + "end = " + end)

    //create function to get timestamp
    function toTimestamp(start){
        var datum = Date.parse(start);
        return datum/1000;
    }
    //create variables to store user input after conversion to timestamps
    let inputStart = toTimestamp(start);
    console.log(toTimestamp(start));
    let inputEnd = toTimestamp(end);
    console.log(toTimestamp(end));

    //create url for search by date using timestamps
    let firstPart = "http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>";
    let secondPart = ",created_at_i<";
    let fullSearch = firstPart + inputStart + secondPart + inputEnd;
    console.log(fullSearch);

    //pass in url per user input
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

    //create the results panels from the user input to be displayed
    let theResultsPanel = [];
    for(let i =0; i < this.state.results.length; i++){
      theResultsPanel.push(<div className="resultsPanel"><ResultPanel key={this.state.results[i]} result={this.state.results[i]}/> </div> )
    }

    return (
      <div className="App">

        {/** create query button and textbox */}
        <form onSubmit={this.handleSubmit} className="formButton">
        {/** within the form element, you will include your various input elements */}
        <label>Query: <input value = {this.state.value} type="text" onChange={this.handleChange}/></label>
        <input type="submit" value="click to submit"/>  
        </form>

        {/** create author button and textbox */}
        <form onSubmit={this.handleSubmit3} className="formButton">
        {/** within the form element, you will include your various input elements */}
        <label>Author Query: <input author = {this.state.author} type="text" onChange={this.handleChange4}/></label>
        <input type="submit" value="click to submit"/>  
        </form>

        {/** create date buttons and textboxes */}
        <form onSubmit={this.handleSubmit2} className="formButton">
        {/** within the form element, you will include your various input elements */}
        <label>Start Date: <input start = {this.state.start} type="text" onChange={this.handleChange2} /></label>
        <label>End Date: <input end = {this.state.end} type="text" onChange={this.handleChange3}/></label>
        <input type="submit" value="click to submit"/>  
        </form>

      {/** show the end results to the user */}
      {theResultsPanel}

      </div>
    );
  }

}

export default App;
