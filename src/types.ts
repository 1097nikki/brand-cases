/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorSwatch {
  name: string;
  hex: string;
  textColor?: string;
}

export interface ProjectMetadata {
  client?: string;
  year?: string;
  location?: string;
  materials?: string;
  size?: string;
}

export interface Project {
  id: string; // "selected-1", "more-3", etc.
  titleCn: string;
  titleEn: string;
  categoryCn: string;
  categoryEn: string;
  price?: string; // e.g. "Free 免费", "$69"
  descriptionCn: string;
  descriptionEn: string;
  // Dynamic media assets: image paths and optional video path
  images: string[]; // Can include high-quality images generated for supplements
  video?: string;    // If provided, renders an elegant video player looping
  bannerImage: string; // Large full-bleed clean visual or detail asset
  bgText?: string;     // Bottom-left decoration or extra details
  palette?: ColorSwatch[]; // For color swatch sections in reference #3
  specs?: ProjectMetadata;
  tags?: string[];
  disableDetail?: boolean;
  disabled?: boolean;
}
