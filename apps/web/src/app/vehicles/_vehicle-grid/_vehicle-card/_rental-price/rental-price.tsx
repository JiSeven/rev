import { formatCurrency } from "@/lib/format-currency";

import "./rental-price.css";

export function RentalPrice() {
  return (
    <div className="rental-price">
      <span className="price">{formatCurrency(24.5)}</span>
      <small className="period">/ hour</small>
    </div>
  );
}
