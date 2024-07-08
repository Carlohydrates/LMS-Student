import { useEffect, useState } from "react";

export const useGetModules = (courseCode: string) => {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getModules = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/module/${courseCode}`
        );

        if (response.ok) {
          const data = await response.json();
          setModules(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (error: any) {
        console.error("Error fetching modules:", error);
        setError(error.message || "Failed to fetch modules");
      } finally {
        setLoading(false);
      }
    };
    getModules();
  }, []);

  return { modules, loading, error };
};
