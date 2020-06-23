
import React, { Component } from 'react';

const ResultsList = (props) => {
    let resultListJSX = null

    if(props.result !== null){

    let titleJSX = <li>{props.results.title}</li>;
    let authorJSX = <li>{props.results.author}</li>;
    let createdJSX = <li>{props.results.created_at}</li>;
    let urlJSX = <li>{props.results.url}</li>;

    resultListJSX = <ul><header>Search Results</header>
    <ul>{titleJSX}</ul>
    <ul>{authorJSX}</ul>
    <ul>{createdJSX}</ul>
    <ul> href={urlJSX}</ul>
    </ul>
    }

    return resultListJSX;
}

class ResultPanel extends Component {

    constructor(props){
        super(props);
    
        this.state= {

        };
      }

    render(){
        console.log(this.props.result);
        return <div>
            <ul><ResultsList results={this.props.result}/></ul>
            
        </div>
    }

}

export default ResultPanel;

