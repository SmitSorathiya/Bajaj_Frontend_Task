
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <Card className="p-4 space-y-6">
      <div>
        <h3 className="font-medium mb-3">Sort by</h3>
        <RadioGroup value={sortBy} onValueChange={onSortChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fees" id="fees" />
            <Label htmlFor="fees">Price: Low-High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="experience" id="experience" />
            <Label htmlFor="experience">Experience - Most Experience first</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-medium mb-3">Mode of consultation</h3>
        <RadioGroup value={consultationType} onValueChange={onConsultationTypeChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="video" />
            <Label htmlFor="video">Video Consultation</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="clinic" id="clinic" />
            <Label htmlFor="clinic">In-clinic Consultation</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-medium mb-3">Specialties</h3>
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={specialty}
                checked={selectedSpecialties.includes(specialty)}
                onCheckedChange={() => onSpecialtyChange(specialty)}
              />
              <Label htmlFor={specialty}>{specialty}</Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={onClearFilters}>
        Clear All Filters
      </Button>
    </Card>
  );
};
