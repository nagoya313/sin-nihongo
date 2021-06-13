import React, { useEffect, useMemo, useState } from 'react';
import { useSuspenseQuery } from 'react-fetching-library';
import { GetRadicalsParams } from '@sin-nihongo/sin-nihongo-params';
import { IconButtonRouteLink } from '../../../components/Button';
import { Table } from '../../../components/Table';
import { isErrorResponse } from '../../../apiClient';
import { fetchRadicals } from '../../../routes';
import { columns } from './Columns';
import FindInPage from '@material-ui/icons/FindInPage';

type Props = { params?: GetRadicalsParams };

export const SearchResult: React.VFC<Props> = ({ params }) => {
  const [page, setPage] = useState(1);
  const request = useMemo(() => fetchRadicals({ ...params, page }), [page, params]);
  const { payload } = useSuspenseQuery(request);
  const onPageChange = (p: number) => setPage(p);
  useEffect(() => setPage(1), [params]);

  if (isErrorResponse(payload) || typeof payload === 'undefined') {
    return <Table columns={columns} />;
  } else {
    const rows = payload.items.map((radical) => ({
      key: `radical_${radical.id}`,
      id: radical.id,
      radical: String.fromCodePoint(radical.id + 0x2eff),
      read: radical.names.join('、'),
      numberOfStrokes: radical.numberOfStrokes,
      show: <IconButtonRouteLink to={`radicals/${radical.id}/kanjis`} icon={<FindInPage />} />,
    }));

    return (
      <Table
        columns={columns}
        pageNumber={payload?.meta.currentPage}
        totalPages={payload?.meta.totalPages}
        onPageChange={onPageChange}
        rows={rows}
      />
    );
  }
};
