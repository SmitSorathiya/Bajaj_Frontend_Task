
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import type { Doctor } from "@/services/doctorService";

interface DoctorSearchProps {
  doctors: Doctor[];
  onSearch: (query: string) => void;
}

export const DoctorSearch = ({ doctors, onSearch }: DoctorSearchProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      const matches = doctors
        .filter((doctor) =>
          doctor.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 3);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, doctors]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search doctors, specialties, clinics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(query);
              setShowSuggestions(false);
            }
          }}
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border">
          {suggestions.map((doctor) => (
            <button
              key={doctor.id}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                setQuery(doctor.name);
                onSearch(doctor.name);
                setShowSuggestions(false);
              }}
            >
              <div className="font-medium">{doctor.name}</div>
              <div className="text-sm text-gray-500">{doctor.specialty.join(", ")}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
