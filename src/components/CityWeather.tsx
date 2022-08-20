import React, { Component } from "react";
import { IState as Props, ICity } from "../App";

interface IProps {
    cities: Props["cities"],
    selectedCityName: Props["selectedCityName"],
    handleChangeSelectedCityName: (newSelectedCityName: string) => void
}

class CityWeather extends Component<IProps> {

    getIcon = (weather: string): string => {
        switch (weather) {
            case "Thunderstorm":
                return "fa-cloud-bolt"
            case "Drizzle":
                return "fa-droplet"
            case "Rain":
                return "fa-cloud-rain"
            case "Snow":
                return "fa-snowflake"
            case "Mist":
            case "Smoke":
            case "Haze":
            case "Dust":
            case "Fog":
            case "Sand":
            case "Ash":
            case "Squall":
            case "Tornado":
                return "fa-smog"
            case "Clear":
                return "fa-sun"
            default:
                return "fa-cloud"
        }
    }

    renderSelectedCityWeather = (): JSX.Element => {
        const cities: ICity[] = this.props.cities;
        const selectedCityName: IProps["selectedCityName"] = this.props.selectedCityName

        let selectedCityObj: ICity | undefined = cities.find(city => city.name === selectedCityName)

        if (selectedCityObj && selectedCityObj.days !== undefined) {
            return <>
                <div className="weather-today">
                    <h3 className="weather-today-name">{selectedCityObj.days[0].name}</h3>
                    <div className="weather-today-display">
                        <i className={`weather-today-icon fa-solid ${this.getIcon(selectedCityObj.days[0].weather)}`} />
                        <div className="weather-today-text">
                            <h2 className="weather-today-temperature">{selectedCityObj.days[0].temperature}°</h2>
                            <h3 className="weather-today-weather">{selectedCityObj.days[0].weather}</h3>
                        </div>
                    </div>
                </div>
                <div className="weather-forecast">
                    {selectedCityObj?.days && selectedCityObj.days.filter(day => day.name !== "Today").map((day) => (
                        <div className="weather-forecast-item" key={day.name}>
                            <p className="weather-forecast-name">{day.name.substring(0, 3)}</p>
                            <i className={`weather-forecast-icon fa-solid ${this.getIcon(day.weather)}`} />
                            <h5 className="weather-forecast-temperature">{day.temperature}°</h5>
                        </div>
                    ))}
                </div>
            </>
        }
        return <>
            No Data found
        </>
    };

    render() {
        return (
            <div className="City-Weather">
                {this.renderSelectedCityWeather()}
            </div>
        );
    }

}

export default CityWeather;