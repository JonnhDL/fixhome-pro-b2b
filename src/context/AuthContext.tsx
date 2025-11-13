'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

// Tipo para os dados do usuário desde Firestore
interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'client' | 'contractor';
  verified: boolean;
}

// Tipo para o contexto
interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função helper para criar cookie
async function createSessionCookie() {
  try {
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'create' }),
    });
    return response.ok;
  } catch (error) {
    console.error('Erro ao criar cookie de sessão:', error);
    return false;
  }
}

// Função helper para remover cookie
async function deleteSessionCookie() {
  try {
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'delete' }),
    });
    return response.ok;
  } catch (error) {
    console.error('Erro ao remover cookie de sessão:', error);
    return false;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Escutar mudanças no estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Criar cookie de sessão
        await createSessionCookie();

        // Obter dados do usuário desde Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
          }
        } catch (error) {
          console.error('Erro ao obter dados do usuário:', error);
        }
      } else {
        // Remover cookie quando não há usuário
        await deleteSessionCookie();
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Função de Login
  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Criar cookie de sessão
      await createSessionCookie();
      
      // Obter dados do usuário
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data() as UserData;
        setUserData(data);
        
        // Redirigir segundo o role
        switch (data.role) {
          case 'admin':
            router.push('/dashboard/admin');
            break;
          case 'contractor':
            router.push('/dashboard/contractor');
            break;
          case 'client':
            router.push('/dashboard');
            break;
          default:
            router.push('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Erro em login:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Função de Registo
  const signUp = async (email: string, password: string, displayName: string, role: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Criar documento do usuário em Firestore
      const newUserData: UserData = {
        uid: result.user.uid,
        email,
        displayName,
        role: role as 'admin' | 'client' | 'contractor',
        verified: false,
      };
      
      await setDoc(doc(db, 'users', result.user.uid), {
        ...newUserData,
        createdAt: new Date(),
      });

      // Criar cookie de sessão
      await createSessionCookie();
      
      setUserData(newUserData);
      
      // Redirigir segundo o role
      switch (role) {
        case 'admin':
          router.push('/dashboard/admin');
          break;
        case 'contractor':
          router.push('/dashboard/contractor');
          break;
        case 'client':
          router.push('/dashboard');
          break;
        default:
          router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Erro em registo:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Função de Logout
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      
      // Remover cookie de sessão
      await deleteSessionCookie();
      
      setUserData(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Erro em logout:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Função auxiliar para mensagens de erro em português
function getErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Email inválido';
    case 'auth/user-disabled':
      return 'Utilizador desativado';
    case 'auth/user-not-found':
      return 'Utilizador não encontrado';
    case 'auth/wrong-password':
      return 'Password incorreta';
    case 'auth/email-already-in-use':
      return 'Este email já está registado';
    case 'auth/weak-password':
      return 'A password deve ter pelo menos 6 caracteres';
    case 'auth/invalid-credential':
      return 'Credenciais inválidas';
    default:
      return 'Erro de autenticação';
  }
}