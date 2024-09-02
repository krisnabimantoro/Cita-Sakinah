import React from "react";

const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const filters = [
    "Semua Aktivitas",
    "Kegiatan Anak",
    "Kegiatan Guru",
    "Prestasi",
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full ${
            currentFilter === filter
              ? "bg-main text-white font-medium"
              : "bg-white border border-main text-main font-medium"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
