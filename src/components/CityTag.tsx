import Image from "next/image";
import type { CityPilot } from "@/content/types";

/** A city as a tag, not a pill: small avatar (or monogram tile) + the city's name. */
export function CityTag({ city, size = "md" }: { city: CityPilot; size?: "md" | "sm" }) {
  const px = size === "sm" ? 28 : 32;
  return (
    <span className={size === "sm" ? "city sm" : "city"}>
      {city.avatar.src ? (
        <Image className="city-av" src={city.avatar.src} alt="" width={px} height={px} />
      ) : (
        <span className="city-av city-mono" aria-hidden="true">
          {city.avatar.monogram}
        </span>
      )}
      {city.name}
    </span>
  );
}
