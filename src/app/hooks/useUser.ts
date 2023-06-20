import React, { useState } from "react";

const useUser = () => {
  const signIn = () => {};

  const [error, setError] = useState(false);

  return { signIn, error, setError };
};

export default useUser;
