import { Col, Container, Row } from "react-bootstrap";
const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer aria-label="Footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col py-3 text-center bg-white text-black font-medium">
            <span className="text-sm text-muted">Kampala INC &copy; {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
