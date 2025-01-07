import { Suspense } from "react";
import { CarResults } from "./car-results";
import Make from "@/app/types/carsMakes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export async function generateStaticParams() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) =>
    (currentYear - i).toString()
  );

  const response = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
  const data = await response.json();
  const makes = data.Results;

  const params = makes.flatMap((make: Make) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year,
    }))
  );

  return params;
}

export default function ResultPage({
  params,
}: {
  params: { makeId: string; year: string };
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100  p-8">
      <div className="max-w-4xl mx-auto">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin" />
            </div>
          }
        >
          <CarResults makeId={params.makeId} year={params.year} />
        </Suspense>
      </div>
    </div>
  );
}
