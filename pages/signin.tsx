import React, { useState } from 'react';
import { gql, useMutation } from 'urql';

import { Button } from '../components/ui/controls';
import { Container } from '../components/ui/layout';
import { H1 } from '../components/ui/typography';
import { FieldContainer, FieldLabel, TextInput } from '../components/ui/forms';
import { Link } from '../components/ui/link';
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
            size="large"
            onChange={event => {
              setEmail(event.target.value);
            }}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>Password</FieldLabel>
          <TextInput
            size="large"
            type="password"
            onChange={event => {
              setPassword(event.target.value);
            }}
          />
        </FieldContainer>
        <Button type="submit" size="large" appearance="primary">
          Sign In
        </Button>
      </form>
      <hr className="my-4" />
      <div>
        <Link href="/signup">Want to sign up instead?</Link>
      </div>
    </Container>
  );
}
