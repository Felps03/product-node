module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        /**
         * @swagger
         * 
         *  /register:
         *    post:
         *      tags:
         *      - "register"
         *      summary: "Register a user"
         *      description: "This route should be use to register a new user"
         *      produces:
         *      - "application/json"
         *      parameters:
         *      - name: "body"
         *        in: "body"
         *        description: "Register User"
         *        required: true
         *        schema: 
         *          $ref: "#/definitions/UserRegister"
         *      responses:
         *        "201":
         *          description: "Created"
         *          schema:
         *            type: "array"
         *            items:
         *              $ref: "#/definitions/UserRegisterResponse"
         *        "400":
         *          description: "Bad Request"
         *          schema:
         *            $ref: "#/definitions/BadRequest"          
         */
        {
            method: 'post',
            path: '/',
            validation: {
                body: ctx.userSchema.create,
            },
            handler: ctx.userController.createUser
        }
    ];
};