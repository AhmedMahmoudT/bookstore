const useSetState = (e, state, stateFunction) => {
    const { name, value } = e.target;
    stateFunction({ ...state, [name]: value });
}

export default useSetState