import { Suspense } from "react";
import { CarResults } from "@/components/CarResults";
import Make from "@/app/types/carsMakes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export async function generateStaticParams() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) =>
    (currentYear - i).toString()
  );

  let makes = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`
    );
    const data = await response.json();
    makes = data.Results;
  } catch (error) {
    console.error("Error fetching makes:", error);
    makes = [{ MakeId: 441 }];
  }

  const params = makes.flatMap((make: Make) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year,
    }))
  );

  return params;
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ makeId: string; year: string }>;
}) {
  const makeId = (await params).makeId;
  const year = (await params).year;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin" />
            </div>
          }
        >
          <CarResults makeId={makeId} year={year} />
        </Suspense>
      </div>
    </div>
  );
}
