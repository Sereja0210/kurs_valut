import React from "react";
import ReactDOM from "react-dom";
import { YMaps, Map, Clusterer, Placemark } from "react-yandex-maps";

import POINTS from "./points";

import "./styles.css";

const mapState = {
  center: [55.751574, 37.573856],
  zoom: 5
};

class App extends React.Component {
  state = {
    selectedPoint: null
  };

  onPlacemarkClick = point => () => {
    this.setState({ selectedPoint: point });
  };

  render() {
    const { selectedPoint } = this.state;
    return (
      <div className="App">
        <YMaps>
          <Map defaultState={mapState}>
            <Clusterer
              options={{
                preset: "islands#invertedVioletClusterIcons",
                groupByCoordinates: false
              }}
            >
              {POINTS.map((point, index) => (
                <Placemark
                  key={index}
                  geometry={point.coords}
                  onClick={this.onPlacemarkClick(point)}
                />
              ))}
            </Clusterer>
          </Map>
        </YMaps>
        {selectedPoint && (
          <div>
            <h1>Selected point: {selectedPoint.title}</h1>
            <p>{selectedPoint.descr}</p>
          </div>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
