import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { useControlField, useFormContext } from 'remix-validated-form';
import OrderButton from '~/components/OrderButton';

type OrderTabsProps = React.PropsWithChildren<{
  orders: ReadonlyArray<{ key: string; label: string }>;
}>;

const OrderTabs = ({ orders, children }: OrderTabsProps) => {
  const [orderBy, setOrderBy] = useControlField<string>('orderBy');
  const { isValid, isSubmitting, submit } = useFormContext();
  const onChange = (index: number) => {
    setOrderBy(orders[index]!.key);
    submit();
  };

  return (
    <>
      <Tabs mt={4} colorScheme="purple" isLazy onChange={onChange}>
        <TabList>
          {orders.map(({ key, label }) => (
            <Tab key={key} isDisabled={!isValid || isSubmitting}>
              {label}
            </Tab>
          ))}
          <OrderButton name="direction" />
        </TabList>
        <TabPanels>{children}</TabPanels>
      </Tabs>
      <input type="hidden" name="orderBy" value={orderBy ?? orders[0]!.key} />
    </>
  );
};

export default OrderTabs;
