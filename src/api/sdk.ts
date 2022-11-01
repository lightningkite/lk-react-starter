// Replace this file with the automatically generated lightning server SDK

import {apiCall} from "@lightningkite/lightning-server-simplified"

export interface User {
  _id: string
  name: string
  email: string
  phone: string
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
}
