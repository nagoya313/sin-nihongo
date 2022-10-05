import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import { useOptionalUser } from '~/hooks/useUser';

const AuthButton = () => {
  const user = useOptionalUser();

  return user != null ? (
    <Menu>
      <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
        <Avatar name={user?.displayName} src={user?.picture} />
      </MenuButton>
      <MenuList>
        <Form action="/logout" method="post">
          <MenuItem type="submit">サインアウト</MenuItem>
        </Form>
      </MenuList>
    </Menu>
  ) : (
    <Form action="/auth" method="post">
      <Button type="submit">Sign in</Button>
    </Form>
  );
};

export default AuthButton;
