import React from 'react';
import classnames from 'classnames';
import Modal from "react-responsive-modal";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class ModalConfirm extends React.Component {
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
                <button className="ui blue button" onClick={this.onOpenModal}>
                    save
                </button>
                <Modal open={open} onClose={this.onCloseModal} little>
                    <h1>WARINING</h1>
                    <p>No empty space Please.</p>
                    <button className="ui button" onClick={this.onCloseModal}>
                        ok
                    </button>
                </Modal>
            </div>
        );
    }
}

class ProductForm extends React.Component {
    state = {
        _id: this.props.product ? this.props.product._id : null,
        subject: this.props.product ? this.props.product.subject : '',
        detail: this.props.product ? this.props.product.detail : '',
        quantity: this.props.product ? this.props.product.quantity : '',
        date: null,
        errors: {},
        loading: false
    }

    componentWillReceiveProps = (nextProps) => {
        //create page
        if(nextProps.product === null ) {
            this.setState({
                _id: '',
                subject: '',
                quantity: '',
                detail: ''
            });
        //update page
        } else {
            this.setState({
                _id: nextProps.product._id,
                subject: nextProps.product.subject,
                quantity: nextProps.product.quantity,
                detail: nextProps.product.detail  
            });
        }        
    }

    handleChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
          let errors = Object.assign({}, this.state.errors);
          delete errors[e.target.name];
          this.setState({
            [e.target.name]: e.target.value,
            errors
          });
        } else {
          this.setState({ [e.target.name]: e.target.value });
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
    
        // validation
        let errors = {};
        if (this.state.subject === '') errors.subject = "Can't be empty";
        if (this.state.detail === '') errors.detail = "Can't be empty";
        if (this.state.quantity === '') errors.quantity = "Can't be empty";
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0

        if(isValid) {
            const { _id, subject, detail, quantity } = this.state;
            this.setState({ loading: true });
            this.props.saveProduct({ _id, subject, detail, quantity })
            .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false })));
        }
    }

    render() {
        const form = (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
                <h1>Add new product</h1>

                {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                <div className={classnames('field', { error: !!this.state.errors.subject})}>
                <label htmlFor="subject">subject</label>
                <input
                    name="subject"
                    id="subject"
                    value={this.state.subject}
                    onChange={this.handleChange}        
                />
                <span>{this.state.errors.subject}</span>
                </div>

                <div className={classnames('field', { error: !!this.state.errors.detail})}>
                <label htmlFor="detail">detail</label>
                <input
                    name="detail"
                    id="detail"
                    value={this.state.detail}
                    onChange={this.handleChange}        
                />
                <span>{this.state.errors.detail}</span>
                </div>

                <div className={classnames('field', { error: !!this.state.errors.quantity})}>
                <label htmlFor="quantity">quantity</label>
                <input
                    name="quantity"
                    id="quantity"
                    value={this.state.quantity}
                    onChange={this.handleChange}        
                />
                <span>{this.state.errors.quantity}</span>
                </div>
                
                <div>
                <input 
                type="hidden"
                name="date"
                id="date"
                />
                </div>

                <div className="field">
                    <ModalConfirm/>
                </div>
            </form>
        )
        return(
            <div>
                { form }
            </div>
        );
    }
}

export default ProductForm;
