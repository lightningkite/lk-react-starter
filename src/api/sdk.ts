// Replace this file with the automatically generated lightning server SDK

import {
  AggregateQuery,
  apiCall,
  Condition,
  EntryChange,
  GroupAggregateQuery,
  GroupCountQuery,
  MassModification,
  Modification,
  Path,
  Query
} from "@lightningkite/lightning-server-simplified"

export interface User {
  _id: string
  name: string
  email: string
  phone: string
  profilePic: string
  createdAt: string
  modifiedAt: string
}

export interface SSOAuthSubmission {
  value: string
  clientKey: string
}

export interface Api {
  readonly auth: {
    emailLoginLink(input: string): Promise<void>
    loginSSO(input: string): Promise<string>
    submitSSO(input: SSOAuthSubmission): Promise<string>
    getSelf(requesterToken: string): Promise<User>
  }

  readonly user: {
    query(
      requesterToken: string,
      input: Query<User>,
      files?: Record<Path<Query<User>>, File>
    ): Promise<User[]>
    detail(requesterToken: string, id: string): Promise<User>
    insertBulk(
      requesterToken: string,
      input: User[],
      files?: Record<Path<User[]>, File>
    ): Promise<User[]>
    insert(
      requesterToken: string,
      input: User,
      files?: Record<Path<User>, File>
    ): Promise<User>
    upsert(
      requesterToken: string,
      id: string,
      input: User,
      files?: Record<Path<User>, File>
    ): Promise<User>
    bulkReplace(
      requesterToken: string,
      input: User[],
      files?: Record<Path<User[]>, File>
    ): Promise<User[]>
    replace(
      requesterToken: string,
      id: string,
      input: User,
      files?: Record<Path<User>, File>
    ): Promise<User>
    bulkModify(
      requesterToken: string,
      input: MassModification<User>,
      files?: Record<Path<MassModification<User>>, File>
    ): Promise<number>
    modifyWithDiff(
      requesterToken: string,
      id: string,
      input: Modification<User>,
      files?: Record<Path<Modification<User>>, File>
    ): Promise<EntryChange<User>>
    modify(
      requesterToken: string,
      id: string,
      input: Modification<User>,
      files?: Record<Path<Modification<User>>, File>
    ): Promise<User>
    bulkDelete(
      requesterToken: string,
      input: Condition<User>,
      files?: Record<Path<Condition<User>>, File>
    ): Promise<number>
    delete(requesterToken: string, id: string): Promise<void>
    count(
      requesterToken: string,
      input: Condition<User>,
      files?: Record<Path<Condition<User>>, File>
    ): Promise<number>
    groupCount(
      requesterToken: string,
      input: GroupCountQuery<User>,
      files?: Record<Path<GroupCountQuery<User>>, File>
    ): Promise<Record<string, number>>
    aggregate(
      requesterToken: string,
      input: AggregateQuery<User>,
      files?: Record<Path<AggregateQuery<User>>, File>
    ): Promise<number | null | undefined>
    groupAggregate(
      requesterToken: string,
      input: GroupAggregateQuery<User>,
      files?: Record<Path<GroupAggregateQuery<User>>, File>
    ): Promise<Record<string, number | null | undefined>>
  }
}

export class RequesterSession {
  constructor(public api: Api, public requesterToken: string) {}

  readonly auth = {
    api: this.api,
    requesterToken: this.requesterToken,

    getSelf(): Promise<User> {
      return this.api.auth.getSelf(this.requesterToken)
    },
    emailLoginLink(input: string): Promise<void> {
      return this.api.auth.emailLoginLink(input)
    },
    loginSSO(input: string): Promise<string> {
      return this.api.auth.loginSSO(input)
    },
    submitSSO(input: SSOAuthSubmission): Promise<string> {
      return this.api.auth.submitSSO(input)
    }
  }

