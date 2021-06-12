import FindInPage from '@material-ui/icons/FindInPage';
import { RadicalResponse } from '@sin-nihongo/api-interfaces';
import { IconButtonRouteLink } from '../../components/Button';

export type Fields = 'id' | 'radical' | 'read' | 'numberOfStrokes' | 'show';

export const columns: { field: Fields; headerName: string }[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'radical', headerName: '部首' },
  { field: 'read', headerName: 'よみ' },
  { field: 'numberOfStrokes', headerName: '画数' },
  { field: 'show', headerName: '部首で漢字絞り込み' },
];

export const RadicalRows = (radicals?: RadicalResponse[]) => {
  return radicals?.map((radical): { [key in Fields | 'key']: unknown } => ({
    key: `radical_${radical.id}`,
    id: radical.id,
    radical: String.fromCodePoint(radical.id + 0x2eff),
    read: radical.names.join('、'),
    numberOfStrokes: radical.numberOfStrokes,
    show: <IconButtonRouteLink to={`radicals/${radical.id}/kanjis`} icon={<FindInPage />} />,
  }));
};
