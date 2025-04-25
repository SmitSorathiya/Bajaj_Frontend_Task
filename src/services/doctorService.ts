
import { useQuery } from "@tanstack/react-query";

export interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  qualification: string;
  experience: number;
  fees: number;
  clinic: string;
  location: string;
  consultationType: "video" | "clinic" | "both";
}

export const useDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: async (): Promise<Doctor[]> => {
      const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      return response.json();
    },
  });
};
