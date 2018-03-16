import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveProduct, fetchProduct, updateProduct } from './actions';
import ProductForm from './productForm';

class ProductFormPage extends React.Component {

    state = {
        redirect: false
    }
    componentDidMount = () => {
        const { match } = this.props;
        if(match.params._id) {
            this.props.fetchProduct(match.params._id);
        }
    }

    saveProduct = ({ _id, subject, detail, quantity }) => {
        if(_id) {
            return this.props.updateProduct({ _id, subject, detail, quantity }).then(
                () => { this.setState({ redirect: true })},
            );
        } else {
            return this.props.saveProduct({ subject, detail, quantity }).then(
                () => { this.setState({ redirect: true })},
            );
          }
    }

    render() {
        return (
            <div>
                {
                    this.state.redirect ?
                    <Redirect to="/" /> :
                    <ProductForm
                        product={this.props.product}
                        saveProduct={this.saveProduct}
                    />
                }
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    const { match } = props;
    if(match.params._id) {
        return {
            product: state.products.find(item => item._id === match.params._id)
        }
    }
    return {product: null};
}

export default connect(mapStateToProps, { saveProduct, fetchProduct, updateProduct })(ProductFormPage);