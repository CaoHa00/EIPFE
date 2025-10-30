"use client";

import { useState } from "react";
import GeneralInformationForm from "./_components/generalInformationForm";
import EnvironmentPermitForm from "./_components/environmentalLicenseForm";
import OperationalStatisticsForm from "./_components/operationalStatisticsForm";

export default function BusinessDetailsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General Information" },
    { id: "environment", label: "Environment Permit" },
    { id: "operations", label: "Operational Statistics" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6">
      <h1 className="text-2xl font-semibold mb-6">Business Details</h1>

      <div className="flex gap-4 border-b border-white/20 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 transition cursor-pointer ${
              activeTab === tab.id
                ? "border-b-2 border-blue-300 text-blue-300"
                : "text-white hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
        {activeTab === "general" && <GeneralInformationForm />}

        {activeTab === "environment" && <EnvironmentPermitForm />}

        {activeTab === "operations" && <OperationalStatisticsForm />}
      </div>
    </div>
  );
}
