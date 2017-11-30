import React, { Component } from 'react';
import * as API from '../services/API';

export class AddButtonModal extends Component {
  state = {
    display: 'none !important',
    comment: '',
    sounds: [],
    icons: [
      {
        id: 1,
        icon: 'free_breakfast'
      },
      {
        id: 2,
        icon: 'people'
      },
      {
        id: 3,
        icon: 'code'
      },
      {
        id: 4,
        icon: 'local_bar'
      }
    ]
  };

  componentDidMount() {
    API.fetchSounds().then(sounds => {
      this.setState({ sounds });
    });

    this.soundAddButton.value = null;

    if (this.props.isOpen) {
      window.$(this.modalNode).openModal({
        dismissible: false,
      });
    }

    window.$(this.actionAddButton).material_select(this._handleSelectChangeAddButton.bind(this));
    window.$(this.iconAddButton).material_select();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      if (nextProps.isOpen) {
        window.$(this.modalNode).openModal({
          dismissible: false,
        });
      } else {
        this.setState({ comment: '' });
        window.$(this.modalNode).closeModal();
      }
    }
  }

  componentWillUnmount() {
    window.$(this.modalNode).closeModal();
  }

  onSubmit = e => {
    e.preventDefault();

    const img_default = 'http://www.ecpnorthern.co.uk/image/cache/data/incoming/productimages/large/emergency-stop-button-key-reset-195-500x500.jpg';
    let sound = null;

    if(this.soundAddButton.value === "") {
      sound = "no sound";
    }else{
      sound = this.soundAddButton.options[this.soundAddButton.selectedIndex].text;
    }

    const newButton = {
      tag: this.tagButton.value,
      action: this.actionAddButton.options[this.actionAddButton.selectedIndex].text,
      sound: sound,
      value: this.valueButton.value,
      status: "offline",
      icon: this.iconAddButton.options[this.iconAddButton.selectedIndex].text,
      img: this.imgButton.value || img_default
    };

    this.soundAddButton.value = null;
    this.props.onAddButton(newButton);
    this.props.closeCommentModal();
  };

  onCommentChange = e => {
    this.setState({ comment: e.target.value });
  };

  _handleSelectChangeAddButton = () => {
    const val = this.actionAddButton.options[this.actionAddButton.selectedIndex].text;
    if(val === "Play sound") {
      window.$(this.soundAddButton).material_select();
    } else {
      window.$(this.soundAddButton).material_select('destroy');
    }
  };

  render() {
    return (
      <div ref={ref => (this.modalNode = ref)} className="modal modalCustom">
        <div className="modal-content">
          <h4>Nouveau Button :</h4>
          <form className="col s12">
          <div className="input-field col s6">
            <input required placeholder="Saisissez le TAG du button" ref={ref => (this.tagButton = ref)} type="text" className="validate"></input>
            <label htmlFor="tagButton">TAG Button</label>
          </div>
          <div className="input-field col s12">
            <select ref={ref => (this.actionAddButton = ref)}>
              <option value="" disabled>Sélectionnez une action</option>
              <option value="Message Slack">Message Slack</option>
              <option value="Play sound">Play sound</option>
              <option value="Say">Say</option>
            </select>
            <label>Action :</label>
          </div>
          <div className="input-field col s12">
            <select ref={ref => (this.soundAddButton = ref)}>
              <option value="" disabled>Sélectionnez un son</option>
              {this.state.sounds.map(sound => (
                <option key={sound.sound} value={sound.sound}>{sound.sound}</option>
              ))}
            </select>
          </div>
          <div className="input-field col s6">
            <input ref={ref => (this.valueButton = ref)} placeholder="Saisissez une valeur" id="value" type="text" className="validate"></input>
            <label htmlFor="value">Value</label>
          </div>
          <div className="input-field col s12">
            <select ref={ref => (this.iconAddButton = ref)}>
              <option value="" disabled>Sélectionnez une icône</option>
              {this.state.icons.map(icon => (
                <option key={icon.id} value={icon.id}>{icon.icon}</option>
              ))}
            </select>
            <label>Icône :</label>
          </div>
          <div className="input-field col s6">
            <input ref={ref => (this.imgButton = ref)} placeholder="Saisissez une url" id="img" type="text" className="validate"></input>
            <label htmlFor="img">Image</label>
          </div>
          </form>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            style={{ backgroundColor: '#4caf50', color: '#fff' }}
            className="modal-action waves-effect waves-green btn-flat "
            onClick={this.onSubmit}>
            ADD
          </a>
          <a
            href="#!"
            style={{ backgroundColor: '#f44336', color: '#fff', marginRight: 10 }}
            className="modal-action waves-effect waves-green btn-flat "
            onClick={this.props.closeCommentModal}>
            Cancel
          </a>
        </div>
      </div>
    );
  }
}