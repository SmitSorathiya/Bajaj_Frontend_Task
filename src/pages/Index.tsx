
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DoctorSearch } from "@/components/DoctorSearch";
import { DoctorFilters } from "@/components/DoctorFilters";
import { DoctorCard } from "@/components/DoctorCard";
import { useDoctors } from "@/services/doctorService";
import type { Doctor } from "@/services/doctorService";

const Index = () => {
  const { data: doctors = [], isLoading } = useDoctors();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [consultationType, setConsultationType] = useState(searchParams.get("type") || "");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.get("specialties")?.split(",").filter(Boolean) || []
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "");

  // Get unique specialties from all doctors
  const allSpecialties = doctors.flatMap((d) => d.specialty || []);
  const specialties = [...new Set(allSpecialties)].filter(Boolean);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) params.set("q", searchQuery);
    else params.delete("q");
    
    if (consultationType) params.set("type", consultationType);
    else params.delete("type");
    
    if (selectedSpecialties.length) params.set("specialties", selectedSpecialties.join(","));
    else params.delete("specialties");
    
    if (sortBy) params.set("sort", sortBy);
    else params.delete("sort");
    
    setSearchParams(params);
  }, [searchQuery, consultationType, selectedSpecialties, sortBy]);

  // Filter and sort doctors
  useEffect(() => {
    let filtered = [...doctors];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(query)
      );
    }

    // Apply consultation type filter
    if (consultationType) {
      filtered = filtered.filter((doctor) =>
        doctor.consultationType === consultationType || doctor.consultationType === "both"
      );
    }

    // Apply specialty filters
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter((doctor) =>
        doctor.specialty?.some((s) => selectedSpecialties.includes(s))
      );
    }

    // Apply sorting
    if (sortBy === "fees") {
      // Sort by fees in ascending order (low to high)
      filtered.sort((a, b) => a.fees - b.fees);
    } else if (sortBy === "experience") {
      // Sort by experience in descending order (high to low)
      filtered.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchQuery, consultationType, selectedSpecialties, sortBy]);

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleClearFilters = () => {
    setSelectedSpecialties([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-700 py-4 mb-6">
        <div className="container mx-auto px-4">
          <DoctorSearch doctors={doctors} onSearch={setSearchQuery} />
        </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <DoctorFilters
            specialties={specialties}
            selectedSpecialties={selectedSpecialties}
            consultationType={consultationType}
            sortBy={sortBy}
            onSpecialtyChange={handleSpecialtyChange}
            onConsultationTypeChange={setConsultationType}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />
        </div>
        <div className="md:col-span-3 space-y-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-500">
                No doctors found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
