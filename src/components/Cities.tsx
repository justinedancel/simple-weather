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
        const selectedCityName: IProps["selectedCityName"] = this.props.selectedCityName

        return cities.map((city) => (
            <div
                onClick={(e) => this.handleClickCity(e)}
                className={`city-list-item ${city.name === selectedCityName && `selected-city`}`}
                key={city.name}
            >
                {city.name}
            </div>
        ))
    }

    render() {
        return (
            <div className="Cities">
                {this.renderCities()}
            </div>
        );
    }

}

export default Cities;