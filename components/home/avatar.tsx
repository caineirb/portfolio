import React from "react";
import { Style, Avatar } from "@dicebear/core";
import definition from "@dicebear/styles/voxel-art.json";

interface AvatarArtProps {
  className?: string;
  size?: string;
}

export const AVATAR_OPTIONS = {
  title: "Home-Avatar",
  borderRadius: 0,
  tags: ["animation"],
  animationVariant: ["fastest"],
  cheeksVariant: ["blush"],
  eyebrowsVariant: ["soft"],
  eyesVariant: ["sleepy"],
  glassesVariant: ["round"],
  glassesProbability: 100,
  mouthVariant: ["flat"],
  nostVariant: ["tall"],
  outfitVariant: ["hoodie"],
  topVariant: ["curly"],
  hairColor: ["030302"],
  hairColorFill: ["radial"],
  shirtColor: ["0F0E0E"],
  pantsColor: ["291919"],
  shoesColor: ["E8E8E3"],
  skinColor: ["D9B482"],
  backgroundColor: ["16161a"]
} as const;

export default function AvatarArt({ className = "", size = "w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40" }: AvatarArtProps) {
  const style = new Style(definition);
  const avatar = new Avatar(style, AVATAR_OPTIONS);
  const svg = avatar.toString();

  return (
    <div className={`relative group inline-flex items-center shrink-0 ${className}`}>
      {/* Ambient Radial Glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-green-500/25 via-emerald-500/35 to-cyan-500/25 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition duration-500" />

      {/* Voxel Avatar Container */}
      <div
        className={`relative ${size} rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl p-1.5 flex items-center justify-center overflow-hidden [&>svg]:w-full [&>svg]:h-full transition-transform duration-300 group-hover:scale-105`}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}

export function getAvatarSvg() {
  const style = new Style(definition);
  const avatar = new Avatar(style, AVATAR_OPTIONS);
  return avatar.toString();
}
