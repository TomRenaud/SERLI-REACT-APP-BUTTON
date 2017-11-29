import React, { Component } from 'react';

export class Button extends Component {

  onDeleteButton = (e, button) => {
    e.preventDefault();
    this.props.onDeleteButton(button);
  };

  onUpdateButton = (e, button) => {
    e.preventDefault();
    this.props.onUpdateButton(button);
  };

  render() {
    if (!this.props.button) {
      return null;
    }
    return (
      <div className="col s12 m12 l6">
        <h2 style={{ fontFamily: 'Roboto', backgroundColor: '#2196f3 ', width: '100%', color: '#fff', marginBottom: 0}} className="center-align">Button details</h2>
        <div className="card horizontal">
          <div className="card-image">
            <img
              className="responsive-img wine-detail-image"
              alt="Button pic"
              src={this.props.button.img}
            />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <h3>{this.props.button.value}</h3>
              <br />
              <p>
                <b>TAG:</b> {this.props.button.tag}
              </p>
              <p>
                <b>Action:</b> {this.props.button.action}
              </p>
              <p>
                <b>Sound:</b> {this.props.button.sound}
              </p>
              <p>
                <b>Value:</b> {this.props.button.value}
              </p>
              <p>
                <b>Status:</b> {this.props.button.status}
              </p>
            </div>
            <div className="card-action">
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <a onClick={this.props.onBackButton} className="btn-floating btn-large waves-effect waves-light blue"><i className="material-icons">arrow_back</i></a>
                <a onClick={e => this.onDeleteButton(e, this.props.button)} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">delete</i></a>
                <a onClick={e => this.onUpdateButton(e, this.props.button)} className="btn-floating btn-large waves-effect waves-light orange"><i className="material-icons">edit</i></a>
                <a onClick={this.props.onNextButton} className="btn-floating btn-large waves-effect waves-light blue"><i className="material-icons">arrow_forward</i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
