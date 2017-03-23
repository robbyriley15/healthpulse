import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class AthleteSelect extends React.Component {
   render() {
     this.paths = [];
     this.paths[0] = './resources/robby.png';
     this.athletes = [];
     this.athletes.push({
       path: './resources/robby.png',
       name: "Robby Riley"
     })
      return (
         <div>
            <AthleteCard athlete={this.athletes[0]}/>
         </div>
      );
   }
}

class AthleteCard extends React.Component {
  render() {
      return (
         <div className="card">
            <img className="image" src={this.props.athlete.path} />
            <span>{this.props.athlete.name}</span>
         </div>
      )
   }
}

ReactDOM.render(<AthleteSelect/>, document.getElementById("selecter"));