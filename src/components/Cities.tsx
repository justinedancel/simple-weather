import React, { Component } from "react";
import { IState as IProps } from "../App";

class Cities extends Component<IProps> {

    renderCities = (): JSX.Element[] => {
        const { cities } = this.props;

        return cities.map((city) => (
            <li className="city-list-item">
                {city.name}
            </li>
        ))
    }

    render() {
        const { cities } = this.props;

        return (
            <div className="Cities">
                <ul className="city-list">
                    {this.renderCities()}
                </ul>
                <div className="city-weather">
                    <div className="weather-today">
                        {cities[0].days && cities[0].days.filter(day => day.date === "Today").map((day) => (
                            <>
                                <p>{day.date}</p>
                                <p>{day.weather}</p>
                                <p>{day.temperature}°</p>
                            </>
                        ))}
                    </div>
                    <div className="weather-future">
                        {cities[0].days && cities[0].days.filter(day => day.date !== "Today").map((day) => (
                            <div className="weather-future-item">
                                <p>{day.date}</p>
                                <p>{day.weather}</p>
                                <p>{day.temperature}°</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

}

export default Cities;