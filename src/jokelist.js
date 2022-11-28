import React, { Component } from 'react'
import axios from 'axios';
import "./jokelist.css"
import Joke from './joke';
import { v4 as uuid } from 'uuid';
class JokeList extends Component{
    static defaultProps = {
        maxJoke : 10
    }
    constructor(props){
        super(props);
        this.state = {
            jokes : JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            loading: false,
        };
        this.stjoke = new Set(this.state.jokes.map(j => j.text))
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        if(this.state.jokes.length === 0) this.getJoke();
    }

    async getJoke(){
        try{

        
            let jokes = [];
            while(jokes.length < this.props.maxJoke){
                let jokeres = await axios.get("https://icanhazdadjoke.com/",{
                headers:{Accept:'application/json'}
                })
                let newjoke = jokeres.data.joke
                if(!this.stjoke.has(newjoke)){
                    jokes.push({id:uuid(),jokes: jokeres.data.joke, votes:0})
                }else{
                    console.log("terdapat duplikat")
                    console.log(newjoke)
                }
            }
            this.setState(st => ({
                loading:false,
                jokes:[...st.jokes, ...jokes]
            }),
            ()=>
                window.localStorage.setItem(
                    "jokes",
                    JSON.stringify(this.state.jokes)
                )
            )
            console.log(jokes)
        }catch(e){
            alert(e)
            this.setState({loading:false})
        }
    }

    handleClick(){
        this.setState({loading:true},this.getJoke);
        
    }
    handleVote(id, delta){
        this.setState(st => ({
            jokes: st.jokes.map(j => 
                j.id === id ? {...j, votes: j.votes + delta} : j
            )
        }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    }   
    render() {
        if(this.state.loading){
            return(
                <div className='Jokelist-Spinner'>
                    <i className='far fa-8x fa-laugh fa-spin'/>
                    <h1 className='Jokelist-title'>Loading...</h1>
                </div>
            )
        }
        let jokes = this.state.jokes.sort((a,b)=> b.votes - a.votes);
        return (
            <div className='Jokelist'>
                <div className='Jokelist-sidebar'>
                    <p className='Jokelist-title'><span>Jokes</span> Dad</p>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt='nope'/>
                    <button className='get-more' onClick={this.handleClick}>New Jokes</button>
                </div>
                <div className='Jokelist-jokes'>
                    {jokes.map(jk => 
                        <Joke key={jk.id} 
                        vote={jk.votes} 
                        text={jk.jokes} 
                        upvote={() => this.handleVote(jk.id, 1)} 
                        downvote={() => this.handleVote(jk.id, -1)} 
                        />
                    )}
                </div>
            </div>
        );
    }
}
export default JokeList