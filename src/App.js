import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

import { Cards, Charts, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import coronImage from './images/image.png';

class App extends React.Component {
    //a state to push data to components

    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country });

    }

    render() {
        //deconstruct before passing to the cards componentt
        const { data, country } = this.state;
        return (

            <div className={styles.container}>
                <img className={styles.image} src={coronImage} alt="COVID-19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Charts data={data} country={country} />
            </div>
        );
    }
}

export default App;