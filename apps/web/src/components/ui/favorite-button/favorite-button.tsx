import { Heart } from "../icons/heart";

import "./favorite-buttont.css";

type FavoriteButtonProps = {
  isActive?: boolean;
  className?: string;
};

export function FavoriteButton({
  isActive,
  className = "",
}: FavoriteButtonProps) {
  return (
    <button
      className={`favorite-button ${className} ${isActive ? "active" : ""}`}
    >
      <Heart />
    </button>
  );
}
