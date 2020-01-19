"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colors = void 0;

/**
 *
 * Receive colors in InVision DSM Design Token format
 *
 * {
 *     colors: {
 *         [name: string]: {
 *             name: string,
 *             value: string
 *         }
 *     }
 * }
 *
 * Transform and return colors in System UI Theme Specification
 *
 *  {
 *      colors: {
 *          [name: string]: string | string[],
 *      }
 *  }
 *
 */
var colors = function colors(og) {
  if (!og) {
    return;
  }

  var ogEntries = Object.entries(og);
  var colors = {};

  for (var _i = 0, _ogEntries = ogEntries; _i < _ogEntries.length; _i++) {
    var entry = _ogEntries[_i];
    var _entry$ = entry[1],
        name = _entry$.name,
        value = _entry$.value;
    colors[name] = value;
  }

  return colors;
};

exports.colors = colors;