import { useEffect, useState } from "react";

function getPreviousValue(key, initialValue) {
  //JSON parse Error if value to key is deleted manually so use try catch
  try {
    const savedValue = JSON.parse(sessionStorage.getItem(key));
    if (typeof savedValue !== typeof initialValue) return initialValue;
    if (savedValue) return savedValue;
  } catch (error) {
    console.error(error.message);
  }
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

export default function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(() => getPreviousValue(key, initialValue));

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
    // eslint-disable-next-line
  }, [value]);

  return [value, setValue];
}
