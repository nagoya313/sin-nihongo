import { Button } from '@chakra-ui/react';
import { useFormContext } from 'remix-validated-form';

const SearchFormClearButton = () => {
  // isSubmittinがうまく取れてゐないつぽい（getだから？onChange發火だから？）
  const { reset, isSubmitting, submit } = useFormContext();

  return (
    <Button
      type="reset"
      disabled={isSubmitting}
      onClick={() => {
        reset();
        submit();
      }}
    >
      検索条件クリア
    </Button>
  );
};

export default SearchFormClearButton;
