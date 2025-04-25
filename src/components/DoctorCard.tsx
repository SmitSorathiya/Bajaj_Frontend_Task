
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@/services/doctorService";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p className="text-gray-600">{doctor.specialty?.join(", ") || "No specialty listed"}</p>
          <p className="text-gray-600">{doctor.qualification}</p>
          <p className="text-gray-600">{doctor.experience} yrs exp.</p>
          <div className="text-gray-600">
            <p>{doctor.clinic}</p>
            <p>{doctor.location}</p>
          </div>
        </div>
        <div className="text-right space-y-2">
          <p className="text-xl font-semibold">₹{doctor.fees}</p>
          <Button className="w-full">Book Appointment</Button>
        </div>
      </div>
    </Card>
  );
};
