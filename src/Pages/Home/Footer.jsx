import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

import "../Home CSS/Footer.css";
import logo from "../../logo.jpg";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* Brand */}
      <div className="footer-brand">
        <img src={logo} alt="Foodie Logo" />

        <p>© {currentYear} Foodie</p>
        <span>Since 2026</span>
      </div>

      {/* Links */}
      <div className="footer-links">

        <div className="footer-column">
          <h3>About</h3>
          <a href="#">About Us</a>
          <a href="#">Help</a>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <a href="#">Contact</a>
          <a href="#">FAQ</a>
        </div>

        <div className="footer-column">
          <h3>Legal</h3>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>

      </div>

      {/* Social */}
      <div className="footer-social">
        <h3>Follow Us</h3>

        <div className="social-icons">

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon />
          </a>

        </div>
      </div>

    </footer>
  );
}

export default Footer;