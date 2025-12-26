import type { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-7xl mx-auto py-5">
      <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
      {children}
    </div>
  );
};

export default Layout;
