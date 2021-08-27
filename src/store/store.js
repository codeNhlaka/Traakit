import create from "zustand";

const initialState = {
    id: null,
    fullnames: null,
    employmentStatus: null,
    skill: null,
    imageKey: {
        id: null,
        key: null
    }
}

export const useStore = create(set => ({
    about: initialState,
    setImageKey: (id, key) => set(state => ({
        about: {
            ...state.about,
            imageKey: {
                id,
                key
            }
        }
    })),
    updateAbout: (data) => set(state => ({ 
        about: data
    }))
}));
