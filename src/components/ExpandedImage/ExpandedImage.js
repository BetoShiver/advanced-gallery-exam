import React from 'react';
import FontAwesome from 'react-fontawesome';
import Modal from 'react-modal';
import './ExpandedImage.scss';

class ExpandedImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.ModalIsOpen}
        onRequestClose={() => this.props.closeModal()}
        appElement={document.getElementById('app')}
        style={{
          content: {
            padding: 0,
            margin: 'auto',
            width: this.props.expandedSize + 'px',
            height: this.props.expandedSize + 'px',
            borderRadius: this.props.shape,
          }
        }}
      >
        <div
          className="image-root"
          style={{
            transform: `rotate(${this.props.currentDegrees}deg)`,
            backgroundImage: `url(${this.props.urlFromDto(this.props.dto)})`,
            width: '100%',
            height: '100%',
            backgroundColor: this.props.blendColor,
            backgroundBlendMode: 'screen',
            borderRadius: this.props.shape,
            border: this.props.border
          }}
        >
          <div
            style={{
              transform: `rotate(${360 - this.props.currentDegrees}deg)`,
              cursor: 'pointer'
            }}
          >
            <FontAwesome
              onClick={() => this.props.handleRotate()}
              className="image-icon"
              name="sync-alt"
              title="rotate"
            />
            <FontAwesome
              onClick={() => this.props.handleDelete()}
              className="image-icon"
              name="trash-alt"
              title="delete"
            />
            <FontAwesome
              onClick={() => this.props.closeModal()}
              className="image-icon"
              name="compress"
              title="contract"
            />
            <FontAwesome
              onClick={() => this.props.blendBackground()}
              className="image-icon"
              name="tint"
              title="paint background"
            />
            <FontAwesome
              onClick={() => this.props.changeShape()}
              className="image-icon"
              name={this.props.shape === '0' ? 'circle' : 'square'}
              title="change shape"
            />
            <FontAwesome
              onClick={() => this.props.addBorder()}
              className="image-icon"
              name="circle-notch"
              title={
                this.props.border === 'none' ? 'add frame' : 'remove frame'
              }
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default ExpandedImage;