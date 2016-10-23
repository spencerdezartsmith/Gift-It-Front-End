import React, { Component } from 'react';
import axios from 'axios';
import { View, ART, Dimensions, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native';
import { Container } from './common';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max, ticks } from 'd3-array';
import { line } from 'd3-shape';
import { path } from 'd3-path';
import Svg, {
  G,
  Line,
  Path,
  Rect,
  Text
} from 'react-native-svg'

class Graph extends Component {

  render() {
    return (
      <View>
        <Container>
          <Text>
            Graph Land!!!
          </Text>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 10
  },
  cardStyle: {
    shadowColor: '#000000',
    borderColor: 'white'
  },
  imageStyle: {
    flex: 1,
    width: 350,
    height: 300,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

class BarChart extends Component {

  state = {
    data: [
      {
        amount: 0,
        team: 'Packers',
        teamColor: '#0e7f31',
        barColor: '#ff60bd'
      },
      {
        amount: 0,
        team: '49ers',
        teamColor: '#dba71a',
        barColor: 'pink'
      }
    ]}

    componentWillMount() {
      axios.get('http://localhost:3000/totals')
        .then(response => {
          this.state.data[0].frequency = response.data[0],
          this.forceUpdate(),
          this.state.data[1].frequency = response.data[1],
          this.forceUpdate()
        });
    }

  render() {

    const screen = Dimensions.get('window')
    const margin = {top: 20, right: 25, bottom: 250, left: 25}
    const width = screen.width - margin.left - margin.right
    const height = screen.height - margin.top - margin.bottom
    const x = scaleBand()
      .rangeRound([0, width])
      .padding(0.17)
      .domain(this.state.data.map(d => d.team))

    const maxFrequency = max(this.state.data, d => d.frequency)
    const y = scaleLinear()
      .rangeRound([height, 0])
      .domain([0, maxFrequency])

    //plugged into x to determine start point of bands
    const firstTeamX = x(this.state.data[0].team)
    const secondTeamX = x(this.state.data[1].team)
    const lastTeamX = x(this.state.data[this.state.data.length - 1].team)
    const labelDx = (secondTeamX - firstTeamX) / 2

    const bottomAxis = [firstTeamX - labelDx, lastTeamX + labelDx -24]
    const bottomAxisD = line()
      .x(d => d + labelDx)
      .y(() => 0)
      (bottomAxis)

    const leftAxis = ticks(0, maxFrequency, 5)
    const leftAxisD = line()
      .x(() => bottomAxis[0] + labelDx)
      .y(d => y(d) - (height -1))
      (leftAxis)

    const notch = 10
    const labelDistance = 10
  }
}



export default Graph;
