export interface UseCase<Params = any, Result = any> {
  execute(params: Params): Promise<Result>
}
