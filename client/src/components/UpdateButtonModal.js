import React, { Component } from 'react';

export class UpdateButtonModal extends Component {
  state = {
    comment: '',
    currentButton: null,
    currentButtonTag: null,
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
    if (this.props.isOpen) {
      window.$(this.modalNode).openModal({
        dismissible: false,
      });
    }

    window.$(this.actionUpdateButton).material_select(this._handleSelectChangeUpdateButton.bind(this));
    window.$(this.iconUpdateButton).material_select();

    this.soundUpdateButton.value = null;
    this.iconUpdateButton.value = 0;
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

    if (nextProps.button !== this.props.button && nextProps.button) {
      this.setState({
        currentButtonTag : nextProps.button.tag,
        currentButtonAction : nextProps.button.action,
        currentButtonIcon : nextProps.button.icon
      });
      window.$(this.actionUpdateButton).val(nextProps.button.action);
      window.$(this.actionUpdateButton).material_select(this._handleSelectChangeUpdateButton.bind(this));
      if(nextProps.button.action === "Play sound"){
          window.$(this.soundUpdateButton).material_select();
          window.$(this.soundUpdateButton).val(nextProps.button.sound);
          window.$(this.soundUpdateButton).material_select();
      }
      this.tagButton.value = nextProps.button.tag;
      this.valueButton.value = nextProps.button.value;
      this.imgButton.value = nextProps.button.img;
    }
  }

  componentWillUnmount() {
    window.$(this.modalNode).closeModal();
  }

  onSubmit = e => {
    e.preventDefault();

    const indexCurrentButton = this.props.buttons.indexOf(this.props.button);
    const tag = this.state.currentButtonTag;
    const img_default = 'http://www.ecpnorthern.co.uk/image/cache/data/incoming/productimages/large/emergency-stop-button-key-reset-195-500x500.jpg';
    let sound = null;

    if(this.soundUpdateButton.value === ""){
      sound = "no sound";
    }else{
      sound = this.soundUpdateButton.value;
    }

    const newButton = {
      tag: this.tagButton.value,
      action: this.actionUpdateButton.value || this.state.currentButtonAction,
      sound: sound,
      value: this.valueButton.value,
      status: "offline",
      icon: this.iconUpdateButton.options[this.iconUpdateButton.selectedIndex].text || this.state.currentButtonIcon,
      img: this.imgButton.value || img_default
    };

    this.soundUpdateButton.value = null;
    this.props.onUpdateButtonSubmit(tag, indexCurrentButton, newButton);
    this.props.closeUpdateButtonModal();
  };

  onCommentChange = e => {
    this.setState({ comment: e.target.value });
  };

  _handleSelectChangeUpdateButton = e => {
    const val = this.actionUpdateButton.value;

    if(val === "Play sound") {
      window.$(this.soundUpdateButton).material_select();
    } else {
      window.$(this.soundUpdateButton).val("");
      window.$(this.soundUpdateButton).material_select('destroy');
    }
  };

  render() {
    return (
      <div ref={ref => (this.modalNode = ref)} className="modal modalCustom">
        <div className="modal-content">
          <h4>Modifier le Button :</h4>
          <form className="col s12">
          <div className="input-field col s6">
            <input required placeholder="Saisissez le TAG du button" ref={ref => (this.tagButton = ref)} type="text" className="validate"></input>
            <label htmlFor="tagButton">TAG Button</label>
          </div>
          <div className="input-field col s12">
            <select ref={ref => (this.actionUpdateButton = ref)}>
              <option value="" disabled>Sélectionnez une action</option>
              <option value="Message Slack">Message Slack</option>
              <option value="Play sound">Play sound</option>
              <option value="Say">Say</option>
            </select>
            <label>Action :</label>
          </div>
          <div className="input-field col s12">
            <select ref={ref => (this.soundUpdateButton = ref)}>
              <option value="" disabled>Sélectionnez un son</option>
              {this.props.sounds.map(sound => (
                <option key={sound.hits} value={sound.sound}>{sound.sound}</option>
              ))}
            </select>
          </div>
          <div className="input-field col s6">
            <input ref={ref => (this.valueButton = ref)} placeholder="Saisissez une valeur" id="value" type="text" className="validate"></input>
            <label htmlFor="value">Value</label>
          </div>
          <div className="input-field col s12">
            <select value={this.state.currentButtonIcon} ref={ref => (this.iconUpdateButton = ref)}>
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
            SAVE
          </a>
          <a
            href="#!"
            style={{ backgroundColor: '#f44336', color: '#fff', marginRight: 10 }}
            className="modal-action waves-effect waves-green btn-flat "
            onClick={this.props.closeUpdateButtonModal}>
            Cancel
          </a>
        </div>
      </div>
    );
  }
}
