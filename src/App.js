import React from "react";
import MapView from "./components/Map/MapView";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col } from "react-bootstrap";

// import ReactDOM from 'react-dom';
// import App from './App';

import { Cards, Charts, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";

import coronImage from "./images/images.jpg";

class App extends React.Component {
  //a state to push data to components

  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  };

  render() {
    //deconstruct before passing to the cards componentt
    const { data, country } = this.state;
    return (
      <Container fluid className={styles.containerfluid}>
        <Row>
          <Col sm={12} md={6} className={styles.charts}>
            <MapView dataAllCountries={data} />
          </Col>
          <Col sm={12} md={6}>
            <img className={styles.image} src={coronImage} alt="COVID-19" />
            <Cards data={data} />
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <Charts data={data} country={country} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
