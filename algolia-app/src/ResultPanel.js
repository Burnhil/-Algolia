
import React, { Component } from 'react';

const ResultsList = (props) => {
    //create the result list JSX to be returned 
    let resultListJSX = null

    //check to see if props is null
    if(props.result !== null){

    //create each JSX 
    let titleJSX = <li>{`Title: ${props.results.title}`}</li>;
    let authorJSX = <li>{`Author: ${props.results.author}`}</li>;
    let createdJSX = <li>{`Published Date: ${props.results.created_at}`}</li>;
    let urlJSX = <li>{`URL: ${props.results.url}`}</li>;

    //combine JSX
    resultListJSX = <ul><header className="formButton">Article Results</header>
    <ul>{titleJSX}</ul>
    <ul>{authorJSX}</ul>
    <ul>{createdJSX}</ul>
    <ul> {urlJSX}</ul>
    </ul>
    }

    //return JSX
    return resultListJSX;
}

class ResultPanel extends Component {

    //create constructor incase state is needed for each panel
    constructor(props){
        super(props);
    
        this.state= {

        };
      }
      //return results back to app.js
    render(){
        console.log(this.props.result);
        return <div>
            <ul><ResultsList results={this.props.result}/></ul>
            
        </div>
    }

}

export default ResultPanel;

