import { useState, useEffect } from "react";

const useFormPending = () => {
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    setIsPending(isPending);
  }, [isPending]);

  return {
    isPending,
    setIsPending,
  };
};

export default useFormPending;
