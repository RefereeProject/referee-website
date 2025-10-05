export function Footer() {
  return (
    <footer className="border-t border-blue-200/30 py-8 sm:py-10 mt-16 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm sm:text-base text-gray-600">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} The Referee Project. All rights
          reserved.
        </p>
        <p className="text-center sm:text-left mt-2">
          An initiative of The Alethea Foundation
          <br />
          Chamber of Commerce (KVK) number: 93470140
        </p>
      </div>
    </footer>
  );
}


