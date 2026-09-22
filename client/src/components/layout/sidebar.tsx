export default function Sidebar() {
  return (
    <aside className="w-48 bg-gray-50 p-4">
      <nav className="flex flex-col gap-2">
        <a href="/home">Home</a>
        <a href="/menu">Menu</a>
        <a href="/about">About</a>
        <a href="/reports">Reports</a>
        <a href="/history">History</a>
      </nav>
    </aside>
  );
}