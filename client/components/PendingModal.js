'use strict'

import React, {Component, PropTypes} from "react";
import Modal from "react-modal";

class PendingModal extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    closeModal: PropTypes.func,
    modalIsOpen: PropTypes.bool,
    text: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={()=>{
          this.props.closeModal();
        }}
        style={customStyles}
        contentLabel="Modal"
      >
        <div style={styles.modalText}>
          <div>{this.props.text}</div>
          <div style={styles.pleaseWait}>Please wait...</div>

          <div style={styles.loadingContainer}>
            <img
              style={{width: 50, height: 50}}
              src="/images/loading.gif" width={50} height={50}/>
          </div>
        </div>
      </Modal>
    );
  }
}

export default PendingModal;

const styles = {
  modalText: {
    position: "relative",
    color: "#666",
    textAlign: "center",
    fontWeight: "200",
    fontSize: 18
  },
  subText: {
    fontSize: 14,
  },
  pleaseWait: {
    marginTop: 4
  },
  loadingContainer: {
    marginTop: 20,
    height: 50
  },
};

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '1000'
  },
  content: {
    position: 'absolute',
    top: '150px',
    bottom: 'initial',
    width: 600,
    margin: "0 auto",
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  },
};