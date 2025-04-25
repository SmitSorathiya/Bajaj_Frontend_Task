
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(true);
  const [isConsultationOpen, setIsConsultationOpen] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <Collapsible open={isSortOpen} onOpenChange={setIsSortOpen} className="w-full">
          <div className="p-4 border-b flex items-center justify-between cursor-pointer">
            <CollapsibleTrigger className="flex items-center justify-between w-full" data-testid="filter-header-sort">
              <h3 className="font-medium">Sort by</h3>
              {isSortOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
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
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Collapsible open={isSpecialtiesOpen} onOpenChange={setIsSpecialtiesOpen} className="w-full">
          <div className="p-4 border-b flex items-center justify-between">
            <CollapsibleTrigger className="flex items-center justify-between w-full" data-testid="filter-header-specialty">
              <div className="flex justify-between items-center w-full">
                <h3 className="font-medium">Specialties</h3>
                <Button 
                  variant="ghost" 
                  className="text-sm text-blue-600 hover:text-blue-800 p-0 h-auto z-10" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearFilters();
                  }}
                >
                  Clear All
                </Button>
              </div>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
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
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Collapsible open={isConsultationOpen} onOpenChange={setIsConsultationOpen} className="w-full">
          <div className="p-4 border-b flex items-center justify-between cursor-pointer">
            <CollapsibleTrigger className="flex items-center justify-between w-full" data-testid="filter-header-moc">
              <h3 className="font-medium">Mode of consultation</h3>
              {isConsultationOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
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
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
