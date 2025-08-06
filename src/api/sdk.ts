import type { Query, MassModification, EntryChange, Modification, Condition, GroupCountQuery, AggregateQuery, GroupAggregateQuery, DataClassPathPartial, QueryPartial, DeepPartial, Fetcher } from '@lightningkite/lightning-server-simplified'
// Replace this with an automatically generated lightning server sdk

export interface AuthRequirements {
    options: Array<ProofOption>
    strengthRequired: number
}


export interface BulkRequest {
    path: string
    method: string
    body: string | null | undefined
}

export interface BulkResponse {
    result: string | null | undefined
    error: LSError | null | undefined
    durationMs: number
}

export interface FinishProof {
    key: string
    password: string
}

export interface HealthStatus {
    level: Level
    checkedAt: Instant
    additionalMessage: string | null | undefined
}

export interface IdAndAuthMethods<T> {
    id: T
    options: Array<ProofOption>
    strengthRequired: number
    session: string | null | undefined
}

export type Instant = string  // kotlinx.datetime.Instant
export type LocalDate = string  // kotlinx.datetime.LocalDate

export interface LSError {
    http: number
    detail: string
    message: string
    data: string
}

export enum Level {
    OK = "OK",
    WARNING = "WARNING",
    URGENT = "URGENT",
    ERROR = "ERROR",
}

export interface LogInRequest {
    proofs: Array<Proof>
    label: string
    scopes: Array<string>
    expires: Instant | null | undefined
}

export interface Mask<T> {
    pairs: Array<Pair>
}

export interface Memory {
    max: number
    total: number
    free: number
    systemAllocated: number
    usage: number
}

export interface ModelPermissions<T> {
    create: Condition<T>
    read: Condition<T>
    readMask: Mask<T>
    update: Condition<T>
    updateRestrictions: UpdateRestrictions<T>
    delete: Condition<T>
    maxQueryTimeMs: number
}

export enum OauthAccessType {
    online = "online",
    offline = "offline",
}

export interface OauthResponse {
    access_token: string
    scope: string
    token_type: string
    id_token: string | null | undefined
    refresh_token: string | null | undefined
}

export enum OauthResponseMode {
    form_post = "form_post",
    query = "query",
}

export interface OauthTokenRequest {
    code: string | null | undefined
    refresh_token: string | null | undefined
    client_id: string
    client_secret: string
    redirect_uri: string | null | undefined
    grant_type: string
}

export interface Pair {
}

export interface Proof {
    via: string
    strength: number
    property: string
    value: string
    at: Instant
    signature: string
}

export interface ProofMethodInfo {
    via: string
    property: string | null | undefined
    strength: number
}

export interface ProofOption {
    method: ProofMethodInfo
    value: string | null | undefined
}

export interface ProofsCheckResult<T> {
    id: T
    options: Array<ProofOption>
    strengthRequired: number
    readyToLogIn: boolean
    maxExpiration: Instant | null | undefined
}

export interface ServerHealth {
    serverId: string
    version: string
    memory: Memory
    features: Record<string, HealthStatus>
    loadAverageCpu: number
}

export interface Session<T, T1> {
    _id: T1
    secretHash: string
    derivedFrom: T1 | null | undefined
    label: string | null | undefined
    subjectId: T1
    createdAt: Instant
    lastUsed: Instant
    expires: Instant | null | undefined
    stale: Instant | null | undefined
    terminated: Instant | null | undefined
    ips: Array<string>
    userAgents: Array<string>
    scopes: Array<string>
    oauthClient: string | null | undefined
}


export interface SubSessionRequest {
    label: string
    scopes: Array<string>
    oauthClient: string | null | undefined
    expires: Instant | null | undefined
}

export type UUID = string  // com.lightningkite.UUID


export interface UpdateRestrictions<T> {
    fields: Array<UpdateRestrictionsPart<T>>
}

export interface UpdateRestrictionsPart<T> {
    path: DataClassPathPartial<T>
    limitedIf: Condition<T>
    limitedTo: Condition<T>
}

export enum Animal {
    Dog = "Dog",
    Cat = "Cat",
    Hamster = "Hamster",
    Other = "Other",
}

export interface User {
    _id: UUID
    name: string
    email: string
    phone: string | null | undefined
    birthday: LocalDate
    profilePic: string | null | undefined
    favoriteAnimal: Animal | null | undefined
    gender: "m" | "f"
    createdAt: string
    modifiedAt: string
}



export interface Api {
    bulkRequest(input: Record<string, BulkRequest>): Promise<Record<string, BulkResponse>>
    getServerHealth(): Promise<ServerHealth>

