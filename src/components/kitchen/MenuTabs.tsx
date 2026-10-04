"use client";
export function MenuTabs({
  sections,
  selected,
  onSelect,
}: {
  sections: string[];
  selected: string;
  onSelect: (section: string) => void;
}) {
  return (
    <div className="menu-sticky">
      <div className="menu-tabs" role="tablist" aria-label="Menu sections">
        {sections.map((label) => (
          <button
            role="tab"
            aria-selected={selected === label}
            aria-controls="menu-items"
            key={label}
            className={selected === label ? "selected" : ""}
            onClick={() => onSelect(label)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