  readonly user = {
    api: this.api,
    requesterToken: this.requesterToken,
    query(
      input: Query<User>,
      files?: Record<Path<Query<User>>, File>
    ): Promise<User[]> {
      return this.api.user.query(this.requesterToken, input, files)
    },
    detail(id: string): Promise<User> {
      return this.api.user.detail(this.requesterToken, id)
    },
    insertBulk(
      input: User[],
      files?: Record<Path<User[]>, File>
    ): Promise<User[]> {
      return this.api.user.insertBulk(this.requesterToken, input, files)
    },
    insert(input: User, files?: Record<Path<User>, File>): Promise<User> {
      return this.api.user.insert(this.requesterToken, input, files)
    },
    upsert(
      id: string,
      input: User,
      files?: Record<Path<User>, File>
    ): Promise<User> {
      return this.api.user.upsert(this.requesterToken, id, input, files)
    },
    bulkReplace(
      input: User[],
      files?: Record<Path<User[]>, File>
    ): Promise<User[]> {
      return this.api.user.bulkReplace(this.requesterToken, input, files)
    },
    replace(
      id: string,
      input: User,
      files?: Record<Path<User>, File>
    ): Promise<User> {
      return this.api.user.replace(this.requesterToken, id, input, files)
    },
    bulkModify(
      input: MassModification<User>,
      files?: Record<Path<MassModification<User>>, File>
    ): Promise<number> {
      return this.api.user.bulkModify(this.requesterToken, input, files)
    },
    modifyWithDiff(
      id: string,
      input: Modification<User>,
      files?: Record<Path<Modification<User>>, File>
    ): Promise<EntryChange<User>> {
      return this.api.user.modifyWithDiff(this.requesterToken, id, input, files)
    },
    modify(
      id: string,
      input: Modification<User>,
      files?: Record<Path<Modification<User>>, File>
    ): Promise<User> {
      return this.api.user.modify(this.requesterToken, id, input, files)
    },
    bulkDelete(
      input: Condition<User>,
      files?: Record<Path<Condition<User>>, File>
    ): Promise<number> {
      return this.api.user.bulkDelete(this.requesterToken, input, files)
    },
    delete(id: string): Promise<void> {
      return this.api.user.delete(this.requesterToken, id)
    },
    count(
      input: Condition<User>,
      files?: Record<Path<Condition<User>>, File>
    ): Promise<number> {
      return this.api.user.count(this.requesterToken, input, files)
    },
    groupCount(
      input: GroupCountQuery<User>,
      files?: Record<Path<GroupCountQuery<User>>, File>
    ): Promise<Record<string, number>> {
      return this.api.user.groupCount(this.requesterToken, input, files)
    },
    aggregate(
      input: AggregateQuery<User>,
      files?: Record<Path<AggregateQuery<User>>, File>
    ): Promise<number | null | undefined> {
      return this.api.user.aggregate(this.requesterToken, input, files)
    },
    groupAggregate(
      input: GroupAggregateQuery<User>,
      files?: Record<Path<GroupAggregateQuery<User>>, File>
    ): Promise<Record<string, number | null | undefined>> {
      return this.api.user.groupAggregate(this.requesterToken, input, files)
    }
  }
}

export class LiveApi implements Api {
  public constructor(
    public httpUrl: string,
    public socketUrl: string = httpUrl,
    public extraHeaders: Record<string, string> = {}
  ) {}

  readonly auth = {
    httpUrl: this.httpUrl,
    socketUrl: this.socketUrl,
    extraHeaders: this.extraHeaders,
    emailLoginLink(input: string): Promise<void> {
      return apiCall(`${this.httpUrl}/auth/login-email-link`, input, {
        method: "POST"
      }).then((x) => undefined)
    },
    loginSSO(input: string): Promise<string> {
      return apiCall(`${this.httpUrl}/auth/login-sso`, input, {
        method: "POST"
      }).then((x) => x.json())
    },
    submitSSO(input: SSOAuthSubmission): Promise<string> {
      return apiCall(`${this.httpUrl}/auth/submit-sso`, input, {
        method: "POST"
      }).then((x) => x.json())
    },
    getSelf(requesterToken: string): Promise<User> {
      return apiCall(`${this.httpUrl}/auth/self/user`, undefined, {
        method: "GET",
        headers: {
          ...this.extraHeaders,
          Authorization: `Bearer ${requesterToken}`
        }
      }).then((x) => x.json())
    }
  }

