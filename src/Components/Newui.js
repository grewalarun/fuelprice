import React, { Component } from "react";
import Card from '../Components/Card';
import axios from "axios";
import { motion } from "framer-motion"
import { Container, Row, Button } from "reactstrap";

import trans from '../image/transport.gif';

class Newui extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            history: [],
            defaultState: "Delhi",
            defaultCity: "New Delhi",
            isLoading: true,
            menustates:false
         }
    }
    componentDidMount() {
        axios({
          method: "GET",
          url:
            "https://newsrain-petrol-diesel-prices-india-v1.p.rapidapi.com/capitals/history",
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host":
              "newsrain-petrol-diesel-prices-india-v1.p.rapidapi.com",
            //        "x-rapidapi-key": "0c3812ba95msh17c9947266672ddp16f018jsn0289a3c20744",
            "x-rapidapi-key": "lKdQUSAHy2mshglBziyg3jEIy3v6p1xbSTQjsnJEewexfRkoSD",
          },
        })
          .then((response) => {
            this.setState({
              cities: response.data.cities,
              history: response.data.history,
              isLoading: false,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }


showStates = (e) => {
e.preventDefault();
!this.state.menustates?
this.setState({
    menustates:true
}):
this.setState({
    menustates:false
})
}
hideStates = (e) => {
e.preventDefault();
this.setState({
    menustates:false
})
}
handleClick = (defState, defCity) => {
    this.setState({
      defaultState: defState,
      defaultCity: defCity,
      menustates:false
    });
  };

    render() { 
        const urcity = this.state.cities.filter(
            (a) =>
              a.state === this.state.defaultState && a.city === this.state.defaultCity
          );
          const allstate = this.state.cities;
          const { isLoading } = this.state;        
          return !isLoading ? (
            urcity.map((u) => (
                 <div className="page-ui">
            {this.state.menustates?(<motion.div initial={{x:-100,opacity:0}} animate={{ x: 0,opacity:1 }} className="menustate">
                <ul className="staeslist">
            {allstate.map((c, i) => (
              <li key={i} onClick={() => this.handleClick(c.state, c.city)}>
                {c.state}
                <span>{c.city}</span>
              </li>
            ))}
          </ul>
          <Button color="info" onClick={this.hideStates}>Close</Button>
            </motion.div>):''}
            <Container>
                <Row className="justify-content-center">
            <div className="stateName"><span>{u.state}</span> <Button color="link" onClick={this.showStates}>Change</Button></div>
<Card data={{fuel:"petrol",rate:u.petrol,yesterday:u.petrol_yesterday}}/>

<Card data={{fuel:"diesel",rate:u.diesel,yesterday:u.diesel_yesterday}}/>

                </Row>
                <p className="text-center mt-4">Updated on {u.date}</p>
<img src={trans} alt="trans" width="100%"/>
            </Container>
           

            
            </div> ))): (
      <div className="loader">Loading</div>
    );
    }
}
 
export default Newui;