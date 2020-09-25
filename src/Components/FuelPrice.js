import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col} from "reactstrap";

class FuelPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      history: [],
      defaultState: "Delhi",
      defaultCity: "New Delhi",
      isLoading: true,
    };
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

  handleClick = (defState, defCity) => {
    this.setState({
      defaultState: defState,
      defaultCity: defCity,
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
        <Container>
          <Row>
            <Col lg="12">
              <div className="priceHeader">
                <h2>
                  {u.state}/<small>{u.city}</small>
                </h2>
                <div className="updated">{u.date}</div>
              </div>
            </Col>
            <Col xs="6">
              <div className="pricebox ptr">
                <div className="h1">Petrol</div>
                <h4>{u.petrol}</h4>
                {u.petrol === u.petrol_yesterday ? (
                  <span className="nut">No change from yesterday</span>
                ) : u.petrol > u.petrol_yesterday ? (
                  <span className="up">
                    {(u.petrol - u.petrol_yesterday).toFixed(2)}
                  </span>
                ) : (
                  <span className="down">
                    {(u.petrol_yesterday - u.petrol).toFixed(2)}
                  </span>
                )}
              </div>
            </Col>
            <Col xs="6">
              <div className="pricebox dsl">
                <div className="h1">Diesel</div>
                <h4>{u.diesel}</h4>
                {u.petrol === u.petrol_yesterday ? (
                  <span className="nut">No change from yesterday</span>
                ) : u.diesel > u.diesel_yesterday ? (
                  <span className="up">
                    {(u.diesel - u.diesel_yesterday).toFixed(2)}
                  </span>
                ) : (
                  <span className="down">
                    {(u.diesel_yesterday - u.diesel).toFixed(2)}
                  </span>
                )}
              </div>
            </Col>
          </Row>
          <h2 className="heading2">Check Your State Fuels Price</h2>
          <ul className="staeslist">
            {allstate.map((c, i) => (
              <li key={i} onClick={() => this.handleClick(c.state, c.city)}>
                {c.state}
                <span>{c.city}</span>
              </li>
            ))}
          </ul>
        </Container>
      ))
    ) : (
      <div className="loader">Loading</div>
    );
  }
}

export default FuelPrice;