  readonly user = {
    httpUrl: this.httpUrl,
    socketUrl: this.socketUrl,
    extraHeaders: this.extraHeaders,
    query(
      requesterToken: string,
      input: Query<User>,
      files?: Record<Path<Query<User>>, File>
    ): Promise<User[]> {
      return apiCall(
        `${this.httpUrl}/users/rest/query`,
        input,
        {
          method: "POST",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    },
    detail(requesterToken: string, id: string): Promise<User> {
      return apiCall(`${this.httpUrl}/users/rest/${id}`, undefined, {
        method: "GET",
        headers: {
          ...this.extraHeaders,
          Authorization: `Bearer ${requesterToken}`
        }
      }).then((x) => x.json())
    },
    insertBulk(
      requesterToken: string,
      input: User[],
      files?: Record<Path<User[]>, File>
    ): Promise<User[]> {
      return apiCall(
        `${this.httpUrl}/users/rest/bulk`,
        input,
        {
          method: "POST",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    },
    insert(
      requesterToken: string,
      input: User,
      files?: Record<Path<User>, File>
    ): Promise<User> {
      return apiCall(
        `${this.httpUrl}/users/rest`,
        input,
        {
          method: "POST",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    },
    upsert(
      requesterToken: string,
      id: string,
      input: User,
      files?: Record<Path<User>, File>
    ): Promise<User> {
      return apiCall(
        `${this.httpUrl}/users/rest/${id}`,
        input,
        {
          method: "POST",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    },
    bulkReplace(
      requesterToken: string,
      input: User[],
      files?: Record<Path<User[]>, File>
    ): Promise<User[]> {
      return apiCall(
        `${this.httpUrl}/users/rest`,
        input,
        {
          method: "PUT",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    },
    replace(
      requesterToken: string,
      id: string,
      input: User,
      files?: Record<Path<User>, File>
    ): Promise<User> {
      return apiCall(
        `${this.httpUrl}/users/rest/${id}`,
        input,
        {
          method: "PUT",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    },
    bulkModify(
      requesterToken: string,
      input: MassModification<User>,
      files?: Record<Path<MassModification<User>>, File>
    ): Promise<number> {
      return apiCall(
        `${this.httpUrl}/users/rest/bulk`,
        input,
        {
          method: "PATCH",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    },
    modifyWithDiff(
      requesterToken: string,
      id: string,
      input: Modification<User>,
      files?: Record<Path<Modification<User>>, File>
    ): Promise<EntryChange<User>> {
      return apiCall(
        `${this.httpUrl}/users/rest/${id}/delta`,
        input,
        {
          method: "PATCH",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    },
    modify(
      requesterToken: string,
      id: string,
      input: Modification<User>,
      files?: Record<Path<Modification<User>>, File>
    ): Promise<User> {
      return apiCall(
        `${this.httpUrl}/users/rest/${id}`,
        input,
        {
          method: "PATCH",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    },
    bulkDelete(
      requesterToken: string,
      input: Condition<User>,
      files?: Record<Path<Condition<User>>, File>
    ): Promise<number> {
      return apiCall(
        `${this.httpUrl}/users/rest/bulk-delete`,
        input,
        {
          method: "POST",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    },
    delete(requesterToken: string, id: string): Promise<void> {
      return apiCall(`${this.httpUrl}/users/rest/${id}`, undefined, {
        method: "DELETE",
        headers: {
          ...this.extraHeaders,
          Authorization: `Bearer ${requesterToken}`
        }
      }).then((x) => undefined)
    },
    count(
      requesterToken: string,
      input: Condition<User>,
      files?: Record<Path<Condition<User>>, File>
    ): Promise<number> {
      return apiCall(
        `${this.httpUrl}/users/rest/count`,
        input,
        {
          method: "POST",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    },
    groupCount(
      requesterToken: string,
      input: GroupCountQuery<User>,
      files?: Record<Path<GroupCountQuery<User>>, File>
    ): Promise<Record<string, number>> {
      return apiCall(
        `${this.httpUrl}/users/rest/group-count`,
        input,
        {
          method: "POST",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    },
    aggregate(
      requesterToken: string,
      input: AggregateQuery<User>,
      files?: Record<Path<AggregateQuery<User>>, File>
    ): Promise<number | null | undefined> {
      return apiCall(
        `${this.httpUrl}/users/rest/aggregate`,
        input,
        {
          method: "POST",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    },
    groupAggregate(
      requesterToken: string,
      input: GroupAggregateQuery<User>,
      files?: Record<Path<GroupAggregateQuery<User>>, File>
    ): Promise<Record<string, number | null | undefined>> {
      return apiCall(
        `${this.httpUrl}/users/rest/group-aggregate`,
        input,
        {
          method: "POST",
          headers: {
            ...this.extraHeaders,
            Authorization: `Bearer ${requesterToken}`
          }
        },
        files
      ).then((x) => x.json())
    }
  }
}
