
export const Tabs = ({ children }) => <div>{children}</div>;
export const TabsList = ({ children }) => <div className='flex gap-2 mb-2'>{children}</div>;
export const TabsTrigger = ({ value, children }) => <button className='px-4 py-2 border rounded'>{children}</button>;
export const TabsContent = ({ value, children }) => <div>{children}</div>;
