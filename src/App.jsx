import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Todo from './Todo';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
          <Todo />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
