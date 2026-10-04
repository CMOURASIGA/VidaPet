import { Company } from '../types';
import { initialCompanies } from '../data/initialCompanies';
import { storage } from './storage';

const COMPANIES_KEY = 'companies';

export const companyRepository = {
  getAll(): Company[] {
    const list = storage.get<Company[]>(COMPANIES_KEY, []);
    if (!list || list.length === 0) {
      this.saveAll(initialCompanies);
      return initialCompanies;
    }
    return list;
  },

  getById(id: string): Company | undefined {
    const list = this.getAll();
    return list.find((c) => c.id === id || c.code === id);
  },

  saveAll(companies: Company[]): void {
    storage.set(COMPANIES_KEY, companies);
  },

  update(id: string, updates: Partial<Company>): Company | null {
    const list = this.getAll();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const existing = list[index];
    const updated: Company = {
      ...existing,
      ...updates,
      history: [
        ...(updates.history || existing.history),
        {
          id: `ch-upd-${Date.now()}`,
          date: new Date().toLocaleDateString('pt-BR'),
          title: 'Registro atualizado no Operations Hub',
          author: 'André (Operações)'
        }
      ]
    };

    list[index] = updated;
    this.saveAll(list);
    return updated;
  },

  reset(): Company[] {
    this.saveAll(initialCompanies);
    return initialCompanies;
  }
};
