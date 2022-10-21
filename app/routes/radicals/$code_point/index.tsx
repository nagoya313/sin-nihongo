import { HStack, TabPanel } from '@chakra-ui/react';
import { type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { MdEdit } from 'react-icons/md';
import { $path } from 'remix-routes';
import { ValidatedForm } from 'remix-validated-form';
import AdminLinkButton from '~/components/AdminLinkButton';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import ReadOrder from '~/components/ReadOrder';
import SearchPanel from '~/components/SearchPanel';
import SearchStrokeCountInput from '~/components/SearchStrokeCountInput';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import { ORDERS } from '~/components/constants';
import { index } from '~/features/inRadicalKanjis/services.server';
import { MAX_IN_RADICAL_STROKE_COUNT, MIN_IN_RADICAL_STROKE_COUNT } from '~/features/inRadicalKanjis/validators';
import ForNameSelectRadio from '~/features/kanjis/components/ForNameSelectRadio';
import JisLevelSelectRadio from '~/features/kanjis/components/JisLevelSelectRadio';
import RegularSelectRadio from '~/features/kanjis/components/RegularSelectRadio';
import SearchKanjiReadInput from '~/features/kanjis/components/SearchKanjiReadInput';
import RadicalDefine from '~/features/radicals/components/RadicalDefine';
import useRadical from '~/features/radicals/hooks/useRadical';

export const meta: MetaFunction = () => ({ title: '新日本語｜部首索引' });
export const loader = async (args: LoaderArgs) => index(args);

const Radical = () => {
  const { radical, kanjis, formProps } = useRadical();

  return (
    <Page
      avatar={radical.radical}
      title="部首別索引"
      subText={`（現在わ旧日本語字形で部首が「${radical.radical}」の漢字が登録されていますが、新日本語字形で部首が「${radical.radical}」のものに置換予定です。）`}
      action={
        <AdminLinkButton
          aria-label="radical-edit"
          icon={<MdEdit />}
          to={$path(`/radicals/:code_point/edit`, { code_point: radical.code_point })}
        />
      }
    >
      <RadicalDefine radical={radical} />
      <ValidatedForm {...formProps}>
        <SearchPanel>
          <HStack align="center">
            <SearchKanjiReadInput />
            <SearchStrokeCountInput
              name="in_radical_stroke_count"
              label="部首内画数"
              min={MIN_IN_RADICAL_STROKE_COUNT}
              max={MAX_IN_RADICAL_STROKE_COUNT}
            />
          </HStack>
          <HStack align="center">
            <RegularSelectRadio />
            <ForNameSelectRadio />
            <JisLevelSelectRadio />
          </HStack>
        </SearchPanel>
        <OrderTabs orders={ORDERS}>
          <TabPanel>
            {'kanjisOrderByStrokeCount' in kanjis && (
              <StrokeCountOrder data={kanjis.kanjisOrderByStrokeCount} to="/kanjis" />
            )}
          </TabPanel>
          <TabPanel>
            {'kanjisOrderByRead' in kanjis && <ReadOrder data={kanjis.kanjisOrderByRead} to="/kanjis" />}
          </TabPanel>
        </OrderTabs>
      </ValidatedForm>
    </Page>
  );
};

export default Radical;
