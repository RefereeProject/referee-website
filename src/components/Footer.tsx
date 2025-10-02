export function Footer() {
  return (
    <footer className="border-t border-blue-200/30 py-8 sm:py-10 mt-16 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm sm:text-base text-gray-600">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} The Referee Project. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}


