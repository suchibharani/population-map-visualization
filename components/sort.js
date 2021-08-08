import React from 'react';
import PropTypes from 'prop-types';


const SortCmp = (props) => {
    return (
      <div className="row">
        <div className="col-12">
            <div className="sort">
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <button type="button" onClick={() => props.sortFunc('hot')} className={props.sort == "hot" ? 'btn btn-dark' : 'btn btn-outline-dark'}>hot</button>
                <button type="button" onClick={() => props.sortFunc('new')} className={props.sort == "new" ? 'btn btn-dark' : 'btn btn-outline-dark'}>new</button>
                <button type="button" onClick={() => props.sortFunc('top')} className={props.sort == "top" ? 'btn btn-dark' : 'btn btn-outline-dark'}>top</button>
            </div>
            
            </div>
        </div>
    </div>
    );
};

SortCmp.propTypes = {
    sortFunc: PropTypes.func,
    sort: PropTypes.any
};
export default SortCmp;
