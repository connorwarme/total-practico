import { useState, useEffect } from "react";
import { Alert } from "react-native";

interface UseAppwriteResult<T> {
  data: T[];
  loading: boolean;
  refetch: () => void;
}

const useAppwrite = <T>(fn: () => Promise<T[]>): UseAppwriteResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppwrite;
