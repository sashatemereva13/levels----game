import { Link } from "react-router-dom";
import "./levels.css";

const LevelsText = () => {
  return (
    <div>
      <Link to="/" className="backButton">
        Back
      </Link>
      <div className="levelsDiv">
        <h1> vibration levels</h1>

        <div className="typesOfConsciousness">
          <Link to="/levels/enlightenment">
            <p className="level"> 1000</p>
          </Link>

          <Link to="/levels/peace">
            <p className="level peace">600-699</p>
          </Link>

          <Link to="/levels/unconditionallove">
            <p className="level unconditionalLove">540-599</p>
          </Link>
          <Link to="/levels/love">
            <p className="level"> 500 Love</p>
          </Link>
          <Link to="/levels/reason">
            <p className="level reason"> 400</p>
          </Link>
          <Link to="/levels/acceptance">
            <p className="level acceptance"> 350</p>
          </Link>
          <Link to="/levels/willingness">
            <p className="level willingness"> 310</p>
          </Link>
          <Link to="/levels/neutrality">
            <p className="level neutrality"> 250</p>
          </Link>
          <Link to="/levels/courage">
            <p className="level courage"> 200</p>
          </Link>
          <Link to="/levels/pride">
            <p className="level pride"> 175</p>
          </Link>
          <Link to="/levels/anger">
            <p className="level anger"> 150</p>
          </Link>
          <Link to="/levels/desire">
            <p className="level desire"> 125</p>
          </Link>
          <Link to="/levels/fear">
            <p className="level fear"> 100</p>
          </Link>
          <Link to="/levels/grief">
            <p className="level grief"> 75</p>
          </Link>
          <Link to="/levels/apathy">
            <p className="level apathy"> 50</p>
          </Link>
          <Link to="/levels/guilt">
            <p className="level guilt"> 30</p>
          </Link>
          <Link to="/levels/shame">
            <p className="level shame"> 20</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LevelsText;
