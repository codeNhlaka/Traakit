import create from "zustand";

export const useStore = create(set => ({
    about: {
        id: null,
        fullnames: null,
        employmentStatus: null,
        skill: null,
        imageKey: {
            id: null,
            key: null
        }
    },
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
