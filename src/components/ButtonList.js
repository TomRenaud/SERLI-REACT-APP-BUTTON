import React, { Component } from 'react';

export class ButtonList extends Component {

  onSelectButton = (e, button) => {
    e.preventDefault();
    this.props.onSelectButton(button);
  };

  render() {
    return (
      <div className="col s12 m6 l3">
        <h2 style={{ fontFamily: 'Roboto', backgroundColor: '#2196f3', width: '100%', color: '#fff', marginBottom: 0}} className="center-align">Buttons</h2>
        <div className="collection">
          {
            this.props.buttons.map(button => (
              <a
                key={button.tag}
                href="#!"
                onClick={e => this.onSelectButton(e, button)}
                className={['collection-item', button === this.props.button ? 'active' : ''].join(
                  ' '
                )}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <i className="material-icons">{button.icon}</i>{button.value}
                </div>
              </a>
            ))
          }
        </div>
        <a onClick={this.props.openCommentModal} style={{ float: 'right' }} className="btn-floating btn-large waves-effect waves-light green"><i className="material-icons">add</i></a>
      </div>
    );
  }

}
