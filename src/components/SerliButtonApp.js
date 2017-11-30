import React, { Component } from 'react';
import { AddButtonModal, UpdateButtonModal, ButtonList, Button } from '.';
import * as API from '../services/API';

export class SerliButtonApp extends Component {
  state = {
    updateButtonModalOpen: false,
    commentModalOpen: false,
    regions: [],
    selectedRegion: null,
    wines: [],
    selectedWine: null,
    buttons: []
  };

  componentDidMount() {
    API.fetchButtons().then(buttons => {
      this.setState(
        {
          buttons,
          selectedButton: buttons[0]
        });
    });
  };

  closeCommentModal = () => {
    this.setState({ commentModalOpen: false });
  };

  closeUpdateButtonModal = () => {
    this.setState({ updateButtonModalOpen: false });
  };

  openCommentModal = () => {
    this.setState({ commentModalOpen: true });
  };

  openUpdateButtonModal = () => {
    this.setState({ updateButtonModalOpen: true });
  };

  onSelectButton = button => {
      let index = this.state.buttons.findIndex(x => x === button);
      this.setState({ selectedButton:  this.state.buttons[index] });
  };

  onNextButton = () => {
    let index = this.state.buttons.findIndex(x => x === this.state.selectedButton);
    if(index + 1 < this.state.buttons.length){
        this.setState({ selectedButton:  this.state.buttons[index + 1] });
    }else{
      this.setState({ selectedButton:  this.state.buttons[0] });
    }
  };

  onBackButton = () => {
    let index = this.state.buttons.findIndex(x => x === this.state.selectedButton);
    let indexFinal = this.state.buttons.length;

    if(index === 0){
        this.setState({ selectedButton:  this.state.buttons[indexFinal - 1] });
    }else{
      this.setState({ selectedButton:  this.state.buttons[index - 1] });
    }
  };

  onAddButton = (button) => {
    API.addButton(button);
    this.setState({ buttons: [...this.state.buttons, button] });
    this.setState({ selectedButton:  button });
  };

  removeItem(index) {
    this.setState({
      buttons: this.state.buttons.filter((_, i) => i !== index)
    });
  };

  onDeleteButton = (button) => {
    const indexButton = this.state.buttons.indexOf(button);
    API.deleteButton(button.tag);
    this.removeItem(indexButton);
    if(indexButton !== 0){
      this.setState({ selectedButton:  this.state.buttons[indexButton - 1] });
    }else{
      this.setState({ selectedButton:  null });
    }
  };

  onUpdateButton = (button) => {
    this.openUpdateButtonModal();
    this.setState({ selectedButton : button });
  };

  onUpdateButtonSubmit = (tag,index,button) => {
    API.updateButton(tag,button).then(() => {
      API.fetchButtons().then(buttons => {
        this.setState({ buttons , selectedButton : buttons[index] });
      });
    });
  };

  render() {
    return (
      <div style={{ width: '100%' }}>
        <h1 style={{ fontFamily: 'Roboto', backgroundColor: '#2196f3', width: '100%', color: '#fff', marginTop: 0 }} className="center-align">Serli Button</h1>
        <div className="row">
          <ButtonList
            onSelectButton={this.onSelectButton}
            buttons={this.state.buttons}
            button={this.state.selectedButton}
            openCommentModal={this.openCommentModal}
          />

          <Button
            button={this.state.selectedButton}
            openCommentModal={this.openCommentModal}
            openUpdateButtonModal={this.openUpdateButtonModal}
            onNextButton={this.onNextButton}
            onBackButton={this.onBackButton}
            onDeleteButton={this.onDeleteButton}
            onUpdateButton={this.onUpdateButton}
          />

          <AddButtonModal
            onAddButton={this.onAddButton}
            isOpen={this.state.commentModalOpen}
            closeCommentModal={this.closeCommentModal}
          />

          <UpdateButtonModal
            buttons={this.state.buttons}
            button={this.state.selectedButton}
            onUpdateButtonSubmit={this.onUpdateButtonSubmit}
            isOpen={this.state.updateButtonModalOpen}
            closeUpdateButtonModal={this.closeUpdateButtonModal}
          />
        </div>
      </div>
    );
  }
}
