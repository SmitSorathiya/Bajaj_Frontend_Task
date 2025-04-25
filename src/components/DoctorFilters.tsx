
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

interface FiltersProps {
  specialties: string[];
  selectedSpecialties: string[];
  consultationType: string;
  sortBy: string;
  onSpecialtyChange: (specialty: string) => void;
  onConsultationTypeChange: (type: string) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

export const DoctorFilters = ({
  specialties,
  selectedSpecialties,
  consultationType,
  sortBy,
  onSpecialtyChange,
  onConsultationTypeChange,
  onSortChange,
  onClearFilters,
}: FiltersProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-medium" data-testid="filter-header-sort">Sort by</h3>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
        <div className="p-4">
          <RadioGroup value={sortBy} onValueChange={onSortChange} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fees" id="fees" data-testid="sort-fees" />
              <Label htmlFor="fees" className="text-sm">Price: Low-High</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="experience" id="experience" data-testid="sort-experience" />
              <Label htmlFor="experience" className="text-sm">Experience - Most Experience first</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex justify-between items-center w-full">
            <h3 className="font-medium" data-testid="filter-header-specialty">Specialties</h3>
            <Button 
              variant="ghost" 
              className="text-sm text-blue-600 hover:text-blue-800 p-0 h-auto" 
              onClick={onClearFilters}
            >
              Clear All
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {specialties.map((specialty) => (
              <div key={specialty} className="flex items-center space-x-2">
                <Checkbox
                  id={specialty}
                  data-testid={`filter-specialty-${specialty.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  checked={selectedSpecialties.includes(specialty)}
                  onCheckedChange={() => onSpecialtyChange(specialty)}
                />
                <Label htmlFor={specialty} className="text-sm">{specialty}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-medium" data-testid="filter-header-moc">Mode of consultation</h3>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
        <div className="p-4">
          <RadioGroup value={consultationType} onValueChange={onConsultationTypeChange} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="video" id="video" data-testid="filter-video-consult" />
              <Label htmlFor="video" className="text-sm">Video Consultation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="clinic" id="clinic" data-testid="filter-in-clinic" />
              <Label htmlFor="clinic" className="text-sm">In-clinic Consultation</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
