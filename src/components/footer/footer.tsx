export const Footer = () => {
  return (
    <footer className="bg-primary p-4 text-white h-20 flex items-center justify-between">
      <div className="mx-auto flex max-w-7xl px-4 sm:px-6">
        <p className="text-center font-medium text-balance">
          {`©${new Date().getFullYear()}`} Made by Vladimir with ❤️ for better web.
        </p>
      </div>
    </footer>
  );
};
