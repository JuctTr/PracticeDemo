const target = {
    _id: '1024',
    name: 'vuejs',
};

const validators = {
    name(val) {
        return typeof val === 'string';
    },
    _id(val) {
        return typeof val === 'number' && val > 1024;
    },
};

const createValidator = (target, validator) => {
    return new Proxy(target, {
        _validator: validator,
        set(target, propkey, value, proxy) {
            let validator = this._validator[propkey](value);
            if (validator) {
                return Reflect.set(target, propkey, value, proxy);
            } else {
                throw Error(`Cannot set ${propkey} to ${value}. Invalid type.`);
            }
        },
    });
};

const proxy = createValidator(target, validators);

proxy.name = 'vue-js.com'; // vue-js.com
proxy.name = 10086; // Uncaught Error: Cannot set name to 10086. Invalid type.
proxy._id = 1025; // 1025
proxy._id = 22; // Uncaught Error: Cannot set _id to 22. Invalid type
