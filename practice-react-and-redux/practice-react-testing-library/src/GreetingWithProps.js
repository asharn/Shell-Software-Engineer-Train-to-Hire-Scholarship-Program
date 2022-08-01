import * as React from 'react';

const GreetingWithProps = (props) => {
    return (
        <h1>
            {props.name ? ('Welcome back ' + props.name + '!') : ('Welcome!')}
        </h1>
    );
}

export default GreetingWithProps;