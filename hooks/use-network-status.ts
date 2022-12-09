

import { useState, useEffect } from "react";

function useNetworkStatus() {
  const [status, setStatus] = useState<boolean|undefined>(true);

  useEffect(() => {
    function setOnline() {
      setStatus(true)
    }

    function setOffline() {
      setStatus(false)
    }

    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    }
  }, []);

  return status;
}

export default useNetworkStatus;