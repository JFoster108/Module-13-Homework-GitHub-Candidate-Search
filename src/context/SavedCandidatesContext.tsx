import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

// Define context type
interface SavedCandidatesContextType {
  savedCandidates: Candidate[];
  saveCandidate: (candidate: Candidate) => void;
  removeCandidate: (id: number) => void;
}

// Create context
const SavedCandidatesContext = createContext<SavedCandidatesContextType | undefined>(undefined);

// Provider component
export const SavedCandidatesProvider = ({ children }: { children: ReactNode }) => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    // Load from local storage if available
    const storedCandidates = localStorage.getItem('savedCandidates');
    return storedCandidates ? JSON.parse(storedCandidates) : [];
  });

  useEffect(() => {
    // Update local storage whenever savedCandidates changes
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  const saveCandidate = (candidate: Candidate) => {
    if (!savedCandidates.some((c) => c.id === candidate.id)) {
      const updatedList = [...savedCandidates, candidate];
      setSavedCandidates(updatedList);
    }
  };

  const removeCandidate = (id: number) => {
    const updatedList = savedCandidates.filter((candidate) => candidate.id !== id);
    setSavedCandidates(updatedList);
  };

  return (
    <SavedCandidatesContext.Provider value={{ savedCandidates, saveCandidate, removeCandidate }}>
      {children}
    </SavedCandidatesContext.Provider>
  );
};

// Custom hook for easier access
export const useSavedCandidates = () => {
  const context = useContext(SavedCandidatesContext);
  if (!context) {
    throw new Error('useSavedCandidates must be used within a SavedCandidatesProvider');
  }
  return context;
};

