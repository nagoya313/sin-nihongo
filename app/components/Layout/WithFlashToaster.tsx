import { useToast } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { type loader } from '../../root';

type WithFlashToasterProps = React.PropsWithChildren;

const WithFlashToaster = ({ children }: WithFlashToasterProps) => {
  const { flash } = useLoaderData<typeof loader>();
  const toast = useToast();

  useEffect(() => {
    if (flash != null) {
      toast({ title: flash.message, status: flash.status });
    }
  }, [flash, toast]);

  return <>{children}</>;
};

export default WithFlashToaster;
