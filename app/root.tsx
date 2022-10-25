import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import {
  type ErrorBoundaryComponent,
  type LinksFunction,
  type LoaderArgs,
  type MetaFunction,
  json,
} from '@remix-run/node';
import { useCatch } from '@remix-run/react';
import { z } from 'zod';
import Document from './Document';
import Layout from './components/Layout';
import { useOptionalUser } from './hooks/useUser';
import { authenticator } from './session.server';
import { getFlashMessage } from './utils/flash.server';
import { errorMap } from './utils/schemas/errorMap';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: '新日本語',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap',
  },
];

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);
  const { flash, headers } = await getFlashMessage(request);
  return json({ user, flash }, headers);
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  const user = useOptionalUser();

  return (
    <Document title="Error">
      <Box p={8}>
        {user != null ? (
          <>
            <Heading mb={8}>Application Error</Heading>
            <VStack align="start" p={4} overflowX="scroll" whiteSpace="pre" bg="white">
              <Text color="red">{error.stack}</Text>
            </VStack>
          </>
        ) : (
          <Text>なんらかのエラーが発生しました。</Text>
        )}
      </Box>
    </Document>
  );
};

const ERROR_PAGE_TITLE = Object.freeze({
  404: 'Page Not Found',
  405: 'Method Not Allowed',
}) as Record<string, string>;

const ERROR_PAGE_MESSAGE = Object.freeze({
  404: 'お探しのページわ見つかりませんでした。',
  405: '許可されない操作です。',
}) as Record<string, string>;

export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <Document title={ERROR_PAGE_TITLE[caught.status.toString()] ?? 'Error'}>
      <Box p={8}>
        <Text>{ERROR_PAGE_MESSAGE[caught.status.toString()] ?? caught.statusText}</Text>
      </Box>
    </Document>
  );
};

const App = () => {
  z.setErrorMap(errorMap);

  return (
    <Document>
      <Layout />
    </Document>
  );
};

export default App;
