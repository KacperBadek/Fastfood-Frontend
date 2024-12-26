export default function Sidebar({categories, selectedType, onTypeSelect}) {
    return (
        <div className="border-r border-gray-200 pr-4 w-1/3">
            <ul className="space-y-2">
                <li>
                    <button
                        className={`w-full text-left p-2 rounded ${
                            selectedType === null
                                ? "bg-gray-800 text-white"
                                : "hover:bg-gray-500"
                        }`}
                        onClick={() => onTypeSelect(null)}
                    >
                        EVERYTHING
                    </button>
                </li>
                {categories.map((type) => (
                    <li key={type}>
                        <button
                            className={`w-full text-left p-2 rounded ${
                                selectedType === type
                                    ? "bg-gray-800 text-white"
                                    : "hover:bg-gray-500"
                            }`}
                            onClick={() => onTypeSelect(selectedType === type ? null : type)}
                        >
                            {type}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