    readonly emailProof: {
        beginEmailOwnershipProof(input: string): Promise<string>
        proveEmailOwnership(input: FinishProof): Promise<Proof>
    }
    readonly user: {
        default(): Promise<User>
        permissions(): Promise<ModelPermissions<User>>
        query(input: Query<User>): Promise<Array<User>>
        queryPartial(input: QueryPartial<User>): Promise<Array<DeepPartial<User>>>
        detail(id: UUID): Promise<User>
        insertBulk(input: Array<User>): Promise<Array<User>>
        insert(input: User): Promise<User>
        upsert(id: UUID, input: User): Promise<User>
        bulkReplace(input: Array<User>): Promise<Array<User>>
        replace(id: UUID, input: User): Promise<User>
        bulkModify(input: MassModification<User>): Promise<number>
        modifyWithDiff(id: UUID, input: Modification<User>): Promise<EntryChange<User>>
        modify(id: UUID, input: Modification<User>): Promise<User>
        simplifiedModify(id: UUID, input: DeepPartial<User>): Promise<User>
        bulkDelete(input: Condition<User>): Promise<number>
        delete(id: UUID): Promise<void>
        count(input: Condition<User>): Promise<number>
        groupCount(input: GroupCountQuery<User>): Promise<Record<string, number>>
        aggregate(input: AggregateQuery<User>): Promise<number | null | undefined>
        groupAggregate(input: GroupAggregateQuery<User>): Promise<Record<string, number | null | undefined>>
        groupCount2(input: GroupCountQuery<User>): Promise<Record<string, number>>
        groupAggregate2(input: GroupAggregateQuery<User>): Promise<Record<string, number | null | undefined>>
    }
    readonly userAuth: {
        logIn(input: Array<Proof>): Promise<IdAndAuthMethods<UUID>>
        logInV2(input: LogInRequest): Promise<IdAndAuthMethods<UUID>>
        checkProofs(input: Array<Proof>): Promise<ProofsCheckResult<UUID>>
        authenticationRequirements(): Promise<AuthRequirements>
        openSession(input: string): Promise<string>
        createSubSession(input: SubSessionRequest): Promise<string>
        getToken(input: OauthTokenRequest): Promise<OauthResponse>
        getTokenSimple(input: string): Promise<string>
        getSelf(): Promise<User>
        terminateSession(): Promise<void>
        terminateOtherSession(sessionId: UUID): Promise<void>
    }
    readonly userSession: {
        default(): Promise<Session<User, UUID>>
        permissions(): Promise<ModelPermissions<Session<User, UUID>>>
        query(input: Query<Session<User, UUID>>): Promise<Array<Session<User, UUID>>>
        queryPartial(input: QueryPartial<Session<User, UUID>>): Promise<Array<DeepPartial<Session<User, UUID>>>>
        detail(id: UUID): Promise<Session<User, UUID>>
        insertBulk(input: Array<Session<User, UUID>>): Promise<Array<Session<User, UUID>>>
        insert(input: Session<User, UUID>): Promise<Session<User, UUID>>
        upsert(id: UUID, input: Session<User, UUID>): Promise<Session<User, UUID>>
        bulkReplace(input: Array<Session<User, UUID>>): Promise<Array<Session<User, UUID>>>
        replace(id: UUID, input: Session<User, UUID>): Promise<Session<User, UUID>>
        bulkModify(input: MassModification<Session<User, UUID>>): Promise<number>
        modifyWithDiff(id: UUID, input: Modification<Session<User, UUID>>): Promise<EntryChange<Session<User, UUID>>>
        modify(id: UUID, input: Modification<Session<User, UUID>>): Promise<Session<User, UUID>>
        simplifiedModify(id: UUID, input: DeepPartial<Session<User, UUID>>): Promise<Session<User, UUID>>
        bulkDelete(input: Condition<Session<User, UUID>>): Promise<number>
        delete(id: UUID): Promise<void>
        count(input: Condition<Session<User, UUID>>): Promise<number>
        groupCount(input: GroupCountQuery<Session<User, UUID>>): Promise<Record<string, number>>
        aggregate(input: AggregateQuery<Session<User, UUID>>): Promise<number | null | undefined>
        groupAggregate(input: GroupAggregateQuery<Session<User, UUID>>): Promise<Record<string, number | null | undefined>>
        groupCount2(input: GroupCountQuery<Session<User, UUID>>): Promise<Record<string, number>>
        groupAggregate2(input: GroupAggregateQuery<Session<User, UUID>>): Promise<Record<string, number | null | undefined>>
    }
}



