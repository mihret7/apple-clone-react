import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Productpage() {
  const { pid } = useParams();
  const [products, setProducts] = useState([]);

// // using the database
//   useEffect(() => {
//       fetch("http://localhost:3006/iphones") 
//       .then((res) => res.json())
//       .then((data) => {
//         const productList = data.products;
//         const singleProduct = productList.filter((x) => {
//           let product_url = x.product_url
//           let parts = product_url.split("/").filter(Boolean);
//           let lastPart = parts[parts.length - 1];
//           return lastPart === pid}
//         );
//         setProducts(singleProduct);
//       })
//       .catch((err)=>{console.log(err)})
//       ;
//   }, [pid]);

  // using ready made json file
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}youtube.json`)
      .then((res) => res.json())
      .then((data) => {
        const productList = data.products;
        const singleProduct = productList.filter((x) => x.product_url === pid);
        setProducts(singleProduct);
      });
  }, [pid]);

console.log(products)

  return (
    <div>
      <section className="internal-page-wrapper top-100">
        <div className="container">
          {products?.map((product) => {
            let id = product.product_url;
            let title = product.product_name;
            let img = product.product_img;
            let Brief = product.product_brief_description;
            let StartPrice = product.starting_price;
            let PriceRange = product.price_range;
            let details = product.product_description;

            return (
              <div key={id} className="bottom-100">
                <div className="row justify-content-center text-center bottom-50">
                  <div className="col-12 mt-5 pt-5">
                    <div className="title-wraper bold">{title}</div>
                    <div className="brief-description">{Brief}</div>
                  </div>
                </div>

                <div className="row justify-content-center text-center product-holder h-100">
                  <div className={`col-sm-12 col-md-6 my-auto`}>
                    <div className="starting-price">
                      {`Starting at ${StartPrice}`}
                    </div>
                    <div className="monthly-price">{PriceRange}</div>
                    <div className="product-details">{details}</div>
                  </div>

                  <div className={`col-sm-12 col-md-6`}>
                    <div className="prodict-image">
                      <img src={img} alt={title} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Productpage;
