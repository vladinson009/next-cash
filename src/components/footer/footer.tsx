export const Footer = () => {
  return (
    <footer>
      <div className="mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6">
        <p className="text-center font-medium text-balance">
          {`©${new Date().getFullYear()}`} Made by Vladimir with ❤️ for better web.
        </p>
      </div>
    </footer>
  );
};
