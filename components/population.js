import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
var  d3;
if (process.browser) {
  d3 =  require('d3');
}


//importing styles
import chartCss from '../static/scss/chart.scss'

// Import actions
import * as mapActions from '../actions';

class Population extends React.Component {
  componentWillUnmount() {
  }
  constructor(props){
    super(props);
    this.loadChart = this.loadChart.bind(this);
    this.numFormatter = this.numFormatter.bind(this);
    
    
  }
  numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
  }
  componentDidMount(){
    this.loadChart();

  }
  componentDidUpdate(prevProps) {
    if(prevProps.dataToVisualize != this.props.dataToVisualize){
      this.loadChart();

    }
  }
  loadChart(){
    let {dataToVisualize} = this.props;
    let chartDom = document.getElementById('poulation_chart');
    chartDom.innerHTML = '';
     var chartData = dataToVisualize.map((obj) => {
    var rArr = {
      "Name" : obj.name,
      "Count" : obj.population,
      "region" : obj.region
    }
      return rArr;
    })

    const regions = [...new Set(chartData.reduce((a, c) => [...a, c.region], []))];
    let colors = ["#de5d32","#4a246a","#b9d3c2","#a5b076","#e6c57f","#d8b34c","#c9b2a6"];

    var dataset = {
      "children": chartData
  };
  var that = this;
  
  let width = document.querySelector('#poulation_chart').clientWidth;
  var diameter = width;
  var bubble = d3.pack(dataset)
      .size([diameter, diameter])
      .padding(1.5);

  var svg = d3.select("#poulation_chart")
      .append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

  var nodes = d3.hierarchy(dataset)
      .sum(function(d) { return d.Count; });

  var node = svg.selectAll(".node")
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function(d){
          return  !d.children
      })
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
      });

  node.append("title")
      .text(function(d) {
          return d.data.Name + ": " + that.numFormatter(d.data.Count);
      });

  node.append("circle")
      .attr("r", function(d) {
          return d.r;
      })
      .style("fill", function(d) {
          var getreg = regions.indexOf(d.data.region);
          return colors[getreg];
      });

  node.append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function(d) {
          return  (d.data.Name) ? d.data.Name.substring(0, d.r / 3)  : "";
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function(d){
          return d.r/5;
      })
      .attr("fill", "white");

  node.append("text")
      .attr("dy", "1.3em")
      .style("text-anchor", "middle")
      .text(function(d) {
          return that.numFormatter(d.data.Count);
      })
      .attr("font-size", function(d){
          return d.r/5;
      })
      .attr("fill", "white");

  d3.select(self.frameElement)
      .style("height", diameter + "px");

  }
  render() {
    return (
      <div className="population__container"> 
          <p>Comparison chart - countries population</p>
          <div id="poulation_chart"></div>
        
        <style jsx>{chartCss}</style>
      </div>
    );
  }
}


Population.propTypes = {
  dataToVisualize: PropTypes.any,
};
  
  function mapStateToProps(state) {
    return {
      error : state.error,
      dataToVisualize: state.dataToVisualize
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(
      mapActions, dispatch)}
  }
  
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Population)