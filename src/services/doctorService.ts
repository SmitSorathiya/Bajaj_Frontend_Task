
import { useQuery } from "@tanstack/react-query";

export interface Doctor {
  id: string;
  name: string;
  specialty: string[];  // It's required, but we'll add safety checks in components
  qualification: string;
  experience: number;
  fees: number;
  clinic: string | { name: string; address?: string };
  location: string | { address: string };
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
      
      const data = await response.json();
      
      // Ensure each doctor has a specialty array and proper data structure
      return data.map((doctor: any) => ({
        ...doctor,
        specialty: doctor.specialty || [],
        clinic: doctor.clinic || "Unknown Clinic",
        location: doctor.location || "Unknown Location"
      }));
    },
  });
};
