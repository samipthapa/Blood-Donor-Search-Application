function radians(degree) {
    const pi = 3.14159265359;
    const radian = (degree * (pi / 180));
    return radian;
}

function mod(a, b) {
    return Number(( a - (Math.floor(a/b) * b)).toPrecision(8));
};

function factorial(num) {
    if (num === 0 || num === 1)
        return 1;
    for (var i = num - 1; i >= 1; i--) {
        num *= i;
    }
    return num;
}

function sin(angle) {
    const pi = 3.14159265359;
    let theta = mod(angle + pi, 2 * pi) - pi;
    let result = 0;
    let termsign = 1;
    let power = 1;
    for (let i=0; i<10; i++) {
        result += (Math.pow(theta, power) / factorial(power)) * termsign;
        termsign *= -1;
        power += 2;
    }
    return result;
}

function cos(angle) {
    const pi = 3.14159265359;
    let theta = mod(angle + pi, 2 * pi) - pi;
    let result = 0;
    let termsign = 1;
    let power = 0;
    for (let i=0; i<10; i++) {
        result += (Math.pow(theta, power) / factorial(power)) * termsign;
        termsign *= -1;
        power += 2;
    }
    return result;
}

function Haversine(coord1, coord2) {
    const { lon1, lat1 } = coord1;
    const { lon2, lat2 } = coord2;

    //Radius of the earth
    const R = 6371000;
    let phi_1 = radians(lat1);
    let phi_2 = radians(lat2);

    let delta_phi = radians(lat2 - lat1);
    let delta_lambda = radians(lon2 - lon1);

    let a = Math.pow(sin(delta_phi / 2.0), 2) + cos(phi_1) * cos(phi_2) * Math.pow(sin(delta_lambda / 2.0), 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let meters = R * c;
    let km = meters / 1000;

    meters = parseFloat(meters.toFixed(2));
    km = parseFloat(km.toFixed(2));
    console.log(km);
}

const coord1 = {
    lon1: 0.1246,
    lat1: 51.5007
};
const coord2 = {
    lon2: 74.0445,
    lat2: 40.6892
};
Haversine(coord1, coord2);  