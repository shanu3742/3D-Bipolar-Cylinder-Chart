const hexToRgb = (hex) => {
    // Convert 3-digit hex to 6-digit
    if (hex.length === 4) {
        hex = hex.replace(/(.)/g, '$1$1');
    }
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

const namedColorToRgb =(color)=>{
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = color;
    return ctx.fillStyle;
}


const parseColor = (color) => {
    if (color.startsWith('#')) {
        return hexToRgb(color);
    } else if (color.startsWith('rgb')) {
        return color.match(/\d+/g).map(Number);
    } else {
        return hexToRgb(namedColorToRgb(color));
    }
}

export const convertToRGBA = (color) => {
    const [r, g, b] = parseColor(color);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
}