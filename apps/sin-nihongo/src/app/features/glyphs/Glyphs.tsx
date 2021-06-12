import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useAuth0 } from '@auth0/auth0-react';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import { apiRoutes, GetGlyphsRequest } from '@sin-nihongo/api-interfaces';
import { GetGlyphsParams } from '@sin-nihongo/sin-nihongo-params';
import { IconButton, IconButtonRouteLink } from '../../components/Button';
import { BuhinDispatchContext } from '../../providers/Buhin';
import { Card, CardContent, CardHeader } from '../../components/Card';
import { Dialog } from '../../components/Dialog';
import { Divider } from '../../components/Divider';
import { Form } from '../../components/Form';
import { FormTextField } from '../../components/FormTextField';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { ResponseNotice } from '../../components/ResponseNotice';
import { Table } from '../../components/Table';
import { Text } from '../../components/Typography';
import { useDisplayNotice } from '../../components/Notice';
import { getAccessTokenOptions } from '../../utils/auth0';
import { fetchWithToken, useFetch } from '../../utils/axios';
import { splitData } from '../../utils/kageData';

const resolver = classValidatorResolver(GetGlyphsParams);

type Fields = 'glyph' | 'name' | 'data' | 'show' | 'delete';

const columns: { field: Fields; headerName: string }[] = [
  { field: 'name', headerName: '名前' },
  { field: 'glyph', headerName: '生成グリフ' },
  { field: 'data', headerName: 'KAGEデータ' },
  { field: 'show', headerName: '' },
  { field: 'delete', headerName: '' },
];

export const Glyphs = () => {
  const {
    register,
    handleSubmit,
    formState: { isValidating, isValid, errors },
  } = useForm<GetGlyphsParams>({ mode: 'onChange', resolver, defaultValues: { nameLike: '' } });
  const [open, setOpen] = React.useState(false);
  const { displaySuccess, displayError } = useDisplayNotice();
  const [deleteID, setDeleteId] = React.useState('');
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [searchParams, setSearchParams] = useState<GetGlyphsRequest>();
  const [pageNumber, setPageNumber] = useState(1);
  const buhinDispatch = useContext(BuhinDispatchContext);
  const [{ data: getData, loading: getLoading, error: getError }, getRefetch] = useFetch(apiRoutes.getGlyphs, {
    page: pageNumber,
    ...searchParams,
  });
  const [{ data: deleteData, error: deleteError }, deleteExecute] = useFetch(apiRoutes.deleteGlyph(deleteID));
  const onPageChange = (page: number) => setPageNumber(page);
  const onSubmit = (data: GetGlyphsParams) => setSearchParams({ ...data });

  const onClose = async (yes: boolean) => {
    if (yes) {
      const token = await getAccessTokenSilently(getAccessTokenOptions);
      await fetchWithToken(deleteExecute, token);
      setDeleteId('');
      getRefetch().catch();
    }
    setOpen(false);
  };

  useEffect(() => setPageNumber(1), [searchParams]);
  useEffect(() => {
    getData && buhinDispatch({ type: 'setGlyphs', glyphs: getData });
  }, [getData, buhinDispatch]);
  useEffect(() => {
    deleteData && displaySuccess(deleteData.message);
  }, [deleteData, displaySuccess]);
  useEffect(() => {
    deleteError && displayError(deleteError.message);
  }, [deleteError, displayError]);

  const onDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  useEffect(() => {
    !isValidating && isValid && handleSubmit(onSubmit)();
  }, [isValidating, isValid]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = getData?.data.items?.map((glyph): { [key in Fields | 'key']: any } => ({
    key: `glyph_${glyph.id}`,
    name: glyph.name,
    glyph: <GlyphCanvas name={glyph.name} />,
    data: splitData(glyph.data),
    show: <IconButtonRouteLink to="/" icon={<DescriptionIcon />} />,
    delete: isAuthenticated && (
      <IconButton
        icon={<DeleteIcon />}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        onClick={() => onDelete(glyph.id!)}
      />
    ),
  }));

  return (
    <Card>
      <CardHeader
        avatarText="グ"
        title="グリフ一覧"
        action={isAuthenticated ? <IconButtonRouteLink to="/glyphs/new" icon={<BuildIcon />} /> : undefined}
      />
      <CardContent>
        <Text>
          新日本語で採用された字形およびその部品のKAGEデータとその生成グリフお閲覧できます。
          グリフ名で検索もできます（グリフ名わグリフウィキとおーむね一致です）。
        </Text>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <FormTextField
            register={register}
            errors={errors}
            name="nameLike"
            label="グリフ名"
            type="search"
            helperText="例：u4e00-j"
          />
        </Form>
        <Divider />
        <ResponseNotice loading={getLoading} error={getError} />
        <Table<Fields>
          columns={columns}
          rows={rows}
          pageNumber={pageNumber}
          totalPages={getData?.data.meta?.totalPages}
          onPageChange={onPageChange}
        />
      </CardContent>
      {isAuthenticated && <Dialog open={open} onClose={onClose} title="グリフお本当に削除しますか？" />}
    </Card>
  );
};
