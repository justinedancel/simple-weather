import React, { Component } from 'react';
import './App.less';
import Cities from './components/Cities';
import CityWeather from './components/CityWeather';

const APIKey = "744ff036ba40afa6f68e609fddac30b8"

const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export interface IState {
    cities: ICity[],
    selectedCityName: string,
}

export interface ICity {
    name: string,
    lat: number,
    lon: number,
    days?: Array<IDay>,
}

export interface IDay {
    name: string,
    temperature: number,
    weather: string,
}

class App extends Component<{}, IState> {
    state: IState = {
        cities: [
            {
                name: "Winnipeg",
                lat: 49.8954,
                lon: -97.1385,
            },
            {
                name: "Vancouver",
                lat: 49.2827,
                lon: -123.1207,
            },
            {
                name: "Toronto",
                lat: 43.6532,
                lon: -79.3832,
            }
        ],
        selectedCityName: "Winnipeg"
    }

    componentDidMount() {
        this.handleGetCityWeather()
    }

    async handleGetCityWeather (): Promise<any> {
        const { cities, selectedCityName } = this.state;

        let selectedCityObj = cities.find(city => city.name === selectedCityName)
        let newDaysArray: Array<IDay> = []

        // Check if the selected city's days array is already populated
        if (selectedCityObj && !selectedCityObj.days) {
            // Query today's weather
            await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedCityObj.lat}&lon=${selectedCityObj.lon}&appid=${APIKey}&units=metric`)
                .then(res => res.json())
                .then(
                    (result) => {
                        let today: IDay = {
                            name: "Today",
                            temperature: Math.round(result.main.temp),
                            weather: result.weather[0].main,
                        }
                        newDaysArray.push(today)
                    },
                    (error) => {
                        console.log(error)
                    }
                )

            // Query forecast for the next 4 days
            await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCityObj.lat}&lon=${selectedCityObj.lon}&appid=${APIKey}&units=metric&cnt=32`)
                .then(res => res.json())
                .then(
                    (result) => {
                        let forecastDays: Array<IDay> = [
                            {
                                name: week[new Date(result.list[3].dt_txt).getDay()],
                                temperature: Math.round(result.list[3].main.temp),
                                weather: result.list[3].weather[0].main,
                            },
                            {
                                name: week[new Date(result.list[11].dt_txt).getDay()],
                                temperature: Math.round(result.list[11].main.temp),
                                weather: result.list[11].weather[0].main,
                            },
                            {
                                name: week[new Date(result.list[19].dt_txt).getDay()],
                                temperature: Math.round(result.list[19].main.temp),
                                weather: result.list[19].weather[0].main,
                            },
                            {
                                name: week[new Date(result.list[27].dt_txt).getDay()],
                                temperature: Math.round(result.list[27].main.temp),
                                weather: result.list[27].weather[0].main,
                            },
                        ]
                        newDaysArray = newDaysArray.concat(forecastDays)
                    },
                    (error) => {
                        console.log(error)
                    }
                )

            if (selectedCityObj !== undefined) {
                selectedCityObj.days = newDaysArray
            }

            let newCitiesArray: Array<ICity> = cities.map((city) => {
                if (city.name === selectedCityName) {
                    city.days = newDaysArray
                }
                return city
            })

            this.setState({
                cities: newCitiesArray
            })
        }
    }

    handleChangeSelectedCityName = (newSelectedCityName: string): void => {
        this.setState({
            selectedCityName: newSelectedCityName
        }, () => this.handleGetCityWeather())
    }

    render() {
        const { cities, selectedCityName } = this.state;

        return (
            <div className="App">
                <Cities cities={cities} selectedCityName={selectedCityName} handleChangeSelectedCityName={this.handleChangeSelectedCityName} />
                <CityWeather cities={cities} selectedCityName={selectedCityName} handleChangeSelectedCityName={this.handleChangeSelectedCityName} />
            </div>
        );
    }

}

export default App;
