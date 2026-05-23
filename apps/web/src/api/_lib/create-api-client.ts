type ErrorMap = Record<
  Response["statusText"],
  new (message: string, options: ErrorOptions) => Error
>;

export function createApiClient(baseURL: string, errorMap: ErrorMap = {}) {
  return async <R>(path: string, options: RequestInit = {}): Promise<R> => {
    const response = await fetch(`${baseURL}${path}`, options);

    if (response.ok) {
      return response.json();
    }

    const RequestError =
      errorMap[response.statusText] || errorMap.unknown || Error;

    throw new RequestError(response.statusText, {
      cause: {
        status: response.status,
      },
    });
  };
}
