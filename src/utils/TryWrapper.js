module.exports = () => fn => (...args) => {
    const check = fn =>
        typeof fn !== 'function' && new Error('fn should be a function!');

    const noArguments = (fn, data) => () => fn(...data);

    const success = data => data;

    const fail = e => {
        throw e;
    };

    check(fn);
    return Promise.resolve()
        .then(noArguments(fn, args))
        .then(success)
        .catch(fail);
};
