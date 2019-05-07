const gradient = require("gradient-string")
const redToGreen = gradient("#00ffff", "#00ff00")
const str = "■".repeat(100)

// Standard RGB gradient
console.log(redToGreen(str))

// Short HSV gradient: red -> yellow -> green
console.log(redToGreen(str, { interpolation: "hsv" }))

// Long HSV gradient: red -> magenta -> blue -> cyan -> green
console.log(redToGreen(str, { interpolation: "hsv", hsvSpin: "long" }))