import React from "react";
import "./TermsAndCondtion.css";
import MetaData from "../component/layouts/MataData/MataData";
import TermsImage from "../Image/about/tc.jpg";

const TermsAndConditionsPage = () => {
  return (
    <div className="terms-container">
      <MetaData title="Terms and Conditions" />
      <img
        src={TermsImage}
        alt="Terms and Conditions"
        className="terms-image"
      />
      <div className="terms-overlay">
        <h1 className="terms-title">TERMS AND CONDITIONS</h1>
      </div>
      <div className="terms-content">
        <p>
          Thank you for shopping with Irmitek! We appreciate your business and
          your interest in our digital software products. We want to make sure you
          have a smooth and secure experience purchasing from our website.
        </p>
        <p>
          By placing an order and purchasing a product from our website, you
          agree to the following terms and conditions, along with our return and
          warranty policies, privacy policy, and terms of use. Please review
          everything carefully to understand your rights and obligations when
          purchasing from Irmitek.
        </p>

        <h2>Acceptance of These Terms</h2>
        <p>
          You (“Customer”) may place orders for products on Irmitek (“we,” “our”)
          via our website. By placing an order, you consent to these Terms and Conditions of Sale
          (“Terms”) and acknowledge that we will provide the products subject to these Terms.
          Any term or condition in an order or correspondence that conflicts with these Terms shall be inapplicable unless expressly agreed to in writing by Irmitek.
        </p>

        <h2>Orders</h2>
        <p>
          All orders are subject to Irmitek's acceptance. We may refuse to accept,
          cancel, or limit any order for any reason, even after an order confirmation has been sent.
          If we cancel an order after you have been charged, we will refund the charged amount.
        </p>

        <h2>Product Offering</h2>
        <p>
          All product descriptions on our website are subject to change at any time without prior notice.
          We reserve the right to change or discontinue a product at any time. While we make every effort to display
          product details, including images and descriptions, as accurately as possible, we cannot guarantee that your device's display will match the actual physical product exactly.
        </p>

        <h2>Price</h2>
        <p>
          All prices are subject to change until your order is accepted by Irmitek. Prices displayed on our website exclude taxes, which will be calculated and displayed during checkout.
          Prices on the website may differ from those in physical stores. We reserve the right to correct any pricing errors and notify you of any changes before proceeding with your order.
        </p>

        <h2>Special Offers</h2>
        <p>
          From time to time, we may offer special promotions, discounts, or free shipping for some or all of our digital products.
          These offers are subject to change and may be discontinued at any time.
        </p>

        <h2>Taxes</h2>
        <p>
          The prices for products sold here include applicable taxes (e.g., GST). Customer is responsible for paying any taxes that are due at the point of purchase, except those based on Irmitek's income.
        </p>

        <h2>Payment</h2>
        <p>
          All orders must be paid in full before they are fulfilled. We accept payment through secure methods, including credit/debit cards (MasterCard, Visa), and other electronic payment gateways.
          Payment information is submitted during checkout and is subject to verification.
        </p>

        <h2>Shipping</h2>
        <p>
          Irmitek offers digital delivery of all products. Once your order is confirmed, you will receive access to your digital products immediately via email or account download.
          Delivery timeframes are estimates, and actual access times may vary depending on the method of payment processing or system load.
        </p>
        <p>
          Irmitek cannot be held liable for delays in the delivery of digital products or failure to meet estimated delivery times.
        </p>

        <h2>Returns</h2>
        <p>
          Due to the nature of digital products, all sales are final. However, if there is an issue with the product (e.g., incorrect license, defective software), we will issue a refund or replacement as applicable. Please refer to our refund policy for further details.
        </p>

        <h2>Warranty</h2>
        <p>
          For warranty information regarding software and digital products, please refer to the written warranty provided with the product or visit our warranty page on the website.
        </p>

        <h2>Not for Resale</h2>
        <p>
          Products sold on our website are for personal use only and not for resale. We reserve the right to refuse or cancel any order if we suspect the products are being purchased for resale purposes.
        </p>

        <h2>Governing Law / Jurisdiction</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the jurisdiction where Irmitek operates.
        </p>

        <h2>Dispute Resolution and Applicable Law</h2>
        <p>
          Any disputes arising from or related to these Terms will be resolved through arbitration under the laws applicable in Irmitek's operational jurisdiction.
          Arbitration will be conducted in English and governed by the applicable arbitration rules.
        </p>

        <h2>Indemnification</h2>
        <p>
          You agree to indemnify and hold Irmitek harmless from any claims, costs, or damages arising from your use of our website or breach of these Terms.
        </p>

        <h2>Entire Agreement</h2>
        <p>
          These Terms and Conditions constitute the entire agreement between you and Irmitek regarding the purchase and use of our digital products.
        </p>

        <h2>Severability</h2>
        <p>
          If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
        </p>

        <h2>Exclusivity</h2>
        <p>
          The rights and responsibilities outlined in these Terms are exclusive to this agreement and supersede any previous agreements.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
