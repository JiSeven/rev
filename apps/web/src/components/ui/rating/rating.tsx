import { Star } from "../icons/star";

import "./rating.css";

export function Rating() {
  return (
    <div className="rating">
      <Star className="icon" />
      <span className="value">4.7</span>
      <span className="reviews-count">(102)</span>
    </div>
  );
}
