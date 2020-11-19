import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Status {
  readonly id: string;
  readonly user: string;
  readonly field: string;
  readonly time: number;
  constructor(init: ModelInit<Status>);
}

export declare class Site {
  readonly id: string;
  readonly name: string;
  readonly country: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly exposure: string;
  readonly reefType: string;
  readonly reefZone: string;
  readonly notes?: string;
  readonly createdAt?: string;
  readonly siteStatus?: (Status | null)[];
  constructor(init: ModelInit<Site>);
  static copyOf(source: Site, mutator: (draft: MutableModel<Site>) => MutableModel<Site> | void): Site;
}