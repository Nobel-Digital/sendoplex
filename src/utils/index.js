// utils/index.js

// Change hex color into RGB
export const getRGBColor = (hex, type) => {
    let color = hex.replace(/#/g, "")
    // rgb values
    var r = parseInt(color.slice(0, 2), 16)
    var g = parseInt(color.slice(2, 4), 16)
    var b = parseInt(color.slice(4, 6), 16)

    return `--color-${type}: ${r}, ${g}, ${b};`
}


// Determine the accessible color of text
export const getAccessibleColor = (hex) => {
    let color = hex.replace(/#/g, "")
    // rgb values
    var r = parseInt(color.slice(0, 2), 16)
    var g = parseInt(color.slice(2, 4), 16)
    var b = parseInt(color.slice(4, 6), 16)
    var yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128 ? "#000000" : "#FFFFFF"
}
