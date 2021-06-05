import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';



const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
  state={
    //products:storeProducts,
    products:[],
    detailProduct:detailProduct,
    cart:[],
    modalOpen:false,
    modalProduct:detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0
  };
  componentDidMount(){
    this.setProducts();
  }
  setProducts=() =>{
    let tempProducts = [];
    storeProducts.forEach(item => {
        const singleItem = {...item};
        tempProducts = [...tempProducts,singleItem];
    });
    this.setState(()=>{
        return {products:tempProducts};
        });  
  };
  getItem = id =>{
    const product=this.state.products.find(item=>item.id===id);
    return product;    
  };
  handleDetail = id =>{
     const product=this.getItem(id);
     this.setState(()=>{
        return {detailProduct:product}
    })
  };
  addToCart = (id)=>{
    //console.log(`hola desde el carrito ${id}`);
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(() =>{
        return { products: tempProducts,cart:[...this.state.cart,product]};
    },
    () =>{
        //console.log(this.state);
        this.addTotals();
    }
    );
  };
  openModal = id =>{
    const product = this.getItem(id);
    this.setState(()=>{
        return {modalProduct:product,modalOpen:true}
    })
  }
  closeModal = () =>{
    this.setState(()=>{
        return {modalOpen:false}
    });
  };
  increment = id=>{
    let tempCart = [...this.state.cart];
    const selectedProducts = tempCart.find(item=>item.id ===id);
    const index = tempCart.indexOf(selectedProducts);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count*product.price;
    this.setState(
        ()=>{
            return {cart:[...tempCart]};
        },
        ()=>{
            this.addTotals();
        }
    );
  };
  decrement = id=>{
    let tempCart = [...this.state.cart];
    const selectedProducts = tempCart.find(item=>item.id ===id);
    const index = tempCart.indexOf(selectedProducts);
    const product = tempCart[index];
    product.count = product.count - 1;
    if(product.count===0){
        this.removeItem(id)
    }else{
        product.total = product.count*product.price;
        this.setState(
            ()=>{
                return {cart:[...tempCart]};
            },
            ()=>{
                this.addTotals();
            }
        );
        
    }
  }
  removeItem = (id)=>{
    //console.log("remueve");   
    let temoPoducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item=>item.id !== id);
    const index = temoPoducts.indexOf(this.getItem(id));
    let removedProducts = temoPoducts[index];
    removedProducts.inCart = false;
    removedProducts.count = 0;
    removedProducts.total = 0;

    this.setState(()=>{
        return {
            cart:[...tempCart],
            products:[...temoPoducts]
        };
    },
    () => {
        this.addTotals();
    }
    );
  };
  clearCart = (id)=>{
    //console.log("carrito lipio"); 
    this.setState(()=> {
        return {cart:[]};
    },()=>{
        this.setProducts();
        this.addTotals();
    });
  };
   addTotals = ()=>{
    let subtotal = 0;
    this.state.cart.map(item=>(subtotal += item.total));
    const tempTax = subtotal*0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subtotal + tax;
    this.setState(()=>{
        return {
            cartSubtotal : subtotal,
            cartTax : tax,
            cartTotal : total
        };
    });
  };
  render() {    
    return(
    	<ProductContext.Provider value={{
            ...this.state,
            handleDetail:this.handleDetail,         
            addToCart:this.addToCart,
            openModal:this.openModal,
            closeModal:this.closeModal,
            increment:this.increment,
            decrement:this.decrement,
            removeItem:this.removeItem,
            clearCart:this.clearCart
            }}
        >
            {/*<button onClick={this.tester}>test me</button>*/}
			{this.props.children}
		</ProductContext.Provider>
    	)
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer};