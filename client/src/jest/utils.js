const FIRST_MOCK_CALL = 0;
const FIRST_ARGUMENT_CALL = 0;
export const firstParameterOfFirstCallTo = ({mock}) => {
    if(!mock){
        throw new Exception('Is not a mock');
    }

    return mock.calls[FIRST_MOCK_CALL][FIRST_ARGUMENT_CALL];
};

export const numberOfCallsTo = ({mock}) => {
    if(!mock){
        throw new Exception('is not a mock');
    }

    return mock.calls.length;
};
