import { storage } from './storage';
import { partnerRepository } from './partnerRepository';
import { companyRepository } from './companyRepository';
import { contractRepository } from './contractRepository';
import { operationsRepository } from './operationsRepository';

const DISCLAIMER_SEEN_KEY = 'disclaimer_seen';
const LAST_RESET_KEY = 'last_reset';

export const appRepository = {
  isDisclaimerSeen(): boolean {
    return storage.get<boolean>(DISCLAIMER_SEEN_KEY, false);
  },

  setDisclaimerSeen(seen: boolean): void {
    storage.set(DISCLAIMER_SEEN_KEY, seen);
  },

  initialize(): void {
    // Ensures all datasets are seeded in LocalStorage
    partnerRepository.getAll();
    companyRepository.getAll();
    contractRepository.getAll();
    operationsRepository.getEvents();
    operationsRepository.getOpportunities();
  },

  resetDemoData(): void {
    storage.clearAll();
    // Re-seed original data
    partnerRepository.reset();
    companyRepository.reset();
    contractRepository.reset();
    operationsRepository.reset();
    storage.set(LAST_RESET_KEY, new Date().toISOString());
    // Keep disclaimer seen so user isn't immediately blocked by modal after intentional reset
    this.setDisclaimerSeen(true);
  }
};
