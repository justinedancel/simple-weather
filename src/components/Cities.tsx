import React, { Component } from "react";
import { IState as Props, ICity } from "../App";

interface IProps {
    cities: Props["cities"],
    selectedCityName: Props["selectedCityName"],
    handleChangeSelectedCityName: (newSelectedCityName: string) => void
}

class Cities extends Component<IProps> {

    handleClickCity = (e: any): void => {
        const newCitySelected: string = e.target.textContent
        this.props.handleChangeSelectedCityName(newCitySelected)
    }

    renderCities = (): JSX.Element[] => {
        const cities: ICity[] = this.props.cities;

        return cities.map((city) => (
            <button
                onClick={(e) => this.handleClickCity(e)}
                className="city-list-item"
                key={city.name}
            >
                {city.name}
            </button>
        ))
    }

    renderSelectedCityWeather = (): JSX.Element => {
        const cities: ICity[] = this.props.cities;
        const selectedCityName: IProps["selectedCityName"] = this.props.selectedCityName

        let selectedCityObj: ICity | undefined = cities.find(city => city.name === selectedCityName)

        if (selectedCityObj && selectedCityObj.days !== undefined) {
            return <>
                <div className="weather-today">
                    <p>{selectedCityObj?.days[0].name}</p>
                    <p>{selectedCityObj?.days[0].weather}</p>
                    <p>{selectedCityObj?.days[0].temperature}°C</p>
                </div>
                <div className="weather-future">
                    {selectedCityObj?.days && selectedCityObj.days.filter(day => day.name !== "Today").map((day) => (
                        <div className="weather-future-item" key={day.name}>
                            <p>{day.name}</p>
                            <p>{day.weather}</p>
                            <p>{day.temperature}°C</p>
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
            <div className="Cities">
                <div className="city-list">
                    {this.renderCities()}
                </div>
                <div className="city-weather">
                    {this.renderSelectedCityWeather()}
                </div>
            </div>
        );
    }

}

export default Cities;