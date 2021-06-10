import React, { useState } from 'react';
import { gql, useMutation } from 'urql';

import { Container } from '../components/layout';
import { H1 } from '../components/typography';
import {
  Button,
  FieldContainer,
  FieldLabel,
  TextInput,
} from '../components/forms';
import { Link } from '../components/link';
import { useRouter } from 'next/router';

export default function SigninPage() {
  const [{ error, data }, authenticate] = useMutation(gql`
    mutation ($email: String!, $password: String!) {
      authenticateUserWithPassword(email: $email, password: $password) {
        __typename
        ... on UserAuthenticationWithPasswordSuccess {
          item {
            id
          }
        }
        ... on UserAuthenticationWithPasswordFailure {
          message
        }
      }
    }
  `);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  return (
    <Container>
      <H1>Sign in</H1>

      <form
        onSubmit={event => {
          event.preventDefault();
          authenticate({ email, password }).then(result => {
            if (
              result.data?.authenticateUserWithPassword?.__typename ===
              'UserAuthenticationWithPasswordSuccess'
            ) {
              router.push('/');
            }
          });
        }}
      >
        {error && <div>{error.toString()}</div>}
        {data?.authenticateUserWithPassword?.__typename ===
          'UserAuthenticationWithPasswordFailure' && (
          <div>{data.authenticateUserWithPassword?.message}</div>
        )}
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
        <Link href="/signup">Want to sign up instead?</Link>
      </div>
    </Container>
  );
}
