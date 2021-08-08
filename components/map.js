import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Loader } from '@googlemaps/js-api-loader';

//import config
import { mapStyle } from '../config/MapConfig'

//importing styles
import mapCss from '../static/scss/map.scss'

// Import actions
import * as mapActions from '../actions';
var map,bounds;

class Map extends React.Component {
  componentWillUnmount() {
  }
  constructor(props){
    super(props);
    this.loadMap = this.loadMap.bind(this);
    
  }
  componentDidMount(){
    this.loadMap();

  }
  loadMap(){
    const loader = new Loader({
      apiKey: "AIzaSyBaiaoFU5qdbf5hYGKMRhotERNJDLrgHzQ",
      version: "weekly",
      libraries: ["places"]
    });
  //   {
  //     center: centerPos,
  //     zoom: zoomlevel,
  //     mapTypeId: 'roadmap',
  //     styles: mapStyle,
  //     mapTypeControl: false,
  //     draggable: true,
  //     panControl: false,
  //     streetViewControl: false,
  //     scrollwheel: true,
  //     disableDefaultUI: false,
  //     disableDoubleClickZoom: true,
  //     gestureHandling: 'greedy',
  //     fullscreenControl: false,
  //     backgroundColor : '#000000',
  //     zoomControlOptions: {
  //         position: google.maps.ControlPosition.LEFT_BOTTOM
  //     },
  // }
    
    loader
    .load()
    .then((google) => {
      bounds = new google.maps.LatLngBounds();
      map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 2,
        styles: mapStyle,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        panControl: false,
        draggable: true,
        disableDefaultUI: false,
        streetViewControl: false,
        disableDoubleClickZoom: true,
        gestureHandling: 'greedy',
        fullscreenControl: false,
        backgroundColor : '#dfd2ae',
        zoomControlOptions: {
            // position: google.maps.ControlPosition.LEFT_BOTTOM
        },
      });
      console.warn(map, bounds)
    })
    .catch(e => {
      // do something
      console.error(e)
    });

  }
  render() {
    return (
      <div className="map_container"> 
          <div id="map"></div>
        
        
        <style jsx>{mapCss}</style>
      </div>
    );
  }
}


  Map.propTypes = {
    children: PropTypes.any,
  };
  
  function mapStateToProps(state) {
    return {
      error : state.error,
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(
      mapActions, dispatch)}
  }
  
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Map)