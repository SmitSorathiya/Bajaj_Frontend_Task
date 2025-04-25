
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@/services/doctorService";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="p-6" data-testid="doctor-card">
      <div className="flex justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold" data-testid="doctor-name">{doctor.name}</h2>
          <p className="text-gray-600" data-testid="doctor-specialty">
            {doctor.specialty?.join(", ") || "No specialty listed"}
          </p>
          <p className="text-gray-600" data-testid="doctor-experience">{doctor.experience} yrs exp.</p>
          <div className="text-gray-600">
            <p>{typeof doctor.clinic === 'string' ? doctor.clinic : (doctor.clinic?.name || 'Unknown Clinic')}</p>
            <p>{typeof doctor.location === 'string' ? doctor.location : (doctor.location?.address || 'Unknown Location')}</p>
          </div>
        </div>
        <div className="text-right space-y-2">
          <p className="text-xl font-semibold" data-testid="doctor-fee">₹{doctor.fees}</p>
          <Button className="w-full">Book Appointment</Button>
        </div>
      </div>
    </Card>
  );
};
