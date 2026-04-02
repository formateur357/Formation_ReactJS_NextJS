import { useShopStore } from "../store/useShopStore";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useShopStore((state) => state.theme);
    const toggleTheme = useShopStore((state) => state.toggleTheme);

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    );
}
