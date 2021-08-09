import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Select from 'react-select'

// import Link from 'next/link'
// import moment from 'moment';

import { loadData } from '../actions/index'
import {bindActionCreators} from 'redux';

import Map from '../components/map'
import Population from '../components/population'

//importing styles
import styleSheet from '../static/scss/styles.scss'

// Import actions
import * as mapActions from '../actions';
class Index extends React.Component {
  static async getInitialProps(props) {
    const { store, isServer } = props.ctx

    if (!store.getState().countries.length > 0) {
      store.dispatch(loadData())
    }

    return { isServer }
  }
  constructor(props) {
    super(props);
    this.getOptions = this.getOptions.bind(this);
    this.state = {
      selectedCountries : [],
      selectOptions : []
    }
  }

  componentDidUpdate(prevProps,prevState) {
   console.warn(prevProps)
   if(prevState.selectedCountries != this.state.selectedCountries){
     var e = this.state.selectedCountries;
    let {countries} = this.props;
    if(e && e.length > 0){
      const filteredCountries = countries.filter(o => e.find(o2 => o.name === o2.label));
      this.props.actions.updateData(filteredCountries);
    }
  }
  }
  componentDidMount(){
    this.getOptions();
  }
  getOptions(){
    var {countries} = this.props;
    const options = countries.map(d => ({
      "value" : d.name,
      "label" : d.name

    }))
    
    this.setState({selectOptions: options})
  }
  handleChange(e){
    this.setState({selectedCountries:e})
  }
  filterOption(inputValue){
    if(inputValue == ""){
      return;
    }
   let {countries} = this.props;
    const filteredCountries = countries.filter(x => x.name.toLowerCase().includes(inputValue.toLowerCase())); 
    this.props.actions.updateData(filteredCountries);
  }
  
  render() {
    let {selectOptions} = this.state;
    return (
      <div className="index__container container-fluid" id="index__container" > 
          
          <div className="row">
              <div className="col-md-5 col-12">
              <div className="search">
                  <h4>Search country here</h4>
                    <Select 
                    options={selectOptions} 
                    isMulti="true"
                    isSearchable="true"
                    name="selectedCountries"
                    onInputChange={this.filterOption.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    />  
                  </div>
                  <Population />
                  
              </div>
              <div className="col-md-7 col-12">
                  <Map />
                  
              </div>
          </div>
          <style jsx>{styleSheet}</style>
      </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    countries : state.countries,
    sort : state.sort,
    isLoading: state.isLoading
  }
}


function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(
    mapActions, dispatch)}
}

Index.propTypes = {
  countries: PropTypes.any,
  actions: PropTypes.any,
  sort: PropTypes.any,
  isLoading: PropTypes.any
};

export default connect(mapStateToProps,mapDispatchToProps)(Index)
