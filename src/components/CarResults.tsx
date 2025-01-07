import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import EmptyResults from "@/components/EmptyResults";
import Make from "@/app/types/carsMakes";
async function getModels(makeId: string, year: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch models");
  }

  const data = await res.json();
  return data.Results;
}

export async function CarResults({
  makeId,
  year,
}: {
  makeId: string;
  year: string;
}) {
  let models: Make[] = [];
  let errorMessage = "";

  try {
    models = await getModels(makeId, year);
  } catch {
    errorMessage = "Error fetching models. Please try again later.";
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 ">
            Available Models
          </h1>
        </div>
        <Link href="/">
          <button className="flex items-center gap-2 hover:scale-105 duration-300 group hover:text-stone-900">
            <IoIosArrowRoundBack className="group-hover:scale-150" />
            Back to Search
          </button>
        </Link>
      </div>

      {errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : models.length === 0 ? (
        <EmptyResults />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {models.map((model: Make) => (
            <div
              key={model.ModelId}
              className="p-4 rounded-lg border border-gray-200 select-none hover:border-stone-900 transition-colors"
            >
              <h3 className="font-semibold text-lg mb-1">{model.MakeName}</h3>
              <p className="text-sm text-gray-500 ">
                {model.MakeName} - {year}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
