import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Link from 'next/link'
// import moment from 'moment';

import { loadData } from '../actions/index'
import {bindActionCreators} from 'redux';

import Map from '../components/map'

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
    // this.sortFunc = this.sortFunc.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.sort !== prevProps.sort) {
      this.props.actions.loadData();
    }
  }


  render() {
    let {countries} = this.props;
    return (
      <div className="index__container" id="index__container" > 
          <div className="row">
              <div className="col-3">
                
              </div>
              <div className="col-9">
                <Map />
              </div>
          </div>
            
          {countries && (
            <pre>
              <code>{JSON.stringify(countries, null, 2)}</code>
            </pre>
          )}
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
