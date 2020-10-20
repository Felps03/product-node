module.exports = () => ({

    validateContract: (validation) => (req, res, next) => {
        try {

            const { exception } = req.container.cradle;
            const schemaOptions = { abortEarly: false, convert: false, allowUnknown: false, stripUnknown: false };

            Object.keys(validation).forEach(validationKey => {
                if (validationKey == 'query') {
                    schemaOptions.convert = true;
                }
                const { error, value } = validation[validationKey].validate(req[validationKey], schemaOptions);

                if (error)
                    throw exception.badRequest(
                        error.details.map(detail => ({
                            message: detail.message,
                            path: detail.path
                        }))
                    );

                req[validationKey] = value;
            });

            return next();

        } catch (error) {
            next(error);
        }
    }
});