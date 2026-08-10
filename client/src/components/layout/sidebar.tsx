export default function Sidebar() {
  return (
    <aside className="w-48 bg-gray-50 p-4">
      <nav className="flex flex-col gap-2">
        <a href="/">Home</a>
        <a href="/menu">Menu</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </aside>
  );
}