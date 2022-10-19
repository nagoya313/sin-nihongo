import { type AppData } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { useEffect } from 'react';

type Updated<TData> = NonNullable<ReturnType<typeof useActionData<TData>>>;

const useActionUpdate = <TData extends AppData>(updater: (updated: Updated<TData>) => void) => {
  const updated = useActionData<TData>();

  useEffect(() => {
    if (updated != null) {
      updater(updated);
    }
  }, [updated, updater]);
};

export default useActionUpdate;
