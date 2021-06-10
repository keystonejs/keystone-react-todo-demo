import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from 'urql';
import { Checkbox, Select } from '../components/ui/forms';

import { Button, DeleteButton } from '../components/ui/controls';
import { Container } from '../components/ui/layout';
import { H1 } from '../components/ui/typography';
import { TextInput } from '../components/ui/forms';

export default function Home() {
  const [showComplete, setShowComplete] = useState(true);

  return (
    <Container>
      <H1>TODOs</H1>
      <div>
        <label>
          <Checkbox
            className="mr-2"
            checked={showComplete}
            onChange={e => setShowComplete(e.target.checked)}
          />
          Show complete
        </label>
        <hr className="my-4" />
      </div>
      <TodosList showComplete={showComplete} />
    </Container>
  );
}

function TodosList({ showComplete }: { showComplete: boolean }) {
  const [{ fetching, data, error }, refetch] = useQuery({
    query: gql`
      query ($where: TodoWhereInput) {
        allUsers(orderBy: { id: asc }) {
          id
          name
        }
        authenticatedItem {
          ... on User {
            id
            name
          }
        }
        allTodos(where: $where, orderBy: { id: asc }) {
          id
          label
          isComplete
          assignedTo {
            id
            name
          }
        }
      }
    `,
    variables: { where: showComplete ? {} : { isComplete: false } },
  });
  const [{}, signout] = useMutation(
    gql`
      mutation {
        endSession
      }
    `
  );
  const router = useRouter();
  useEffect(() => {
    if (!fetching && data?.authenticatedItem === null) {
      router.push('/signin');
    }
  });
  if (data?.authenticatedItem === null) {
    return null;
  }
  if (error) {
    return <Fragment>Error!</Fragment>;
  }
  if (fetching) {
    return <Fragment>Loading...</Fragment>;
  }
  return (
    <Fragment>
      {data.authenticatedItem?.__typename === 'User' && (
        <div>
          Authenticated as{' '}
          {data.authenticatedItem.name || data.authenticatedItem.id}
          <Button
            className="ml-4"
            onClick={() => {
              signout(undefined, { additionalTypenames: ['Todo', 'User'] });
            }}
          >
            Sign out
          </Button>
        </div>
      )}
      <hr className="my-4" />
      <ul>
        {data.allTodos.map((todo: any) => {
          return <Todo key={todo.id} todo={todo} users={data.allUsers ?? []} />;
        })}
        <NewTodo users={data.allUsers ?? []} />
      </ul>
    </Fragment>
  );
}

type User = {
  id: string;
  name: string | null;
};

type Todo = {
  id: string;
  isComplete: boolean | null;
  label: string | null;
  assignedTo: User | null;
};

function NewTodo({ users }: { users: User[] }) {
  const [{}, createTodo] = useMutation(gql`
    mutation ($data: TodoCreateInput!) {
      createTodo(data: $data) {
        id
      }
    }
  `);
  const [label, setLabel] = useState('');
  const [assignee, setAssignee] = useState('');
  return (
    <li className="mt-4 pt-3 border-t border-gray-200">
      <form
        onSubmit={event => {
          event.preventDefault();
          createTodo({
            data: {
              label,
              isComplete: false,
              assignedTo:
                assignee === '' ? undefined : { connect: { id: assignee } },
            },
          }).then(({ data }) => {
            if (data?.createTodo) {
              setAssignee('');
              setLabel('');
            }
          });
        }}
      >
        <Checkbox className="mr-2" checked={false} />
        <TextInput value={label} onChange={e => setLabel(e.target.value)} />
        <Select
          className="ml-2"
          value={assignee}
          onChange={event => {
            setAssignee(event.target.value);
          }}
        >
          <option value="">None</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
        <Button type="submit" appearance="primary" className="ml-2">
          Add
        </Button>
      </form>
    </li>
  );
}

function Todo({ todo, users }: { todo: Todo; users: User[] }) {
  const [{ fetching }, update] = useMutation(gql`
    mutation ($id: ID!, $data: TodoUpdateInput!) {
      updateTodo(id: $id, data: $data) {
        id
        isComplete
        label
      }
    }
  `);
  const [{}, deleteTodo] = useMutation(gql`
    mutation ($id: ID!) {
      deleteTodo(id: $id) {
        id
      }
    }
  `);

  return (
    <li>
      <label className={classNames({ 'text-gray-500': todo.isComplete })}>
        <Checkbox
          className="mr-2"
          checked={todo.isComplete || false}
          onChange={event => {
            update({ id: todo.id, data: { isComplete: !todo.isComplete } });
          }}
        />
        {todo.label}
      </label>
      <Select
        className="ml-2"
        value={todo.assignedTo?.id ?? ''}
        onChange={event => {
          update({
            id: todo.id,
            data: {
              assignedTo:
                event.target.value === ''
                  ? { disconnectAll: true }
                  : { connect: { id: event.target.value } },
            },
          });
        }}
      >
        <option value="">None</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </Select>
      <DeleteButton
        onClick={() => {
          deleteTodo({ id: todo.id });
        }}
      />
    </li>
  );
}
