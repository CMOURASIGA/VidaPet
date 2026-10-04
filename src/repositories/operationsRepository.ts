import { OperationalEvent, Opportunity } from '../types';
import { initialEvents, initialOpportunities } from '../data/initialOperations';
import { storage } from './storage';

const EVENTS_KEY = 'events';
const OPPORTUNITIES_KEY = 'opportunities';

export const operationsRepository = {
  getEvents(): OperationalEvent[] {
    const list = storage.get<OperationalEvent[]>(EVENTS_KEY, []);
    if (!list || list.length === 0) {
      this.saveEvents(initialEvents);
      return initialEvents;
    }
    return list;
  },

  saveEvents(events: OperationalEvent[]): void {
    storage.set(EVENTS_KEY, events);
  },

  resolveEvent(id: string): void {
    const events = this.getEvents();
    const index = events.findIndex((e) => e.id === id);
    if (index !== -1) {
      events[index].resolved = true;
      this.saveEvents(events);
    }
  },

  getOpportunities(): Opportunity[] {
    const list = storage.get<Opportunity[]>(OPPORTUNITIES_KEY, []);
    if (!list || list.length === 0) {
      this.saveOpportunities(initialOpportunities);
      return initialOpportunities;
    }
    return list;
  },

  saveOpportunities(opps: Opportunity[]): void {
    storage.set(OPPORTUNITIES_KEY, opps);
  },

  reset(): void {
    this.saveEvents(initialEvents);
    this.saveOpportunities(initialOpportunities);
  }
};
