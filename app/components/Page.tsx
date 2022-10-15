import Main from './Main';
import PageInfo from './PageInfo';

type PageProps = React.PropsWithChildren<{
  avatar: React.ReactNode;
  title: string;
  subText?: string;
  action?: React.ReactNode;
}>;

const Page = ({ children, ...props }: PageProps) => (
  <Main>
    <PageInfo {...props} />
    {children}
  </Main>
);

export default Page;
