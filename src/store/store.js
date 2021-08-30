import create from "zustand";

const initialState = {
    id: null,
    data: {
        fullnames: null,
        employmentStatus: null,
        skill: null
    },
    documents: [],
    imageKey: {
        id: null,
        key: null,
        url: null
    }
}

export const useStore = create(set => ({
    about: initialState,
    deleteDocumentRecord: (id) => set(state => ({
        ...state.about, 
        documents: state.documents.filter(doc => doc.id !== id)
    })), 
    setDocumentRecord: (record) => set(state => ({
        about: {
            ...state.about,
            documents: [ 
                ...state.about.documents,
                record
            ]
        }
    })),
    setImageUrl: (url) => set(state => ({
        about: {
            ...state.about,
            imageKey: {
                ...state.about.imageKey,
                url
            }
        }
    })),
    setId: (id) => set(state => ({
        about: {
            ...state.about,
            id,
        }
    })),
    setImageKey: (id, key) => set(state => ({
        about: {
            ...state.about,
            imageKey: {
                id,
                key
            }
        }
    })),
    updateAbout: (userAbout) => set(state => ({ 
        about: {
            ...state.about,
            id: userAbout.id,
            data: {
                fullnames: userAbout.fullnames,
                skill: userAbout.skill,
                employmentStatus: userAbout.employmentStatus
            }
        }
    }))
}));
