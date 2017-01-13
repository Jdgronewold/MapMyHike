import React from 'react';
import StaticMap from './static_map.jsx';
import { withRouter, Link } from 'react-router';

class HikeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    this.props.fetchHikes();
  }

  handleCreate() {
    this.props.router.push("/hikes/create");
  }

  render() {

    const hikes = Object.keys(this.props.hikes).map( id => this.props.hikes[id]);
    const indexItems = hikes.map( (hike, idx) => {
      return (
        <Link to={`hikes/${hike.id}`} key={idx}>
          <li className="index-items">
            <StaticMap hikePath={this.props.hikes[ hike.id ].routePath} />
            <div className="static-overlay">{this.props.hikes[ hike.id ].title}</div>
          </li>
        </Link>
      );
    });


    return (
      <div>
        <h2>My Routes</h2>
        <div className="index-container">
          <div className="index-left">
            <div>
              <button onClick={this.handleCreate}> Create New </button>
            </div>
            <ul className="index-ul">
              { indexItems }
            </ul>
        </div>
          <div className="index-detail">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HikeIndex);
