import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

const useThunk = (thunkFn) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const runThunkFn = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunkFn(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunkFn]
  );

  return [runThunkFn, isLoading, error];
};

export default useThunk;
