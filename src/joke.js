import React, { Component } from 'react'
import "./joke.css"
class Joke extends Component{
    getColor(){
        if(this.props.vote >= 15){
            return "#3B185F"
        }else if(this.props.vote >=12){
            return "#22A39F"
        }else if(this.props.vote >= 9){
            return "#6ECCAF"
        }else if(this.props.vote >= 6){
            return "#ADE792"
        }else if(this.props.vote >= 3){
            return "#FFE15D"
        }else if(this.props.vote >=0){
            return "#F49D1A"
        }else{
            return "#DC3535"
        }
    } 
    getEmoji(){
        if(this.props.vote >= 15){
            return "em em-rolling_on_the_floor_laughing"
        }else if(this.props.vote >=12){
            return "em em-laughing"
        }else if(this.props.vote >= 9){
            return "em em-smiley"
        }else if(this.props.vote >= 6){
            return "em em-slightly_smiling_face"
        }else if(this.props.vote >= 3){
            return "em em-face_with_raised_eyebrow"
        }else if(this.props.vote >=0){
            return "em em-confused"
        }else{
            return "em em-angry"
        }
        
    }
    // 
    // 
    // 
    // 
    // 
    // 
    render() {
        return (
             <div className='Joke'>
                <div className='Joke-Btn'>
                    <i className='fas fa-arrow-up' onClick={this.props.upvote}></i>
                    <span className='Vote' style={{borderColor:this.getColor()}}>{this.props.vote}</span>
                    <i className='fas fa-arrow-down' onClick={this.props.downvote}></i>
                </div>
                <div className='Joke-text'>
                    {this.props.text}
                </div>
                <div className='joke-smile'>
                <i className={this.getEmoji()}aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
                </div>
             </div>
        );
    }
}
export default Joke