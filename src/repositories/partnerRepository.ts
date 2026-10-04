import { Partner, PartnerStatus, DocStatus } from '../types';
import { initialPartners } from '../data/initialPartners';
import { storage } from './storage';

const PARTNERS_KEY = 'partners';

export const partnerRepository = {
  getAll(): Partner[] {
    const list = storage.get<Partner[]>(PARTNERS_KEY, []);
    if (!list || list.length === 0) {
      this.saveAll(initialPartners);
      return initialPartners;
    }
    return list;
  },

  getById(id: string): Partner | undefined {
    const list = this.getAll();
    return list.find((p) => p.id === id || p.code === id);
  },

  saveAll(partners: Partner[]): void {
    storage.set(PARTNERS_KEY, partners);
  },

  update(id: string, updates: Partial<Partner>): Partner | null {
    const list = this.getAll();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const existing = list[index];
    const updated: Partner = {
      ...existing,
      ...updates,
      history: [
        ...(updates.history || existing.history),
        {
          id: `h-upd-${Date.now()}`,
          date: new Date().toLocaleDateString('pt-BR'),
          title: 'Registro atualizado pelo usuário na demonstração',
          author: 'André (Operações)'
        }
      ]
    };

    list[index] = updated;
    this.saveAll(list);
    return updated;
  },

  updateStatus(id: string, status: PartnerStatus): Partner | null {
    return this.update(id, { status });
  },

  updateDocumentationStatus(id: string, documentationStatus: DocStatus): Partner | null {
    const partner = this.getById(id);
    if (!partner) return null;
    const updatedDocs = partner.documents.map((d) => ({
      ...d,
      status: documentationStatus === 'Válido' ? 'Válido' as DocStatus : d.status
    }));
    return this.update(id, {
      documentationStatus,
      documents: updatedDocs,
      status: documentationStatus === 'Válido' && partner.status === 'Pendente documentação' ? 'Ativo' : partner.status
    });
  },

  reset(): Partner[] {
    this.saveAll(initialPartners);
    return initialPartners;
  }
};
