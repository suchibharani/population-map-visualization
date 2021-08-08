import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

//importing styles
import layoutCSS from '../static/scss/layout.scss'

// Import actions
import * as mapActions from '../actions';
class Layout extends React.Component {
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  constructor(props){
    super(props);
    
  }
  render() {
    const { children } = this.props;
    return (
      <div id="app_container"> 
          
        <div className="root">
            { children }
        </div>
        
        <style jsx>{layoutCSS}</style>
      </div>
    );
  }
}


  Layout.propTypes = {
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
  
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Layout)