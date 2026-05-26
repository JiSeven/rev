import { PersonWalking } from "../icons/person-walking";

import "./walking-distance.css";

export function WalkingDistance() {
  return (
    <div className="walking-distance">
      <PersonWalking />
      <span className="distance">120m</span>
      <span className="duration">(4 min)</span>
    </div>
  );
}
