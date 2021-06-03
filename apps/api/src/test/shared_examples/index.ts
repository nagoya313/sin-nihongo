export const itBehavesLike = (sharedExampleName, args) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require(`./${sharedExampleName}`)(args);
};
