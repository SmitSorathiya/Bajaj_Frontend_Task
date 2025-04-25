
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building2 } from "lucide-react";
import type { Doctor } from "@/services/doctorService";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow" data-testid="doctor-card">
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0" />
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-blue-900" data-testid="doctor-name">
              {doctor.name}
            </h2>
            <p className="text-gray-600" data-testid="doctor-specialty">
              {doctor.specialty?.join(", ") || "General Physician"}
            </p>
            <p className="text-sm text-gray-500" data-testid="doctor-experience">
              {doctor.experience} yrs exp.
            </p>
            <div className="space-y-1 mt-2">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Building2 className="w-4 h-4" />
                <span>{typeof doctor.clinic === 'string' ? doctor.clinic : (doctor.clinic?.name || 'Unknown Clinic')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{typeof doctor.location === 'string' ? doctor.location : (doctor.location?.address || 'Unknown Location')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right space-y-2">
          <p className="text-lg font-semibold" data-testid="doctor-fee">₹{doctor.fees}</p>
          <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
            Book Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
};
