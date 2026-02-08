import { Link } from "react-router-dom";

const Enlightenment = () => {
  return (
    <div>
      <Link to="/levels" className="backButton">
        Back
      </Link>
      <div className="aLevelContainer">
        <h1>Enlightenment</h1>
        <p>
          Illumination, self-realisation, and enlightenment denote the Divine
          states that have historically demonstrated the highest levels of
          consciousness. These conditions represent the transcendence of the
          limitations and constraints of the ego’s linearity, and the emergence
          of the radiance of the infinite reality and source of existence.
        </p>
      </div>
    </div>
  );
};

export default Enlightenment;
