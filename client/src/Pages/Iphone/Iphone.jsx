import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Iphone() {
  const [products, setProducts] = useState([]);

  // using our database
   useEffect(() => {
     fetch("http://localhost:3006/iphones") 
      .then((res) => res.json())
      .then((products) => {
        setProducts(() => products.products);
      });
  }, []);

  // // Using ready made json file
  // useEffect(() => {
  //   fetch("/iphones.json")
  //     .then((res) => res.json())
  //     .then((products) => {
  //       setProducts(() => products.products);
  //     });
  // }, []);

  console.log(products);
  
  
  
  let order = 2;
  return (
    <div>
      <section className="internal-page-wrapper top-100">
        <div className="container">
          
          <div className="row justify-content-center text-center">
            <div className="col-12 mt-5 pt-5">
              <div className="title-wraper bold">Iphones</div>
              <div className="brief-description">
                The best for the brightest.
              </div>
            </div>
          </div>
          {products.map((product) => {
            let id = product.product_url;
            let title = product.product_name;
            let img = product.product_img;
            let Brief = product.product_brief_description;
            let StartPrice = product.starting_price;
            let PriceRange = product.price_range;

            // for ready made
            let productPage = "/iphone/" + id;

            // for the database
            let parts = id.split("/").filter(Boolean);
            let lastPart = parts[parts.length - 1];
            let productPage2 = "/iphone/" + lastPart;

            let order1 = 1;
            let order2 = 2;
            if (order !== 1) {
              order1 = 2;
              order2 = 1;
              order--;
            } else {
              order++;
            }

            let productDiv = (
              <div
                key={id}
                className="row justify-content-center text-center product-holder h-100 top-100 bottom-100"
              >
                <div className={`col-sm-12 col-md-6 my-auto order-${order1}`}>
                  <div className="product-title">{title}</div>
                  <div className="product-brief">{Brief}</div>
                  <div className="starting-price">
                    {`Starting at ${StartPrice}`}
                  </div>
                  <div className="monthly-price">{PriceRange}</div>
                  <div className="links-wrapper">
                    <ul>
                      <li>
                        <Link to={productPage2}>Learn more</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={`col-sm-12 col-md-6 order-${order2}`}>
                  <div className="prodict-image">
                    <img src={img} alt="" />
                  </div>
                </div>
              </div>
            );
            return productDiv;
          })}
        </div>
      </section>
    </div>
  );
}




export default Iphone;
