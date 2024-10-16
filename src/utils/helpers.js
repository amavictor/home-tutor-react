import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility functions for working with classnames and tailwindcss.
 * @module utils/helpers
 */

/**
 * Merge multiple classnames into one.
 * @param {...string} args - Classnames to merge.
 * @returns {string} Merged classnames.
 */
export const cn = (...args) => twMerge(clsx(...args));

/**
 * Mapping of typography variants to their associated HTML elements.
 * @type {Object<string, string>}
 * @property {string} h-xxl - The HTML element for the h-xxl typography variant.
 * @property {string} h-xl - The HTML element for the h-xl typography variant.
 * @property {string} h-l - The HTML element for the h-l typography variant.
 * @property {string} h-m - The HTML element for the h-m typography variant.
 * @property {string} h-s - The HTML element for the h-s typography variant.
 * @property {string} h-xs - The HTML element for the h-xs typography variant.
 * @property {string} p-xxl - The HTML element for the p-xxl typography variant.
 * @property {string} p-xl - The HTML element for the p-xl typography variant.
 * @property {string} p-l - The HTML element for the p-l typography variant.
 * @property {string} p-m - The HTML element for the p-m typography variant.
 * @property {string} p-s - The HTML element for the p-s typography variant.
 * @property {string} c-xxl - The HTML element for the c-xxl typography variant.
 * @property {string} c-xl - The HTML element for the c-xl typography variant.
 * @property {string} c-l - The HTML element for the c-l typography variant.
 * @property {string} c-m - The HTML element for the c-m typography variant.
 * @property {string} c-s - The HTML element for the c-s typography variant.
 */
export const variantMapping = {
  "h-xxl": "h1",
  "h-xl": "h2",
  "h-l": "h3",
  "h-m": "h4",
  "h-s": "h5",
  "h-xs": "h6",
  "p-xxl": "p",
  "p-xl": "p",
  "p-l": "p",
  "p-m": "p",
  "p-s": "p",
  "c-xxl": "h3",
  "c-xl": "h4",
  "c-l": "h5",
  "c-m": "p",
  "c-s": "h6",
};

