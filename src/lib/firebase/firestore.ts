import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  query, 
  where, 
  orderBy,
  updateDoc,
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

// Types
export type ProjectStatus = 'aberto' | 'em-analise' | 'adjudicado' | 'concluido';

export interface Project {
  id?: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: ProjectStatus;
  clientId: string;
  clientName: string;
  createdBy: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface Proposal {
  id?: string;
  projectId: string;
  contractorId: string;
  contractorName: string;
  amount: number;
  timeline: string;
  description: string;
  status: 'pendente' | 'aceite' | 'rejeitada';
  createdAt?: any;
}

// Projects CRUD
export const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, ...projectData };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
    );
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
  } catch (error) {
    console.error('Error getting projects:', error);
    throw error;
  }
};

export const getProjectsByUser = async (userId: string): Promise<Project[]> => {
  try {
    const q = query(
      collection(db, 'projects'),
      where('createdBy', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
  } catch (error) {
    console.error('Error getting user projects:', error);
    throw error;
  }
};

export const getProjectById = async (projectId: string): Promise<Project | null> => {
  try {
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project;
    }
    return null;
  } catch (error) {
    console.error('Error getting project:', error);
    throw error;
  }
};

export const updateProject = async (projectId: string, data: Partial<Project>) => {
  try {
    const docRef = doc(db, 'projects', projectId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    await deleteDoc(doc(db, 'projects', projectId));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Proposals CRUD
export const createProposal = async (proposalData: Omit<Proposal, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'proposals'), {
      ...proposalData,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...proposalData };
  } catch (error) {
    console.error('Error creating proposal:', error);
    throw error;
  }
};

export const getProposalsByProject = async (projectId: string): Promise<Proposal[]> => {
  try {
    const q = query(
      collection(db, 'proposals'),
      where('projectId', '==', projectId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Proposal[];
  } catch (error) {
    console.error('Error getting proposals:', error);
    throw error;
  }
};

export const updateProposal = async (proposalId: string, data: Partial<Proposal>) => {
  try {
    const docRef = doc(db, 'proposals', proposalId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating proposal:', error);
    throw error;
  }
};