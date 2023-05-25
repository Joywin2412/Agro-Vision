import React from 'react';
import './footer.css';
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://use.fontawesome.com/releases/v5.15.3/css/all.css';
link.type="text/css";
link.integrity = 'sha384-qiEjvRErnWk5YT0jutG5Nh5O5pD/DJMKjhiYbz27LKaZdrMZYO7SpQg2taZW+oyQ';
link.crossOrigin = 'anonymous';

document.head.appendChild(link);


function Footer() {
  return (
    
    <footer>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <h3 className='ff'>Follow Us</h3>
        <ul class="social-links">
          <li><a className='link' href="#"><i class="fab fa-facebook-f"></i>Facebook</a></li>
          <li><a className='link' href="#"><i class="fab fa-twitter"></i>Twitter</a></li>
          <li><a className='link' href="#"><i class="fab fa-instagram"></i>Instagram</a></li>
          <li><a className='link' href="#"><i class="fab fa-linkedin-in"></i>Linked-in</a></li>
        </ul>
      </div>
      <div class="col-md-3">
        <h3 className='ff'>Contact Us</h3>
        <ul class="contact-links">
          <li><i class="fas fa-phone"></i><a href="tel:1234567890">123-456-7890</a></li>
          <li><i class="fas fa-envelope"></i><a href="mailto:info@example.com">info@example.com</a></li>
          <li><i class="fas fa-map-marker-alt"></i>NIT Jamshedpur</li>
        </ul>
      </div>
      <div class="col-md-3">
        <h3 className='ff'>About Us</h3>
        <ul class="about-links">
          <li><a href="#">Our Story</a></li>
          <li><a href="#">Our Team</a></li>
          <li><a href="#">Testimonials</a></li>
          <li><a href="#">FAQs</a></li>
        </ul>
      </div>
      <div class="col-md-3">
        <h3 className='ff'>Quick Links</h3>
        <ul class="quick-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms and Conditions</a></li>
          <li><a href="#">Shipping and Returns</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>
    </div>
    <p className='copyright'> AgroVision©Copyright2023</p>
  </div>
</footer>


  );
}

export default Footer;