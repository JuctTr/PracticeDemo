// eslint-disable-next-line camelcase
export function instance_of (ordinary, construct) {
    const conProto = construct.prototype;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        if (ordinary === null) {
            return false
        }
        if (ordinary === conProto) {
            return true
        }
        // eslint-disable-next-line no-proto
        ordinary = ordinary.__proto__
    }
}
