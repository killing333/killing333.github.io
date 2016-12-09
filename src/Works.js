import React from 'react';

class Work extends React.Component {
    render( ) {
        return (
            <li id={this.props.id}>
                <a href={this.props.URL} target="_blank">
                    <div className="bg">
                        <div className="overlay"></div>
                    </div>
                    <h3>{this.props.name}</h3>
                    <p>{this.props.description}</p>
                </a>
            </li>
        );
    }
}
class Works extends React.Component {
    render( ) {
        var rows = [ ];
        this.props.works.forEach( function( work ) {
            rows.push( <Work key={work.id} id={work.id} name={work.name} URL={work.URL} description={work.description}/> );
        });
        return (
            <ul>{rows}</ul>
        );
    }
}

export default Works;
