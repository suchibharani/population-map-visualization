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
var map;

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
  componentDidUpdate(prevProps) {
    if(prevProps.dataToVisualize != this.props.dataToVisualize){
      this.loadMap();

    }
  }

  loadMap(){
    let {dataToVisualize} = this.props;
    const loader = new Loader({
      apiKey: "AIzaSyBaiaoFU5qdbf5hYGKMRhotERNJDLrgHzQ",
      version: "weekly",
      libraries: ["places"]
    });
    
    loader
    .load()
    .then((google) => {
      // bounds = new google.maps.LatLngBounds();
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
      map.setOptions({ minZoom: 2, maxZoom: 6 });
      if(dataToVisualize && dataToVisualize.length > 0){
        dataToVisualize.forEach(function(country){
            var conName = country.name;
            var markerIcon = (country.flag && country.flag!='') ? country.flag :'/static/img/placeholder.png'+'?iso_code='+country.alpha2Code
            var image = {
              url: markerIcon,
              // This marker is 20 pixels wide by 32 pixels high.
              scaledSize: new google.maps.Size(25, 25),
              // The origin for this image is (0, 0).
              origin: new google.maps.Point(0, 0),
              // The anchor for this image is the base of the flagpole at (0, 32).
              anchor: new google.maps.Point(25, 25),
              labelOrigin : new google.maps.Point(10, 35),
            };
            let marker = new google.maps.Marker({
              map : map,
              position : new google.maps.LatLng(parseFloat(country.latlng[0]),parseFloat(country.latlng[1])),
              icon : image,
              Title : country.iso_code,
              label : { text : conName , fontSize : "12px", fontWeight: "500", color : "#411262"},
              // url : "/?isoCode=" +country.iso_code
            });
            const contentString =
              '<div id="content">' +
              '<p> <b class="country_name">' + conName + '</b><br> Population : '+ country.population +'<br> Region : ' + country.region +'</p>'
              "</div>";
          
            const infowindow = new google.maps.InfoWindow({
              content: contentString,
            });
            marker.addListener("click", () => {
              infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
              });
            });
            // console.warn(markers);
        });
      }
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
  
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Map)