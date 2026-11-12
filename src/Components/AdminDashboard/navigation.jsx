import { useState } from "react";

const sections = [
  {
    id: "food",
    label: "Food",
    forms: [
      { id: "createFood", label: "Create food" },
      { id: "updateFood", label: "Update food" },
      { id: "deleteFood", label: "Delete food" },
    ],
  },
  {
    id: "riders",
    label: "Riders",
    forms: [
      { id: "createRider", label: "Create rider" },
      { id: "updateRider", label: "Update rider" },
      { id: "deleteRider", label: "Delete rider" },
    ],
  },
];

function Navigation({ activeForm, onSelect }) {
  const [openSections, setOpenSections] = useState({
    food: true,
    riders: true,
  });

  const toggleSection = (sectionId) => {
    setOpenSections((currentSections) => ({
      ...currentSections,
      [sectionId]: !currentSections[sectionId],
    }));
  };

  return (
    <aside className="w-60 shrink-0 border-r border-gray-200 bg-white p-4">
      <nav aria-label="Admin dashboard navigation" className="space-y-2">
        {sections.map((section) => (
          <div key={section.id}>
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              aria-expanded={openSections[section.id]}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-semibold text-gray-800 hover:bg-orange-50"
            >
              {section.label}
              <span aria-hidden="true">
                {openSections[section.id] ? "−" : "+"}
              </span>
            </button>

            {openSections[section.id] && (
              <ul className="mt-1 space-y-1 pl-3">
                {section.forms.map((form) => (
                  <li key={form.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(form.id)}
                      aria-current={activeForm === form.id ? "page" : undefined}
                      className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                        activeForm === form.id
                          ? "bg-orange-100 font-medium text-orange-800"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {form.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Navigation;
