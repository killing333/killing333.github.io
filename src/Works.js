import React from 'react';

class Work extends React.Component {
    render( ) {
        return (
            <li>
                <h3>
                    <a href={this.props.URL}>{this.props.name}</a>
                </h3>
                <p>{this.props.description}</p>
            </li>
        );
    }
}
class Works extends React.Component {
    render( ) {
        var rows = [ ];
        this.props.works.forEach( function( work ) {
            rows.push( <Work key={work.URL} name={work.name} URL={work.URL} description={work.description}/> );
        });
        return (
            <ul>{rows}</ul>
        );
    }
}

export default Works;
