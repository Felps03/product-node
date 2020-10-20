module.exports = () => ({
    code: {
        SERVICE_UNAVAILABLE: 'service_unavailable',
        SELLER_NOT_FOUND: 'seller_not_found',
        SELLER_NOT_LINKED_TERMINAL: 'seller_not_linked_terminal',
        SIGNALIZATION_NOT_REGISTRED: 'signalization_not_registred',
        SIGNALIZATION_NOT_FOUND: 'signalization_not_found',
        SIGNALIZATION_STATUS: 'signalization_status',
        SIGNALIZATION_CREATE_ERROR: 'signalization_create_error'
    },
    message: {
        SERVICE_UNAVAILABLE: ['Service unavailable: {0}.'],
        SELLER_NOT_FOUND: ['Seller with {0} {1} can\'t be found.'],
        SELLER_NOT_LINKED_TERMINAL: ['Seller with {0} {1} has no linked terminal.'],
        SIGNALIZATION_NOT_REGISTRED: ['No signalization registered.'],
        SIGNALIZATION_NOT_FOUND: ['No one signalizations registered for {0} {1}'],
        SIGNALIZATION_STATUS: ['The signalization has {0} status and {1}.'],
        SIGNALIZATION_CREATE_ERROR: ['Problems creating the {0} signalizations.']
    }
});
