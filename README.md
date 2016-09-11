# angular2-workarounds
A collection of (WIP) Angular 2 workarounds to make my life easier.

## Inspiration
I just started learning Angular and am encountering a lot of design decisions that don't make sense for 
the use cases I've encountered or just clash with my personal preference. I really like Angular 1, and decided to try to preserve
some of the behavior to make the transition and learning experience easier on myself.


## Workarounds

### `jg-http`: Http Observables -> Promise API
`jg-http` places the observables behind a promise-based API. The HTTP request API is also hidden behind an extendable Rails-friendly CRUD API.

##### Reasoning:
* I'm not a big fan of the switch to observables. I understand there's some valuable use cases for them (such as search autocomplete), 
but many of the situations I've encountered haven't utilized them to full effect. I'd personally rather switch to Observables when I need them, not have them
by default. 
* I'm also building a lot of Rails apps recently, which have a consistent API for CRUD operations. Simplyifying the most commonly used 
API operations is a huge win in making the actual services rather small.

##### Sample Usage
`events.service.ts`
```
import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import { JGHttp, JGHttpConfig } from './jg-http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventsService extends JGHttp {
  constructor(public http: Http) {
    super(http, new JGHttpConfig('https://api.hnl.io', 'event', 'events'));
  }

  hello(): void {
    console.info('hello'); //[JG]: Custom method
  }
}
```

##### Improvements to be made
* Turn the web service base URL into a variable which can be injected into the http service depending on the environment.
