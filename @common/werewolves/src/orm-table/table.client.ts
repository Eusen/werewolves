import {Requester} from "../services/request";
import { FindOptions } from './find.options';

export class TableClient<T> {
  private requester: Requester;

  static create<T>(tableName: string) {
    return new TableClient<T>(tableName);
  }

  setRequester(requester: Requester) {
    this.requester = requester;
  }

  private constructor(private tableName: string) {
  }

  getEndpoint(suffix = '/') {
    return `/model/${this.tableName}${suffix}`;
  }

  get(id: number) {
    return this.requester.get<T>(this.getEndpoint(`/${id}/`)).then(resp => resp.data);
  }

  list(queryParams: FindOptions) {
    return this.requester.get<T>(this.getEndpoint(), queryParams).then(resp => resp.dataset);
  }

  create(data: T) {
    return this.requester.post<T>(this.getEndpoint(), data).then(resp => resp.data);
  }

  update(data: T) {
    return this.requester.patch<T>(this.getEndpoint(`/${data['id']}/`), data).then(resp => resp.data);
  }

  delete(id: number) {
    return this.requester.delete<T>(this.getEndpoint(`/${id}/`)).then(resp => resp.data);
  }
}
