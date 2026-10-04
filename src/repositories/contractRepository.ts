import { Contract } from '../types';
import { initialContracts } from '../data/initialContracts';
import { storage } from './storage';

const CONTRACTS_KEY = 'contracts';

export const contractRepository = {
  getAll(): Contract[] {
    const list = storage.get<Contract[]>(CONTRACTS_KEY, []);
    if (!list || list.length === 0) {
      this.saveAll(initialContracts);
      return initialContracts;
    }
    return list;
  },

  getById(id: string): Contract | undefined {
    const list = this.getAll();
    return list.find((c) => c.id === id || c.code === id);
  },

  saveAll(contracts: Contract[]): void {
    storage.set(CONTRACTS_KEY, contracts);
  },

  update(id: string, updates: Partial<Contract>): Contract | null {
    const list = this.getAll();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) return null;

    list[index] = { ...list[index], ...updates };
    this.saveAll(list);
    return list[index];
  },

  reset(): Contract[] {
    this.saveAll(initialContracts);
    return initialContracts;
  }
};
