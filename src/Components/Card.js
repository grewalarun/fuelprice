import React from 'react';

const Card = (props) => {
    return(
        <div className={"card "+props.data.fuel}>
            <div className="card-header">{props.data.fuel}</div>
    <div className="card-body">&#8377;  <span className="largetext">{props.data.rate}</span>  <i>per ltr.</i></div>
        <div className="card-footer">{props.data.rate === props.data.yesterday ? (
                  <span className="nut">No change from yesterday</span>
                ) : props.data.rate > props.data.yesterday ? (
                  <span className="up">
                    {(props.data.rate - props.data.yesterday).toFixed(2)}
                  </span>
                ) : (
                  <span className="down">
                    {(props.data.yesterday - props.data.rate).toFixed(2)}
                  </span>)}</div>
        </div>
    )
}
export default Card;