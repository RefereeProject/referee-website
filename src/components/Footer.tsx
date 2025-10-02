export function Footer() {
  return (
    <footer className="border-t border-blue-200/30 py-10 mt-16 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} The Referee Project. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}


