"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Filter from "../components/Filter";
import Make from "./types/carsMakes";
import { FaCarSide } from "react-icons/fa6";

export default function Home() {
  const [makes, setMakes] = useState<Make[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            mode: "cors",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMakes(data.Results);
      } catch (error) {
        console.error("Error fetching makes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMakes();
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i).map(
    String
  );

  const handleNext = () => {
    if (selectedMake && year) {
      router.push(`/result/${selectedMake}/${year}`);
    }
  };

  const makeOptions = makes.map((make) => ({
    value: String(make.MakeId),
    label: make.MakeName,
  }));

  const yearOptions = years.map((year) => ({
    value: year,
    label: year,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 ">
      <div className="max-w-4xl mx-auto pt-16 px-4">
        <div className="bg-white  rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <FaCarSide className="text-4xl" />
            <h1 className="text-3xl font-bold text-gray-900 ">
              Vehicle Search
            </h1>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ">
                Car Make
              </label>
              <Filter
                text="Select Make"
                options={makeOptions}
                onChange={setSelectedMake}
                disabled={loading}
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ">
                  Year
                </label>
                <Filter
                  text="Select Year"
                  disabled={loading}
                  options={yearOptions}
                  onChange={setYear}
                />
              </div>
            </div>

            <button
              className={`w-full bg-stone-800 text-white py-4 rounded-md font-bold hover:bg-stone-900 ${
                !selectedMake || !year
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100"
              }`}
              onClick={handleNext}
              disabled={!selectedMake || !year}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
