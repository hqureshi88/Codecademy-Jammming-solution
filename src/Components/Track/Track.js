import React from 'react';
import './Track.css';

export class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  
  addTrack(){
    this.props.onAdd(this.props.trackInfo);
    console.log(this.props.trackInfo.ID); 
  } // asked to pass this.props.track to this.props.onAdd

  removeTrack(){
    this.props.onRemove(this.props.trackInfo);
  }
  renderAction(){
    if(!this.props.isRemoval) {
      return <button className="Track-action" onClick={this.addTrack}>+</button> 
    } else {
     return <button className="Track-action" onClick={this.removeTrack}>-</button> 
    }
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.trackInfo.Name}</h3>
          <p>{this.props.trackInfo.Artist} | {this.props.trackInfo.Album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
};