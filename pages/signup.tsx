import { useState } from 'react';
import { gql, useMutation } from 'urql';

import { Container } from '../components/layout';
import { H1 } from '../components/typography';
import {
  Button,
  FieldContainer,
  FieldLabel,
  TextInput,
} from '../components/forms';
import { useRouter } from 'next/router';
import { Link } from '../components/link';

export default function SigninPage() {
  const [{ error, data }, signup] = useMutation(gql`
    mutation ($name: String!, $email: String!, $password: String!) {
      createUser(data: { name: $name, email: $email, password: $password }) {
        __typename
        id
      }
      authenticateUserWithPassword(email: $email, password: $password) {
        __typename
      }
    }
  `);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  return (
    <Container>
      <H1>Sign in</H1>
      <form
        onSubmit={event => {
          event.preventDefault();
          signup({ name, email, password }).then(result => {
            if (result.data?.createUser) {
              router.push('/');
            }
          });
        }}
      >
        {error && <div>{error.toString()}</div>}
        <FieldContainer>
          <FieldLabel>Name</FieldLabel>
          <TextInput
            onChange={event => {
              setName(event.target.value);
            }}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>Email address</FieldLabel>
          <TextInput
            onChange={event => {
              setEmail(event.target.value);
            }}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>Password</FieldLabel>
          <TextInput
            type="password"
            onChange={event => {
              setPassword(event.target.value);
            }}
          />
        </FieldContainer>
        <Button type="submit">Sign In</Button>
      </form>
      <hr className="my-4" />
      <div>
        <Link href="/signin">Already have an account? Sign in</Link>
      </div>
    </Container>
  );
}
