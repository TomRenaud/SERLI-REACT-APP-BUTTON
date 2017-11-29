import React, { Component } from 'react';

export class AddMessageFloating extends Component {

  render() {
    return (
      <div>
        <div className="fixed-action-btn vertical click-to-toggle">
          <a className="btn-floating btn-large red">
            <i className="material-icons">menu</i>
          </a>
          <ul>
            <li><a className="btn-floating green" onClick={this.props.openCommentModal}><i className="material-icons">add</i></a></li>
            <li><a className="btn-floating yellow darken-1"><i className="material-icons">edit</i></a></li>
            <li><a className="btn-floating red"><i className="material-icons">delete</i></a></li>
          </ul>
        </div>
      </div>
    );
  }
}
