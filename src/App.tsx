import React, { Component } from 'react';
import './App.css';
import Cities from './components/Cities';

export interface IState {
    cities: {
        name: string,
        days?: {
            date: string,
            temperature: number,
            weather: string,
        }[],
    }[]
}

class App extends Component {
  state: IState = {
      cities: [
          {
              name: "Winnipeg",
              days: [
                  {
                      date: "Today",
                      temperature: 19,
                      weather: "Clouds",
                  },
                  {
                      date: "Wed",
                      temperature: 18,
                      weather: "Rainy",
                  },
                  {
                      date: "Thu",
                      temperature: 18,
                      weather: "Rainy",
                  },
                  {
                      date: "Fri",
                      temperature: 19,
                      weather: "Rainy",
                  },
                  {
                      date: "Sat",
                      temperature: 21,
                      weather: "Clouds",
                  }
              ]
          },
          {
              name: "Vancouver",
          },
          {
              name: "Toronto",
          }
      ]
  }

  render() {
      const { cities } = this.state;
      return (
          <div className="App">
              <Cities cities={cities} />
          </div>
      );
  }

}

export default App;
