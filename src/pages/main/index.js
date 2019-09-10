import React, { Component } from "react";
import axios from 'axios';
import './styles.css';

export default class Main extends Component {
    state = {
        deck0: [],
        pile1: [],
        pile2: [],
        pile3: [],
        deck1: [],
        counter: 0,
    };

    componentDidMount() {
        axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=21')
        .then(res => {
            var cards = res.data.cards;
            this.setState({deck0: cards});
            this.loadPiles(this.state.deck0);
        });
        
    }

    loadPiles = (data) => {
        let p1 = [];
        let p2 = [];
        let p3 = [];

        for(let i = 0; i < 19;i+=3){
            p1.push(data[i]);
            this.setState({pile1: p1});
        }
        for(let i = 1; i < 20;i = i+=3){
            p2.push(data[i]);
            this.setState({pile2: p2});
        }
        for(let i = 2; i < 21;i = i+=3){
            p3.push(data[i]);
            this.setState({pile3: p3});
        }
        if(this.state.counter === 3){
            alert("Your card is: " + this.state.deck1[10].value + " of " + this.state.deck1[10].suit);
        }
    }

    giveCards(p1, p2, p3){
        let deck = [];
        var c = (this.state.counter + 1);
        for(let i = 6; i >= 0;i--){
            deck.push(p1[i]);
            
        }
        for(let i = 6; i >= 0;i--){
            deck.push(p2[i]);
            
        }
        for(let i = 6; i >= 0;i--){
            deck.push(p3[i]);
        }
        if(deck[20] !== undefined) {
            this.setState({deck1: deck});
            this.setState({counter: c});
        }
    }

    render() { 
        return (
            <div className="row">
                <div className="column">
                    <ul>{this.state.pile1.map(card => <li><img src = {card.image} alt = ""/></li>)}</ul>
                    <button type = "submit" 
                        onClick ={ () => {
                            this.giveCards(this.state.pile2, this.state.pile1, this.state.pile3);
                     }}>Pile 1</button>
                </div>
                <div className="column">
                    <ul>{this.state.pile2.map(card => <li><img src = {card.image} alt = ""/></li>)}</ul>
                    <button type = "submit" 
                        onClick ={ () => {
                            this.giveCards(this.state.pile1, this.state.pile2, this.state.pile3);
                     }}>Pile 2</button>
                </div>
                <div className="column">
                    <ul>{this.state.pile3.map(card => <li><img src = {card.image} alt = ""/></li>)}</ul>
                    <button type = "submit" 
                        onClick ={ () => {
                            this.giveCards(this.state.pile2, this.state.pile3, this.state.pile1);
                     }}>Pile 3</button>
                </div>
                <button  type = 'submit' 
                    onClick = {() => {
                        this.loadPiles(this.state.deck1)
                }}>Deal cards</button>
            </div>
            
        )
    }
}