import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const TODOS_KEY = 'todos';

const getTodos = () => {
  const stored = localStorage.getItem(TODOS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const setTodos = (todos) => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};

export const useTodos = () => {
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const addTodo = useMutation({
    mutationFn: (text) => {
      const updated = [...getTodos(), { id: Date.now(), text, completed: false }];
      setTodos(updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateTodo = useMutation({
    mutationFn: (updatedTodo) => {
      const updated = getTodos().map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      setTodos(updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: (id) => {
      const updated = getTodos().filter(todo => todo.id !== id);
      setTodos(updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const clearTodos = useMutation({
    mutationFn: () => {
      setTodos([]);
      return [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return { todos, addTodo, updateTodo, deleteTodo, clearTodos };
};
