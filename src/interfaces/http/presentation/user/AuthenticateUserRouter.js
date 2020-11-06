module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        /**
         * @swagger
         * 
         *  /authenticate:
         *    post:
         *      tags:
         *      - "authenticate"
         *      summary: "Authenticate a user"
         *      description: "This route should be use to authenticate a new user and receive a token"
         *      produces:
         *      - "application/json"
         *      parameters:
         *      - name: "body"
         *        in: "body"
         *        description: "Authenticate User"
         *        required: true
         *        schema: 
         *          $ref: "#/definitions/UserAuthenticate"
         *      responses:
         *        "200":
         *          description: "OK"
         *          schema:
         *            type: "array"
         *            items:
         *              $ref: "#/definitions/UserAuthenticateResponse"
         *        "400":
         *          description: "Bad Request"
         *          schema:
         *            $ref: "#/definitions/BadRequest"          
         */
        {
            method: 'post',
            path: '/',
            validation: {
                body: ctx.userSchema.authenticate,
            },
            handler: ctx.userController.authenticateUser
        }
    ];
};