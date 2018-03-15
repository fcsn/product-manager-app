import React from 'react';
import { saveProduct } from './actions';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

class ProductForm extends React.Component {
    state = {
        subject: '',
        detail: '',
        quantity: '',
        date: null,
        errors: {},
        loading: false,
        done: false
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
            const { subject, detail, quantity } = this.state;
            this.props.saveProduct({ subject, detail, quantity }).then(
                () => { this.setState({ done: true })},
                (err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false }))
            );
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
                <button className="ui primary button">Save</button>
                </div>
            </form>
        )
        return(
            <div>
                { this.state.done ? <Redirect to="/products" /> : form }
            </div>
        );
    }
}

export default connect(null, { saveProduct })(ProductForm);




