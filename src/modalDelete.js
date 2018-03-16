import React from 'react';
import Modal from "react-responsive-modal";
import { render } from "react-dom";
import { deleteProduct } from './actions';
import { Redirect } from 'react-router-dom';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class ModalDelete extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        open: false
    };
}

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        {/* <h2>react-responsive-modal</h2> */}
        <button className="ui red button" onClick={this.onOpenModal}>Delete</button>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h1>WARINING</h1>
          <p>
            Are you really want to delete this ITEM?
          </p>
          <button className="ui red button" onClick={() => this.props.deleteProduct(this.props.product._id)}>
            Delete
          </button>
          <button className="ui button" onClick={this.onCloseModal}>
            Wait a minute
          </button>
        </Modal>
      </div>
    );
  }
  }
  
  export default ModalDelete;


  