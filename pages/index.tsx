import { gql, useQuery, useMutation } from 'urql';

import { Container } from '../components/layout';
import { H1 } from '../components/typography';

const todos = [
  { id: 1, label: 'Init project', isComplete: true },
  { id: 1, label: 'Make things go', isComplete: false },
  { id: 1, label: 'Make things pretty', isComplete: false },
];

export default function Home() {
  const [{ fetching, data, error }] = useQuery({
    query: gql`
      query {
        allTodos {
          id
          label
          isComplete
        }
      }
    `,
  });
  if (error) {
    return 'Error!';
  }
  if (fetching) {
    return 'Loading...';
  }
  return (
    <Container>
      <H1>TODOs</H1>
      <ul>
        {data.allTodos.map((todo: any) => {
          return <Todo key={todo.id} todo={todo} />;
        })}
      </ul>
    </Container>
  );
}

type Todo = {
  id: string;
  isComplete: boolean | null;
  label: string | null;
};

function Todo({ todo }: { todo: Todo }) {
  const [{ fetching }, mutate] = useMutation(gql`
    mutation ($id: ID!, $isComplete: Boolean!) {
      updateTodo(id: $id, data: { isComplete: $isComplete }) {
        id
        isComplete
        label
      }
    }
  `);
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.isComplete || false}
        onChange={event => {
          mutate({ id: todo.id, isComplete: !todo.isComplete });
        }}
      />
      {todo.label}
    </li>
  );
}
