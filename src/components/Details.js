import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import './global';
//import myInitObject from './global'

export default class Details extends Component {
	render() {
				//	window.location.reload(true);

		return(
			<ProductConsumer>

			
				{value => {
				const {id,company,img,info,price,title,inCart}=value.detailProduct;
				/*
				/*global.config.i18n.welcome.id = id;
				
				console.log(global.config.i18n.welcome.id);//
				id = global.config.i18n.welcome.id;
				company = global.config.i18n.welcome.company;
				img = global.config.i18n.welcome.img;
				info = global.config.i18n.welcome.info;				
				price = global.config.i18n.welcome.price;
				title = global.config.i18n.welcome.title;
				inCart= global.config.i18n.welcome.inCart;
				const {id,company,img,info,price,title,inCart}=global.config.i18n.welcome;
				/*console.log(this.props.product);
				global.config.i18n.welcome.company = company;
				global.config.i18n.welcome.img = img;
				global.config.i18n.welcome.info = info;				
				global.config.i18n.welcome.price = price;
				global.config.i18n.welcome.title = title;
				global.config.i18n.welcome.inCart = inCart;
				*/
				
				return (
				<div className="container py-5">
					{/*title*/}
					<div className="row">
						<div className="col-10 mx-auto text-center text-slanted text-blue my-5">
							<h1>{title}</h1>
						</div>
					</div>
					{/* end title*/}
					{/* product info*/}
					<div className="row">
						<div className="col-10 mx-auto col-md-6 my-3">
							<img src={img} className="img-fluid" alt="product"/>
						</div>
						{/* product text*/}
						<div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
							<h2>model:{title}</h2>
							<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
								hecho por:<span className="text-uppercase">{company}</span>
							</h4>
							<h4 className="text-blue">
								<strong>
									price:<span>$</span>
									{price}
								</strong>
							</h4>
							<p className=" text-capitalize.font-weight-bold mt-3 mb-0">
								informaci&oacute;n sobre el producto:
							</p>
							<p className="text-muted lead">{info}</p>
							{/* buttons*/}
							<div>
								<Link to="/">
								<ButtonContainer> regresar a productos
								</ButtonContainer>
								</Link>
								<ButtonContainer cart disabled={inCart ? true:false}
								onClick={()=>{
									//console.log(value.detailProduct);
									value.addToCart(id);
									value.openModal(id);
									}}
									>
									{inCart ? "en el carrito":"adicionar al carrito"}
								</ButtonContainer>
							</div>
						</div>
					</div>
				</div>
				);
				}}
			
			</ProductConsumer>
		);
	}
}