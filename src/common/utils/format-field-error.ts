export const formatFieldError = (dto: any, message: string) => {
  return {
    [Object.keys(dto)[0]]: {
      value: Object.values(dto)[0],
      message: [message],
    },
  };
};
