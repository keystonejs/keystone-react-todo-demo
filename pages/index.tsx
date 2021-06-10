const todos = [
  { id: 1, label: 'Init project', isComplete: true },
  { id: 1, label: 'Make things go', isComplete: false },
  { id: 1, label: 'Make things pretty', isComplete: false },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1>TODOs</h1>
      <ul>
        {todos.map(todo => {
          return (
            <li>
              <input type="checkbox" checked={todo.isComplete} />
              {todo.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
