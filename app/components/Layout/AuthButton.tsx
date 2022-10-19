import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import { $path } from 'remix-routes';
import { useOptionalUser } from '~/hooks/useUser';

const AuthButton = () => {
  const user = useOptionalUser();

  return user != null ? (
    <Menu>
      <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
        <Avatar name={user.displayName} src={user.picture} />
      </MenuButton>
      <MenuList>
        <Form action={$path('/logout')} method="post">
          <MenuItem type="submit">登出</MenuItem>
        </Form>
      </MenuList>
    </Menu>
  ) : (
    <Form action={$path('/auth')} method="post">
      <Button type="submit">登録</Button>
    </Form>
  );
};

export default AuthButton;
