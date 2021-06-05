export const splitData = (data: string | undefined) => {
  return data?.split('$')?.map((t, i) => {
    return (
      <span key={i}>
        {t}
        <br />
      </span>
    );
  });
};