export class LiveApi implements Api {
    public constructor(public fetcher: Fetcher) {}
    bulkRequest(input: Record<string, BulkRequest>): Promise<Record<string, BulkResponse>> {
        return this.fetcher<Record<string, BulkRequest>, Record<string, BulkResponse>>(`/meta/bulk`, "POST", input)
    }
    getServerHealth(): Promise<ServerHealth> {
        return this.fetcher<void, ServerHealth>(`/meta/health`, "GET", undefined)
    }
    readonly emailProof: Api["emailProof"] = {
        beginEmailOwnershipProof: (input: string): Promise<string> => this.fetcher(`/auth/proof/email/start`, "POST", input),
        proveEmailOwnership: (input: FinishProof): Promise<Proof> => this.fetcher(`/auth/proof/email/prove`, "POST", input),
    }
    readonly user: Api["user"] = {
        default: (): Promise<User> => this.fetcher(`/user/rest/_default_`, "GET", undefined),
        permissions: (): Promise<ModelPermissions<User>> => this.fetcher(`/user/rest/_permissions_`, "GET", undefined),
        query: (input: Query<User>): Promise<Array<User>> => this.fetcher(`/user/rest/query`, "POST", input),
        queryPartial: (input: QueryPartial<User>): Promise<Array<DeepPartial<User>>> => this.fetcher(`/user/rest/query-partial`, "POST", input),
        detail: (id: UUID): Promise<User> => this.fetcher(`/user/rest/${id}`, "GET", undefined),
        insertBulk: (input: Array<User>): Promise<Array<User>> => this.fetcher(`/user/rest/bulk`, "POST", input),
        insert: (input: User): Promise<User> => this.fetcher(`/user/rest`, "POST", input),
        upsert: (id: UUID, input: User): Promise<User> => this.fetcher(`/user/rest/${id}`, "POST", input),
        bulkReplace: (input: Array<User>): Promise<Array<User>> => this.fetcher(`/user/rest`, "PUT", input),
        replace: (id: UUID, input: User): Promise<User> => this.fetcher(`/user/rest/${id}`, "PUT", input),
        bulkModify: (input: MassModification<User>): Promise<number> => this.fetcher(`/user/rest/bulk`, "PATCH", input),
        modifyWithDiff: (id: UUID, input: Modification<User>): Promise<EntryChange<User>> => this.fetcher(`/user/rest/${id}/delta`, "PATCH", input),
        modify: (id: UUID, input: Modification<User>): Promise<User> => this.fetcher(`/user/rest/${id}`, "PATCH", input),
        simplifiedModify: (id: UUID, input: DeepPartial<User>): Promise<User> => this.fetcher(`/user/rest/${id}/simplified`, "PATCH", input),
        bulkDelete: (input: Condition<User>): Promise<number> => this.fetcher(`/user/rest/bulk-delete`, "POST", input),
        delete: (id: UUID): Promise<void> => this.fetcher(`/user/rest/${id}`, "DELETE", undefined),
        count: (input: Condition<User>): Promise<number> => this.fetcher(`/user/rest/count`, "POST", input),
        groupCount: (input: GroupCountQuery<User>): Promise<Record<string, number>> => this.fetcher(`/user/rest/group-count`, "POST", input),
        aggregate: (input: AggregateQuery<User>): Promise<number | null | undefined> => this.fetcher(`/user/rest/aggregate`, "POST", input),
        groupAggregate: (input: GroupAggregateQuery<User>): Promise<Record<string, number | null | undefined>> => this.fetcher(`/user/rest/group-aggregate`, "POST", input),
        groupCount2: (input: GroupCountQuery<User>): Promise<Record<string, number>> => this.fetcher(`/user/rest/group-count-2`, "POST", input),
        groupAggregate2: (input: GroupAggregateQuery<User>): Promise<Record<string, number | null | undefined>> => this.fetcher(`/user/rest/group-aggregate-2`, "POST", input),
    }
    readonly userAuth: Api["userAuth"] = {
        logIn: (input: Array<Proof>): Promise<IdAndAuthMethods<UUID>> => this.fetcher(`/auth/login/login`, "POST", input),
        logInV2: (input: LogInRequest): Promise<IdAndAuthMethods<UUID>> => this.fetcher(`/auth/login/login2`, "POST", input),
        checkProofs: (input: Array<Proof>): Promise<ProofsCheckResult<UUID>> => this.fetcher(`/auth/login/proofs-check`, "POST", input),
        authenticationRequirements: (): Promise<AuthRequirements> => this.fetcher(`/auth/login/auth-requirements`, "GET", undefined),
        openSession: (input: string): Promise<string> => this.fetcher(`/auth/login/open-session`, "POST", input),
        createSubSession: (input: SubSessionRequest): Promise<string> => this.fetcher(`/auth/login/sub-session`, "POST", input),
        getToken: (input: OauthTokenRequest): Promise<OauthResponse> => this.fetcher(`/auth/login/token`, "POST", input),
        getTokenSimple: (input: string): Promise<string> => this.fetcher(`/auth/login/token/simple`, "POST", input),
        getSelf: (): Promise<User> => this.fetcher(`/auth/login/self`, "GET", undefined),
        terminateSession: (): Promise<void> => this.fetcher(`/auth/login/terminate`, "POST", undefined),
        terminateOtherSession: (sessionId: UUID): Promise<void> => this.fetcher(`/auth/login/${sessionId}/terminate`, "POST", undefined),
    }
    readonly userSession: Api["userSession"] = {
        default: (): Promise<Session<User, UUID>> => this.fetcher(`/auth/login/sessions/_default_`, "GET", undefined),
        permissions: (): Promise<ModelPermissions<Session<User, UUID>>> => this.fetcher(`/auth/login/sessions/_permissions_`, "GET", undefined),
        query: (input: Query<Session<User, UUID>>): Promise<Array<Session<User, UUID>>> => this.fetcher(`/auth/login/sessions/query`, "POST", input),
        queryPartial: (input: QueryPartial<Session<User, UUID>>): Promise<Array<DeepPartial<Session<User, UUID>>>> => this.fetcher(`/auth/login/sessions/query-partial`, "POST", input),
        detail: (id: UUID): Promise<Session<User, UUID>> => this.fetcher(`/auth/login/sessions/${id}`, "GET", undefined),
        insertBulk: (input: Array<Session<User, UUID>>): Promise<Array<Session<User, UUID>>> => this.fetcher(`/auth/login/sessions/bulk`, "POST", input),
        insert: (input: Session<User, UUID>): Promise<Session<User, UUID>> => this.fetcher(`/auth/login/sessions`, "POST", input),
        upsert: (id: UUID, input: Session<User, UUID>): Promise<Session<User, UUID>> => this.fetcher(`/auth/login/sessions/${id}`, "POST", input),
        bulkReplace: (input: Array<Session<User, UUID>>): Promise<Array<Session<User, UUID>>> => this.fetcher(`/auth/login/sessions`, "PUT", input),
        replace: (id: UUID, input: Session<User, UUID>): Promise<Session<User, UUID>> => this.fetcher(`/auth/login/sessions/${id}`, "PUT", input),
        bulkModify: (input: MassModification<Session<User, UUID>>): Promise<number> => this.fetcher(`/auth/login/sessions/bulk`, "PATCH", input),
        modifyWithDiff: (id: UUID, input: Modification<Session<User, UUID>>): Promise<EntryChange<Session<User, UUID>>> => this.fetcher(`/auth/login/sessions/${id}/delta`, "PATCH", input),
        modify: (id: UUID, input: Modification<Session<User, UUID>>): Promise<Session<User, UUID>> => this.fetcher(`/auth/login/sessions/${id}`, "PATCH", input),
        simplifiedModify: (id: UUID, input: DeepPartial<Session<User, UUID>>): Promise<Session<User, UUID>> => this.fetcher(`/auth/login/sessions/${id}/simplified`, "PATCH", input),
        bulkDelete: (input: Condition<Session<User, UUID>>): Promise<number> => this.fetcher(`/auth/login/sessions/bulk-delete`, "POST", input),
        delete: (id: UUID): Promise<void> => this.fetcher(`/auth/login/sessions/${id}`, "DELETE", undefined),
        count: (input: Condition<Session<User, UUID>>): Promise<number> => this.fetcher(`/auth/login/sessions/count`, "POST", input),
        groupCount: (input: GroupCountQuery<Session<User, UUID>>): Promise<Record<string, number>> => this.fetcher(`/auth/login/sessions/group-count`, "POST", input),
        aggregate: (input: AggregateQuery<Session<User, UUID>>): Promise<number | null | undefined> => this.fetcher(`/auth/login/sessions/aggregate`, "POST", input),
        groupAggregate: (input: GroupAggregateQuery<Session<User, UUID>>): Promise<Record<string, number | null | undefined>> => this.fetcher(`/auth/login/sessions/group-aggregate`, "POST", input),
        groupCount2: (input: GroupCountQuery<Session<User, UUID>>): Promise<Record<string, number>> => this.fetcher(`/auth/login/sessions/group-count-2`, "POST", input),
        groupAggregate2: (input: GroupAggregateQuery<Session<User, UUID>>): Promise<Record<string, number | null | undefined>> => this.fetcher(`/auth/login/sessions/group-aggregate-2`, "POST", input),
    }
}
