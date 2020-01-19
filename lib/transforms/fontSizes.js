"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fontSizes = void 0;

/**
 *
 * Receive fontSize in InVision DSM Design Token format
 *
 * {
 *     typeStyles: {
 *         [name: string]: {
 *             fontSize: string, // e.g. 18px
 *         }
 *     }
 * }
 *
 * Transform and return colors in System UI Theme Specification
 *
 *  {
 *      fontSizes: number[]
 *  }
 *
 */
var fontSizes = function fontSizes(og) {
  if (!og) {
    return;
  }

  return Object.values(og).map(function (val) {
    return val.fontSize.slice(0, -2);
  }).map(function (val) {
    return parseInt(val);
  }).sort();
};

exports.fontSizes = fontSizes;