"use client";
// Galeria e fotove të produktit me thumbnail-e
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-steel bg-carbon">
        <Image
          src={images[active]}
          alt={`${name} - foto ${active + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Foto ${i + 1}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                i === active ? "border-electric shadow-glow-sm" : "border-steel hover:border-mist"
              )}
            >
              <Image src={img} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
