import type { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-7xl py-5 mx-auto">
      <h1 className="text-4xl font-semibold pb-5 mx-1">Dashboard</h1>
      {children}
    </div>
  );
};

export default Layout;
